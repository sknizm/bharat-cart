"use client";

import { createContext, useContext, useState } from "react";
import { CartItemType } from "../types";


interface CartContextType {
    cartItems: CartItemType[];
    addToCart: (item: Omit<CartItemType, 'quantity'>) => void;
    removeFromCart: (_id: string) => void;
    clearCart: () => void;
    updateCartItem: (_id: string, quantity: number) => void;
    getQuantity: (_id: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode; }) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);


    const addToCart = (item: Omit<CartItemType, 'quantity'>) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i._id === item._id)
            if (existing) {
                return prev.map((i) =>
                    i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
                )

            }
            return [...prev, { ...item, quantity: 1 }]
        })
    };

    const updateCartItem = (_id: string, quantity: number) => {
        setCartItems((prev) =>
            quantity <= 0 ?
                prev.filter((item) => item._id !== _id)
                :
                prev.map((item) => (item._id === _id ? { ...item, quantity } : item))
        )
    }

    const removeFromCart = (_id: string) => {
        setCartItems((prev) => prev.filter((item) => item._id !== _id))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getQuantity = (_id: string) =>
        cartItems.find((item) => item._id === _id)?.quantity || 0

    return <CartContext.Provider
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            updateCartItem,
            getQuantity
        }}
    >
        {children}
    </CartContext.Provider >

}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context
}