"use client";
import BouncingDotsLoader from "@/components/ui/bounce-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ErrorIcon from "@/components/ui/error-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/context/store-context"
import { CircleCheck, Copy, Globe2, Loader2 } from "lucide-react"
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CustomDomainPage = () => {
    const store = useStore();
    const [domain, setDomain] = useState(store.domain || "");
    const [isLoading, setIsLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [verified, setVerified] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const nameservers = [
        "ns1.vercel-dns.com",
        "ns2.vercel-dns.com",
    ];

    useEffect(() => {
        if (store.domain) {
            setIsLoading(false);
            setDomain(store.domain || "");
            isDomainVerified();

        }
    }, [store.domain])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleDomainUpload = async () => {
        try {
            setUpdating(true);
            const res = await fetch(`/api/store/${store.slug}/domain`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: 'PUT',
                    body: JSON.stringify({ _id: store._id, domain: domain })

                }
            );
            const data = await res.json();
            console.log("DOMAIN VERCEL", data)
            if (!res.ok) {
                toast.error("Failed to add Domain")
                setErrorMessage(data.error)
            } else {
                toast.success("Domain Added Successfully")
                isDomainVerified();

            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add Domain")
        } finally {
            setUpdating(false);
        }
    }

    const isDomainVerified = async () => {
        try {
            const res = await fetch(
                `https://api.vercel.com/v9/projects/prj_XhQaZRiEAgvnrZwhNuzTa7eeUTRZ/domains/${domain}/verify`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer 3ayUS9paQJqyFmSv0o7e22ba`,
                    },
                }
            );
            const data = await res.json();
            console.log("VERIFY", data);
            setVerified(data.verified)
        } catch {

        }
    }
    return (
        <div className="p-6 mx-auto">
            {isLoading ? (
                <div className="flex justify-center items-center ">
                    <BouncingDotsLoader />
                </div>
            ) : (
                <Card className="shadow-lg border-gray-200 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-green-50 px-6 py-5 border-b">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Globe2 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl text-gray-800">
                                    Custom Domain
                                </CardTitle>
                                <CardDescription className="text-gray-600 mt-1">
                                    Add a custom domain to make your store uniquely yours
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="domain-input" className="text-gray-700 font-medium">
                                Enter your domain
                            </Label>
                            <div className="flex gap-3">
                                <Input
                                    id="domain-input"
                                    disabled={updating}
                                    value={domain}
                                    placeholder="example.com"
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="flex-1 py-2 h-11"
                                />
                                <Button
                                    disabled={updating || !domain}
                                    onClick={handleDomainUpload}
                                    className="h-11 px-5 bg-green-600 hover:bg-green-700 transition-colors"
                                >
                                    {updating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            Adding...
                                        </>
                                    ) : (
                                        <>Add Domain</>
                                    )}
                                </Button>
                            </div>
                            <p className="text-xs text-red-500">
                                Enter your domain without https:// or www prefixes
                            </p>
                        </div>

                        {errorMessage && (
                            <div className="flex items-start p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="bg-gray-50 px-6 py-6 flex flex-col items-start gap-4">
                        {verified ? (
                            <>
                                <div className="w-full">
                                    <div className="flex items-center gap-2 text-green-700 font-medium mb-4">
                                        <div className="p-1.5 bg-green-100 rounded-full">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span>Domain successfully verified</span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4">
                                        To complete setup, update your domain&apos;s Nameservers at your registrar to point to these Nameservers:
                                        <br></br>
                                        <span className=" text-red-600">*Note: It may take upto 24hrs for domain to completely connect with us</span>
                                    </p>

                                    <div className="w-full space-y-3">
                                        {nameservers.map((ns) => (
                                            <div
                                                key={ns}
                                                className="flex items-center justify-between bg-white border rounded-lg px-4 py-3 text-sm group hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-mono text-gray-700">{ns}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyToClipboard(ns)}
                                                    className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100 transition-opacity"
                                                >
                                                    {copied === ns ? (
                                                        <span className="text-green-600 text-xs font-medium">Copied!</span>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : domain ? (
                            <div className="w-full flex items-center gap-3 text-amber-700">
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm">Waiting for domain verification. This may take a few minutes.</p>
                            </div>
                        ) : (
                            <div className="w-full text-center py-4 text-gray-500 text-sm">
                                No domain added yet. Enter your domain above to get started.
                            </div>
                        )}
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}

export default CustomDomainPage