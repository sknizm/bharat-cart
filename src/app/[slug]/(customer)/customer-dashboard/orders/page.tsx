"use client";
import BouncingDotsLoader from "@/components/ui/bounce-loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCustomer } from "@/lib/context/customer-context";
import { OrderType } from "@/lib/types";
import { formatIndianCurrency } from "@/lib/utils";
import { ListOrdered } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner";

const CustomerOrderPage = () => {
    const customer = useCustomer();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        const getAllCustomerOrders = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`/api/customer/${customer?._id}/order`);
                if (!res.ok) {
                    toast.error("Failed to get Orders")
                } else {
                    const data = await res.json();
                    setOrders(data.orders);
                }
            } catch {
                toast.error("Failed to load orders")
            } finally {
                setIsLoading(false)
            }
        }

        getAllCustomerOrders();
    }, [customer?._id])

    return (
        <div className="p-4">
            <Card>
                <CardHeader className="px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-xl shadow-sm">
                                <ListOrdered className="h-6 w-6 text-green-700" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl text-gray-800 font-bold">
                                    All Orders
                                </CardTitle>
                                <CardDescription className="text-gray-600 mt-1">
                                    Manage and track all your orders in one place
                                </CardDescription>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {
                        isLoading ? <BouncingDotsLoader /> :
                            <div>
                                {
                                    orders.map((order) =>
                                        <div key={order._id}>
                                            <div className="rounded-tr-md rounded-tl-md bg-green-600 p-4 text-white mt-4">
                                                <h3><strong>Order:</strong> {order._id.toUpperCase()}</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white border shadow-sm">

                                                <div>
                                                    <h4 className="font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">Customer Information</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex">
                                                            <span className="text-gray-500 w-28 flex-shrink-0">Name:</span>
                                                            <span className="text-gray-800 font-medium">{order.details.firstName} {order.details.lastName}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="text-gray-500 w-28 flex-shrink-0">Email:</span>
                                                            <span className="text-gray-800">{order.customerEmail}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="text-gray-500 w-28 flex-shrink-0">Phone:</span>
                                                            <span className="text-gray-800">{order.details.phone}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="text-gray-500 w-28 flex-shrink-0">Order Type:</span>
                                                            <span className="text-gray-800 capitalize">{order.type}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {order.type !== "pickup" && (
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">Shipping Address</h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex">
                                                                <span className="text-gray-500 w-28 flex-shrink-0">Address:</span>
                                                                <span className="text-gray-800">{order.details.line1}</span>
                                                            </div>
                                                            {order.details.line2 && (
                                                                <div className="flex">
                                                                    <span className="text-gray-500 w-28 flex-shrink-0"></span>
                                                                    <span className="text-gray-800">{order.details.line2}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex">
                                                                <span className="text-gray-500 w-28 flex-shrink-0">City:</span>
                                                                <span className="text-gray-800">{order.details.city}</span>
                                                            </div>
                                                            <div className="flex">
                                                                <span className="text-gray-500 w-28 flex-shrink-0">State:</span>
                                                                <span className="text-gray-800">{order.details.state}</span>
                                                            </div>
                                                            <div className="flex">
                                                                <span className="text-gray-500 w-28 flex-shrink-0">Pincode:</span>
                                                                <span className="text-gray-800">{order.details.postalCode}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="md:col-span-2">
                                                    <h4 className="font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">Order Items</h4>
                                                    <div className="border rounded-lg overflow-hidden">
                                                        <Table>
                                                            <TableHeader className="bg-gray-50">
                                                                <TableRow>
                                                                    <TableHead className="h-10 font-semibold">Product</TableHead>
                                                                    <TableHead className="h-10 font-semibold text-right">Quantity</TableHead>
                                                                    <TableHead className="h-10 font-semibold text-right">Price</TableHead>
                                                                    <TableHead className="h-10 font-semibold text-right">Total</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {order.items?.map((
                                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                    item: any, idx: number) => (
                                                                    <TableRow key={idx} className="border-t">
                                                                        <TableCell className="py-3">
                                                                            {item.name || "Unnamed Product"}
                                                                            {item.variant && (
                                                                                <div className="text-xs text-gray-500 mt-1">
                                                                                    Variant: {item.variant}
                                                                                </div>
                                                                            )}
                                                                        </TableCell>
                                                                        <TableCell className="py-3 text-right">{item.quantity || 1}</TableCell>
                                                                        <TableCell className="py-3 text-right">₹{formatIndianCurrency(item.price || 0)}</TableCell>
                                                                        <TableCell className="py-3 text-right font-medium">
                                                                            ₹{formatIndianCurrency((item.price || 0) * (item.quantity || 1))}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                    <div className="flex justify-end mt-4">
                                                        <div className="w-64 space-y-2">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Subtotal:</span>
                                                                <span className="text-gray-800">₹{formatIndianCurrency(order.amount)}</span>
                                                            </div>
                                                            <div className="flex justify-between border-t pt-2">
                                                                <span className="font-semibold">Total:</span>
                                                                <span className="font-bold text-lg">₹{formatIndianCurrency(order.amount)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                    }
                </CardContent>

            </Card>
        </div>
    )
}

export default CustomerOrderPage