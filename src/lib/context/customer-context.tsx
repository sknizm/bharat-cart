"use client"
import { createContext, useContext } from "react";
import { CustomerType } from "../types";

const CustomerContext = createContext<CustomerType | null>(null);

export const CustomerProvider = ({ children, customer }
    : {
        children: React.ReactNode;
        customer: CustomerType | null
    }) => {
    return (
        <CustomerContext.Provider value={customer}>
            {
                children
            }
        </CustomerContext.Provider>
    )
}

export const useCustomer = () => {
    return useContext(CustomerContext);
}