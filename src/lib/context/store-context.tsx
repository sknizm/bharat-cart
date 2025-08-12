"use client";

import { createContext, useContext } from "react";
import { StoreType } from "../types";

const StoreContext = createContext<StoreType | null>(null);

export const StoreProvider = ({
    store,
children,
}: {
store: StoreType;
children: React.ReactNode;
}) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}