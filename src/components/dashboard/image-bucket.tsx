"use client"
import { ImageIcon, Loader2, Trash2, UploadCloud } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useStore } from '@/lib/context/store-context';
import { ImageType } from '@/lib/types';
import { toast } from 'sonner';
import Image from 'next/image';
import ErrorIcon from '../ui/error-icon';

interface ImageBucketProps {
  onSelect: (url: string) => void;
}

export function ImageBucket({  onSelect }: ImageBucketProps) {
    const store = useStore();
    const [images, setImages] = useState<ImageType[]>([]);
    const [open, setOpen] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [deletingId, setDeletingId] = useState<string|null>(null);
    const [errorMessage, setErrorMessage] = useState("");


    const fetchImages = async () => {
        try {
            setFetching(true);
            const res = await fetch(`/api/store/${store.slug}/images`);
            if (!res.ok) throw new Error("Failed to fetch images");
            const data = await res.json();
            setImages(data);
        } catch (error) {
            console.error("Error fetching images:", error);
            toast.error("Failed to fetch images");
        } finally {
            setFetching(false);
        }
    };

    const uploadImage = async () => {
        if (!file) return;
        try {
            setUploading(true)
            setErrorMessage("")
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch(`/api/store/${store.slug}/images`, {
                method: "POST",
                body: formData
            });
            if (res.ok) {
                setFile(null);
                await fetchImages();
                toast.success("Image uploaded successfully");
            } else {
                const data = await res.json();
                setErrorMessage(data.error)
            }
        } catch (error) {
            console.log("ERROR IMAGE", error);
            toast.error("Failed to Upload Image");
        } finally {
            setUploading(false);
        }
    }

    const deleteImage = async (id: string) => {
        try {
            setDeletingId(id);
            setErrorMessage("");
            const res = await fetch(`/api/store/${store.slug}/images`, {
                headers: { "Content-Type": "application/json" },
                method: "DELETE",
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                await fetchImages();
                toast.success("Image deleted successfully");

            } else {
                toast.error("Failed to delete image");

            }
        } catch (error) {
            setErrorMessage(`${error}`)
            console.error(error);
            toast.error("Failed to delete image");
        } finally {
            setDeletingId(null)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files?.[0];
        if (selectedFiles) {
            if (selectedFiles.size > 5 * 1024 * 1024) {
                toast.error("Please choose an image less than 5mb");
                return
            }
            setFile(selectedFiles);
        }

    }

    useEffect(() => {
        if (open) {
            fetchImages();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Select Image
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[calc(100%-2rem)] sm:w-full h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        Image Bucket
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <div className="relative w-full">
                            <Input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="cursor-pointer"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <Button
                            onClick={uploadImage}
                            disabled={uploading || !file}
                            className="w-full sm:w-auto"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="w-4 h-4 mr-2" />
                                    Upload
                                </>
                            )}
                        </Button>
                    </div>
                    {errorMessage && (
                        <div className=" flex items-center p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                            <ErrorIcon />
                            {errorMessage}
                        </div>
                    )}

                    {file && (
                        <div className="p-3 border rounded-lg bg-muted/50 flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-sm truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} KB
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setFile(null)}
                                className="text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    <ScrollArea className="flex-1 border rounded-lg">
                        {fetching ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <Skeleton key={i} className="aspect-square w-full rounded-lg" />
                                ))}
                            </div>
                        ) : images.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground p-6">
                                <ImageIcon className="w-12 h-12" strokeWidth={1} />
                                <p className="text-center">No images found</p>
                                <p className="text-sm text-center">
                                    Upload your first image to get started
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3">
                                {images.map((img) => (
                                    <div
                                        key={img._id}
                                        className="relative group aspect-square rounded-lg overflow-hidden border hover:shadow-md transition-shadow"
                                    >
                                        <button
                                            onClick={() => {
                                                onSelect(img.url);
                                                setOpen(false);
                                            }}
                                            className="block w-full h-full"
                                        >
                                            <Image
                                                src={img.url}
                                                alt={"Image"}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                        </button>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteImage(img._id);
                                                    }}
                                                    disabled={deletingId === img._id}
                                                    className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-full shadow hover:bg-destructive hover:text-white transition-colors"
                                                >
                                                    {deletingId === img._id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>Delete image</TooltipContent>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default ImageBucket