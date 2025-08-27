"use client";

import ImageBucket from "@/components/dashboard/image-bucket";
import BouncingDotsLoader from "@/components/ui/bounce-loader"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BannerType } from "@/lib/types";
import { Image, Loader2, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";

const BannerPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [banner, setBanner] = useState<BannerType[]>([]);
    const { slug } = useParams();

    const handleImageDelete = (url: string) => {
        setBanner((prev) => prev.filter((i) => i.url !== url))
    }

    const handleImageSelect = (url: string) => {
        setBanner((prev) => [...prev, { url:url }])
    }

    useEffect(() => {
        const getAllBanner = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/store/${slug}/get-data?fields=banner`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) {
                    toast.error("Failed to get banner");
                } else {
                    const data = await res.json();
                    console.log("Banner", data)
                    setBanner(data.store.banner??[])
                }

            } catch {
                toast.error("Internal server error");

            } finally {
                setIsLoading(false);
            }
        }
        getAllBanner();

    }, [slug]);

    const handleUploadBanner = async () => {
        try {
            setIsUpdating(true);
            const res = await fetch(`/api/store/${slug}/update-any`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify({ banner: banner })
            });

            if (!res.ok) {
                toast.error("Failed to upload banner");
            } else {
                toast.success("Banner updated successfully");
            }
        } catch {
            toast.error("Failed to upload banner");
        } finally {
            setIsUpdating(false);

        }
    }
    return (
        <div>
            {
                isLoading ? <BouncingDotsLoader /> :
                    <div className="p-4">
                        <Card>
                            <CardHeader className="flex items-start justify-between px-6 py-5 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        { // eslint-disable-next-line jsx-a11y/alt-text
                                            <Image className="h-6 w-6 text-green-600" />}
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl text-gray-800">
                                            Store Banner
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 mt-1">
                                            Add banner to make your store looks amazing
                                        </CardDescription>
                                    </div>
                                </div>
                                <Button
                                disabled={isUpdating}
                                onClick={handleUploadBanner}
                                >
                                    {
                                        isUpdating?<><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Updating Banner</>:
                                        "Update Banner"
                                    }
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center my-2 justify-start gap-2">
                                    {
                                        banner && banner.length > 0 && (
                                            <div className="overflow-x-scroll flex items-center my-2 justify-start gap-2  w-full">
                                                {
                                                    banner.map((item, i) =>
                                                        <div key={i} className=' relative w-60 aspect-[16/9] rounded-md overflow-hidden'>
                                                            {
                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                <img
                                                                    src={item.url}
                                                                    alt='banner'
                                                                    className="object-cover w-full h-full" />
                                                            }
                                                            <Button
                                                                variant={'outline'}
                                                                className=' absolute top-2 right-2'
                                                                onClick={() => handleImageDelete(item.url)}>
                                                                <Trash2 className='w-4 h-4 text-red-600' />
                                                            </Button>
                                                        </div>)
                                                }
                                            </div>


                                        )
                                    }

                                </div>
                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6">
                                    <ImageBucket
                                        onSelect={handleImageSelect}
                                    />
                                </div>

                            </CardContent>
                        </Card>
                    </div>
            }
        </div>
    )
}

export default BannerPage