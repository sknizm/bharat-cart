"use client"
import { useCustomer } from "@/lib/context/customer-context"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BouncingDotsLoader from "@/components/ui/bounce-loader";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AccountPage = () => {
    const customer = useCustomer();
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const [customerData, setCustomerData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: ""
    });

    useEffect(() => {
        const getCustomerData = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`/api/customer`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email: customer?.email })
                    }
                );
                if (!res.ok) {
                    toast.error("Failed to load Details")
                } else {
                    const data = await res.json();
                    setCustomerData(data.customer);
                }
            } catch {
                toast.error("Failed to get Details")
            } finally {
                setIsLoading(false)
            }
        }
        getCustomerData();
    }, [customer])

    const handleDataUpload = async () => {
        try {
            setIsUpdating(true);
            const res = await fetch(`/api/customer`, {
                headers: {
                    "Content-Type": "application/json"
                }, method: "PUT",
                body: JSON.stringify({ body: customerData })
            });
            if (!res.ok) {
                toast.error("Failed to update details");
            } else {
                toast.success("Details updated successfully");
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to update details");
        } finally {
            setIsUpdating(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCustomerData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div>
            {
                isLoading ? <BouncingDotsLoader /> :
                    <div className="p-6 flex flex-col gap-6 mx-auto">
                        {/* Account Details */}
                        <Card className="shadow-sm border rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg">Account Details</CardTitle>
                                <CardDescription>Update your personal information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>First Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter your first name"
                                            value={customerData.firstName ?? ""}
                                            name="firstName"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Last Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter your last name"
                                            value={customerData.lastName ?? ""}
                                            name="lastName"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="mb-1">Phone Number</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        value={customerData.phone ?? ""}
                                        name="phone"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Address Details */}
                        <Card className="shadow-sm border rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg">Address Details</CardTitle>
                                <CardDescription>Manage your delivery address</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="mb-1">Address Line 1</Label>
                                        <Input
                                            type="text"
                                            placeholder="Street address"
                                            value={customerData.line1 ?? ""}
                                            name="line1"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Address Line 2</Label>
                                        <Input
                                            type="text"
                                            placeholder="Apartment, suite, etc. (optional)"
                                            value={customerData.line2 ?? ""}
                                            name="line2"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label className="mb-1">City</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter your city"
                                            value={customerData.city ?? ""}
                                            name="city"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label className="mb-1">State</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter your state"
                                            value={customerData.state ?? ""}
                                            name="state"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label>Pincode</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter postal code"
                                            value={customerData.postalCode ?? ""}
                                            name="postalCode"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <Button disabled={isUpdating} onClick={handleDataUpload} >{isUpdating ? <><Loader2 className="w-4 h-4 animate-spin" />Saving..</> : "Save Changes"}</Button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default AccountPage
