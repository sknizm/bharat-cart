"use client"
import { createContext, useCallback, useContext, useState } from "react";
import { CustomerType } from "../types";

type CustomerContextType = {
    customer: CustomerType | null;
    refreshCustomer: () => Promise<void>;
};

const CustomerContext = createContext<CustomerContextType>({
    customer: null,
    refreshCustomer: async () => { },
});

export const CustomerProvider = ({ children, customer: initialCustomer }
    : {
        children: React.ReactNode;
        customer: CustomerType | null
    }) => {
    const [customer, setCustomer] = useState<CustomerType | null>(initialCustomer)

    const refreshCustomer = useCallback(async () => {
        const res = await fetch(`/api/customer/get-current`);
        const data = await res.json();
        setCustomer(data.customer ?? null)
    }, [])
    return (
        <CustomerContext.Provider value={{ customer, refreshCustomer }}>
            {
                children
            }
        </CustomerContext.Provider>
    )
}

export const useCustomer = () => {
    return useContext(CustomerContext);
}