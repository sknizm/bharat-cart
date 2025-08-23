"use client";
import BouncingDotsLoader from "@/components/ui/bounce-loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { ListOrdered, ChevronDown, ChevronUp, Eye, Save, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderType } from "@/lib/types";
import { toast } from "sonner";
import { useStore } from "@/lib/context/store-context";
import { Button } from "@/components/ui/button";
import React from "react";
import { formatIndianCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusOptions = [
  "processing",
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];
const paymentOptions = ["unpaid", "paid", "failed", "refunded"];

// Status badge variants for better visual indication
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  processing: "secondary",
  pending: "outline",
  confirmed: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

const paymentVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  unpaid: "outline",
  paid: "default",
  failed: "destructive",
  refunded: "secondary",
};

const AllOrdersPage = () => {
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [changingOrder, setChangingOrder] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [changes, setChanges] = useState<Record<string, { status?: string, paymentStatus?: string }>>({});

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/store/${store.slug}/order`);

        if (!res.ok) {
          toast.error("Failed to get all orders");
        } else {
          const data = await res.json();
          console.log("ORDERS", data);
          setOrders(data.orders);
        }
      } catch {
        toast.error("Failed to get all orders");
      } finally {
        setIsLoading(false);
      }
    };
    getAllOrders();
  }, [store.slug]);

  const handleUpdate = (
    id: string,
    field: "status" | "paymentStatus",
    value: string
  ) => {
    setChanges(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const saveChanges = async (_id: string) => {
    try {
      setChangingOrder(_id);
      const orderChanges = changes[_id];
      if (!orderChanges) return;

      const res = await fetch(`/api/store/${store.slug}/order/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderChanges),
      });

      if (!res.ok) {
        throw new Error('Failed to update order');
      }
      setChanges({})
      toast.success("Order updated successfully");
    } catch (error) {
      toast.error("Failed to update order");
      console.error(error);
    } finally {
      setChangingOrder('');
    }
  };

  const discardChanges = (id: string) => {
    setChanges(prev => {
      const newChanges = { ...prev };
      delete newChanges[id];
      return newChanges;
    });
  };

  const hasChanges = (id: string) => {
    return !!changes[id];
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Card className="shadow-lg border-0 overflow-hidden">
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
            {
              orders.length > 0 && (
                <div className="text-sm text-gray-500">
                  {orders.length} {orders.length === 1 ? 'order' : 'orders'} total
                </div>
              )
            }
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <BouncingDotsLoader />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ListOrdered className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
              <p className="text-gray-500">Orders will appear here once customers start placing them.</p>
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden border-0">
              <Table>
                <TableHeader className="bg-gray-100/50">
                  <TableRow className="border-b border-gray-200 hover:bg-transparent">
                    <TableHead className="py-4 font-semibold text-gray-700">Order ID</TableHead>
                    <TableHead className="py-4 font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="py-4 font-semibold text-gray-700">Customer</TableHead>
                    <TableHead className="py-4 font-semibold text-gray-700">Amount</TableHead>
                    <TableHead className="py-4 font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="py-4 font-semibold text-gray-700">Payment</TableHead>
                    <TableHead className="py-4 font-semibold text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <TableRow
                        className={`border-b border-gray-100 transition-colors ${expandedRow === order._id ? "bg-green-50" : "hover:bg-gray-50/80"}`}
                      >
                        <TableCell className="py-4 font-medium">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">
                              #{order._id.slice(-8).toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              {order.type.toUpperCase()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">
                              {order.details.firstName} {order.details.lastName}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              {order.customerEmail}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 text-base font-semibold text-gray-900">
                          ₹{formatIndianCurrency(order.amount)}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Select
                              value={changes[order._id]?.status || order.status}
                              onValueChange={(value) =>
                                handleUpdate(order._id, "status", value)
                              }
                            >
                              <SelectTrigger className="w-[130px] h-8">
                                <SelectValue>
                                  <Badge
                                    variant={statusVariant[changes[order._id]?.status || order.status]}
                                    className="capitalize"
                                  >
                                    {changes[order._id]?.status || order.status}
                                  </Badge>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((s) => (
                                  <SelectItem key={s} value={s} className="capitalize">
                                    {s}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Select
                              value={changes[order._id]?.paymentStatus || order.paymentStatus}
                              onValueChange={(value) =>
                                handleUpdate(order._id, "paymentStatus", value)
                              }
                            >
                              <SelectTrigger className="w-[110px] h-8">
                                <SelectValue>
                                  <Badge
                                    variant={paymentVariant[changes[order._id]?.paymentStatus || order.paymentStatus]}
                                    className="capitalize"
                                  >
                                    {changes[order._id]?.paymentStatus || order.paymentStatus}
                                  </Badge>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {paymentOptions.map((p) => (
                                  <SelectItem key={p} value={p} className="capitalize">
                                    {p}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {hasChanges(order._id) && (
                              <>
                                <Button
                                
                                disabled={changingOrder !== ''}
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-100"
                                  onClick={() => saveChanges(order._id)}
                                >
                                  {
                                    changingOrder === order._id ? <Loader2 className="w-4 h-4 animate-spin"/>:
                                    <Save className="h-4 w-4" />
                                  }
                                </Button>
                                <Button
                                disabled={changingOrder !== ''}
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                  onClick={() => discardChanges(order._id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1"
                              onClick={() =>
                                setExpandedRow(
                                  expandedRow === order._id ? null : order._id
                                )
                              }
                            >
                              <Eye className="h-3.5 w-3.5" />
                              {expandedRow === order._id ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>

                      {/* Expanded details row */}
                      {expandedRow === order._id && (
                        <TableRow className="bg-green-50/50 border-b border-green-100">
                          <TableCell colSpan={7} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-lg border border-green-100 shadow-sm">
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
                                      {order.items?.map((item: any, idx: number) => (
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
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllOrdersPage;