"use client";
import ImageBucket from "@/components/dashboard/image-bucket";
import BouncingDotsLoader from "@/components/ui/bounce-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/context/store-context"
import { StoreType } from "@/lib/types";
import {  Loader2, Save, Store, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SettingPage = () => {
    const store = useStore();
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    const [storeData, setStoreData] = useState<StoreType>({
        _id: '',
        name: '',
        slug: '',
        domain: '',
        logo: '',
        description: '',
        favicon: ''
    }); 
    const [storeInitialData, setStoreInitialData] = useState<StoreType>(storeData)


    const onChange = <K extends keyof StoreType>(field: K, value: StoreType[K]) => {
        setStoreData((prev) => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
        setHasChanges(JSON.stringify(storeData) !== JSON.stringify(storeInitialData))
    }, [storeData, storeInitialData])
    useEffect(() => {
        const getRestaurantData = async () => {
            try {
                setIsPageLoading(true)
                const res = await fetch(`/api/store/${store.slug}/get-store-data`);
                const data = await res.json();
                console.log("DATA", data)
                if (!res.ok) {
                    console.log(data);
                    setErrorLoading(true);
                } else {
                    setStoreData(data.store);
                    setStoreInitialData(data.store);
                }

            } catch (error) {
                console.log(error);
                setErrorLoading(true)
            } finally {
                setIsPageLoading(false)
            }
        }
        getRestaurantData()
    }, [store.slug]);


    const handleStoreUpdate = async () => {
        try {
            setIsSaving(true)
            const res = await fetch(`/api/store/${store.slug}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(storeData)
            });
            if (!res.ok) {
                toast.error("Failed to save changes");
            } else {
                toast.success("Saved successfully");
                setHasChanges(false)
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to save changes");
        } finally {
            setIsSaving(false)
        }
    }

    if (errorLoading) return (<div className=" p-4 flex items-center justify-center">
        Failed to Load Store Details
    </div>)

    if (isPageLoading) return
  
    return (
    <>
        {isPageLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
                <BouncingDotsLoader />
            </div>
        ) : (
            <div className="p-4 md:p-6  mx-auto">
                {/* Header Section */}
                <div className="flex flex-col mb-6 md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Store Settings</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage your store details and preferences
                        </p>
                    </div>
                    <Button
                        onClick={handleStoreUpdate}
                        disabled={isSaving || !hasChanges}
                        className="w-full md:w-auto transition-all"
                        variant={hasChanges ? "default" : "secondary"}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                                {hasChanges && (
                                    <span className="ml-2 text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full animate-pulse">
                                        Unsaved Changes
                                    </span>
                                )}
                            </>
                        )}
                    </Button>
                </div>

                {/* Store Information Card */}
                <Card className="mb-6">
                    <CardHeader className="border-b">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Store className="h-5 w-5 text-gray-500" />
                            Store Information
                        </CardTitle>
                        <CardDescription>
                            Basic details that customers will see about your store
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {/* Logo Section */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Store Logo</Label>
                            <div className="flex items-center gap-6">
                                {storeData.logo ? (
                                    <div className="relative group">
                                        <Image
                                            src={storeData.logo}
                                            alt="Store logo"
                                            width={120}
                                            height={120}
                                            className="rounded-lg border object-cover aspect-square"
                                        />
                                        <Button 
                                            variant="ghost"
                                            size="sm"
                                            className="absolute -top-2 -right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => onChange("logo", "")}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                ) : (
                                    <ImageBucket 
                                        onSelect={(url) => onChange("logo", url)} 
                                    />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Recommended size: 500×500px (1:1 aspect ratio)
                            </p>
                        </div>

                        {/* Name Section */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Store Name</Label>
                                {/* <span className="text-xs text-muted-foreground">
                                    {storeData.name?.length || 0}/50
                                </span> */}
                            </div>
                            <Input
                                value={storeData.name}
                                onChange={(e) => onChange("name", e.target.value)}
                                placeholder="Enter your store name"
                                maxLength={50}
                                className="focus-visible:ring-2 focus-visible:ring-primary/50"
                            />
                        </div>

                        {/* Description Section */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Store Description</Label>
                                {/* <span className="text-xs text-muted-foreground">
                                    {storeData.description?.length || 0}/500
                                </span> */}
                            </div>
                            <Textarea
                                value={storeData.description || ""}
                                onChange={(e) => onChange("description", e.target.value)}
                                placeholder="Tell customers about your store..."
                                maxLength={500}
                                rows={4}
                                className="focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[100px]"
                            />
                            <p className="text-xs text-muted-foreground">
                                This will appear on your store&apos;s about page and in search results.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Settings Sections can be added here */}
                {/* <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="border-b">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-gray-500" />
                                Payment Methods
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-sm text-muted-foreground">
                                Configure how you accept payments
                            </p>
                            <Button variant="outline" className="mt-4 w-full">
                                Manage Payments
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="border-b">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Truck className="h-4 w-4 text-gray-500" />
                                Shipping Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <p className="text-sm text-muted-foreground">
                                Set up shipping zones and rates
                            </p>
                            <Button variant="outline" className="mt-4 w-full">
                                Configure Shipping
                            </Button>
                        </CardContent>
                    </Card>
                </div> */}
            </div>
        )}
    </>
)
}

export default SettingPage