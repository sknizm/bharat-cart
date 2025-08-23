"use client"
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/lib/context/cart-context";
import { useStore } from "@/lib/context/store-context";
import { formatIndianCurrency } from "@/lib/utils";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
    const router = useRouter();
    const { cartItems, updateCartItem, removeFromCart } = useCart();
    const [total, setTotal] = useState(0);
    const store = useStore();

    useEffect(() => {
        setTotal(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }, [cartItems]);

    // Empty cart state, with a small design tweak
    if (cartItems.length === 0) {
        return (
            <>
                <Header />
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
                    <ShoppingCart className="w-16 h-16 text-gray-300" />
                    <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty!</h2>
                    <p className="text-gray-500 max-w-sm">Looks like you haven&apos;t added any items to your cart yet. Go ahead and explore our store.</p>
                    <Button
                        onClick={() => router.push(`/${store.slug}`)}
                        className="mt-2 text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Start Shopping
                    </Button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto py-8 px-4 md:px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 ">Your Shopping Cart</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items Section */}
                    <section className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <Card key={item._id} className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Price: <span className="font-medium text-gray-700">₹{formatIndianCurrency(item.price.toFixed(2))}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => updateCartItem(item._id, Math.max(1, item.quantity - 1))}
                                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-medium text-gray-700">{item.quantity}</span>
                                            <button
                                                onClick={() => updateCartItem(item._id, item.quantity + 1)}
                                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="font-bold text-lg text-right w-24 text-gray-900">
                                            ₹{formatIndianCurrency((item.price * item.quantity).toFixed(2))}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full p-2 h-auto"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </section>

                    {/* Order Summary Section */}
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                                </div>
                            ))}

                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span>₹{formatIndianCurrency(total)}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full"
                            onClick={()=>{
                                router.push(`/${store.slug}/checkout`)
                            }}
                            >Proceed to Checkout</Button>
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;