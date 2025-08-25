"use client";
import BouncingDotsLoader from "@/components/ui/bounce-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"
import { CreditCard, Loader2, MessageCircle } from "lucide-react"
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react"
import { toast } from "sonner";

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { slug } = useParams();

  const emptyData = {
    razorPayEnabled: false,
    razorpayKeyId: "",
    razorpayKeySecret: "",
    whatsappNumber: "",
    whatsappOrderEnabled: false,
  };
  const [storeData, setStoreData] = useState(emptyData);
  const [initialStoreData, setInitialStoreData] = useState(emptyData);

  useEffect(() => {
    const getStoreData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/store/${slug}/get-data?fields=razorPayEnabled,razorpayKeyId,razorpayKeySecret,whatsappOrderEnabled,whatsappNumber`, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          toast.error("Failed to get Details");
        } else {
          const data = await res.json();
          setStoreData(data.store ?? emptyData);
          setInitialStoreData(data.store ?? emptyData);
        }

      } catch {
        toast.error("Failed to get Details");
      } finally {
        setIsLoading(false)

      }
    }
    getStoreData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);


  useEffect(() => {
    const checkChanges = () => {
      if (initialStoreData !== storeData) {
        setIsChanged(true);
      }
    }
    checkChanges();
  }, [initialStoreData, storeData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  }

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const res = await fetch(`/api/store/${slug}/update-any`, {
        headers: {
          "Content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(storeData)
      });

      if (!res.ok) {
        toast.error("Failed to update details");
      } else {
        toast.success("Updated successfully");
      }
    } catch {
      toast.error("Failed to update");
    } finally {
      setIsUpdating(false);

    }
  }

  return (
    <form className="p-4" onSubmit={(e) => {
      e.preventDefault();
      handleUpdate();
    }}>
      <Card>
        <CardHeader className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl shadow-sm">
                <CreditCard className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-800 font-bold">
                  Payments Options
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Manage your Payment Gateway here
                </CardDescription>
              </div>
            </div>
            <Button
              type="submit"
              disabled={!isChanged || isUpdating}
            >{
                isUpdating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Changes</> :
                  "Save Changes"
              }</Button>
          </div>
        </CardHeader>
        {
          isLoading ? <BouncingDotsLoader /> :
            <CardContent>
              <Card className="border shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>
                    Configure your payment gateway settings
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* RazorPay Section */}
                  <div className={`rounded-lg border p-4 transition-all ${storeData.razorPayEnabled ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${storeData.razorPayEnabled ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"}`}>
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">RazorPay Payment Gateway</p>
                          <p className="text-sm text-muted-foreground">
                            {storeData.razorPayEnabled ? "Enabled" : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={storeData.razorPayEnabled}
                        onCheckedChange={(checked) => {
                          setStoreData((prev) => ({ ...prev, razorPayEnabled: checked }))
                        }}
                      />
                    </div>

                    {storeData.razorPayEnabled && (
                      <div className="mt-4 space-y-3 pl-11">
                        <div className="space-y-2">
                          <Label htmlFor="razorpay-key-id" className="text-sm font-medium">
                            Razorpay Key ID
                          </Label>
                          <Input
                            id="razorpay-key-id"
                            name="razorpayKeyId"
                            required={storeData.razorPayEnabled}
                            value={storeData.razorpayKeyId ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter your Razorpay Key ID"
                            className="bg-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="razorpay-key-secret" className="text-sm font-medium">
                            Razorpay Key Secret
                          </Label>
                          <Input
                            id="razorpay-key-secret"
                            type="password"
                            name="razorpayKeySecret"
                            required={storeData.razorPayEnabled}
                            value={storeData.razorpayKeySecret ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter your Razorpay Key Secret"
                            className="bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Order Section */}
                  <div className={`rounded-lg border p-4 transition-all ${storeData.whatsappOrderEnabled ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${storeData.whatsappOrderEnabled ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"}`}>
                          <MessageCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">WhatsApp Order Option</p>
                          <p className="text-sm text-muted-foreground">
                            {storeData.whatsappOrderEnabled ? "Enabled" : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={storeData.whatsappOrderEnabled}
                        onCheckedChange={(checked) => {
                          setStoreData((prev) => ({ ...prev, whatsappOrderEnabled: checked }))
                        }}
                      />
                    </div>

                    {storeData.whatsappOrderEnabled && (
                      <div className="mt-4 space-y-3 pl-11">
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp-number" className="text-sm font-medium">
                            WhatsApp Number
                          </Label>
                          <Input
                            required={storeData.whatsappOrderEnabled}
                            id="whatsapp-number"
                            name="whatsappNumber"
                            value={storeData.whatsappNumber ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter your WhatsApp number with country code"
                            className="bg-white"
                          />
                          <p className="text-xs text-muted-foreground">
                            Example: +1234567890
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
        }
      </Card>
    </form>
  )
}
export default PaymentPage