"use client";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import BouncingDotsLoader from "@/components/ui/bounce-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/lib/context/cart-context";
import { useCustomer } from "@/lib/context/customer-context";
import { useStore } from "@/lib/context/store-context";
import { formatIndianCurrency } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CheckoutPage = () => {

    const customer = useCustomer();
    const store = useStore();
    const { cartItems } = useCart();

    const [total, setTotal] = useState(0)
    const [tab, setTab] = useState('delivery');
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

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
 
    const [order, setOrder] = useState<any>(null)

    const handleOrderCreation = async () => {
        try {
            setIsCreating(true);

            const res = await fetch(`/api/order/create-one`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(order)
            });

            if(res.ok){
                // redirect to thank u page
            }else{
            toast.error("Failed to create Order");
            }
        } catch {
            toast.error("Failed to create Order");
        } finally {
            setIsCreating(false);
        }
    }
    useEffect(() => {
        const getAllCustomerData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/customer`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({ email: customer?.email })
                });
                const data = await res.json();
                console.log("CHECKOUT", data)
                if (res.ok) {
                    setCustomerData(data.customer)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        if (customer?.email) { getAllCustomerData() }

    }, [customer])

    useEffect(() => {


        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        // const shipping = tab === 'delivery' ? 80 : 0;
        setTotal(subtotal)
    }, [cartItems]);

    useEffect(() => {
        if (!customer || !store) return
        setOrder({
            customer: customer._id,
            store: store._id,
            amount: total,
            items: cartItems.map((item) => item._id),
            details: customerData,
            status: "processing",
            paymentStatus: "unpaid"
        })
    }, [customer, store, total, cartItems, customerData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerData((prev) => ({
            ...prev, [name]: value
        }))


    }

    return (
        <>
            {
                isLoading ? <BouncingDotsLoader /> :
                    <div className="min-h-screen">
                        {/* Replace with your Header component */}
                        <Header />

                        <div className="p-4 flex md:flex-row flex-col items-start justify-between flex-nowrap gap-4">
                            {/* Checkout Card */}
                            <Card className="w-full md:w-2/3">
                                <CardHeader>
                                    <CardTitle>Checkout</CardTitle>
                                    <CardDescription>Shipping information</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs className="w-full" defaultValue="delivery">
                                        <TabsList>
                                            <TabsTrigger onClick={() => { setTab('delivery') }} value="delivery">Delivery</TabsTrigger>
                                            <TabsTrigger onClick={() => { setTab('pickup') }} value="pickup">Pickup</TabsTrigger>
                                        </TabsList>

                                        {/* Delivery Form */}
                                        <TabsContent className="flex flex-col gap-4" value="delivery">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label>First Name</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your first name"
                                                        value={customerData.firstName}
                                                        name="firstName"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Last Name</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your last name"
                                                        value={customerData.lastName}
                                                        name="lastName"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label>Phone Number</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your phone number"
                                                    value={customerData.phone}
                                                    name="phone"
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <Label>Address Line 1</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Street address"
                                                        value={customerData.line1}
                                                        name="line1"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Address Line 2</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Apartment, suite, etc. (optional)"
                                                        value={customerData.line2}
                                                        name="line2"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <Label>City</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your city"
                                                        value={customerData.city}
                                                        name="city"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>State</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your state"
                                                        value={customerData.state}
                                                        name="state"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Pincode</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter postal code"
                                                        value={customerData.postalCode}
                                                        name="postalCode"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </TabsContent>

                                        {/* Delivery Form */}
                                        <TabsContent className="flex flex-col gap-4" value="pickup">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label>First Name</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your first name"
                                                        value={customerData.firstName}
                                                        name="firstName"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Last Name</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your last name"
                                                        value={customerData.lastName}
                                                        name="lastName"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label>Phone Number</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your phone number"
                                                    value={customerData.phone}
                                                    name="phone"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* Cart Card */}
                            <Card className="w-full md:w-1/3">
                                <CardHeader>
                                    <CardTitle>Your Cart</CardTitle>
                                    <CardDescription>Confirm Cart Details</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="flex justify-between items-center border-b pb-2">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">₹{formatIndianCurrency(item.price * item.quantity)}</p>
                                        </div>
                                    ))}

                                    {/* <div className="flex justify-between pt-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span>₹{formatIndianCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>₹{shipping}</span>
                        </div> */}
                                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                                        <span>Total</span>
                                        <span>₹{formatIndianCurrency(total)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleOrderCreation} disabled={isCreating || total <= 0} className="w-full">{
                                        isCreating ? <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Order
                                        </> : <>
                                            {total <= 0 ? "Cannot Place Order" : "Place Order"
                                            }</>
                                    }</Button>
                                </CardFooter>
                            </Card>
                        </div>

                        <Footer />
                    </div>
            }
        </>
    )
}

export default CheckoutPage;