"use client";

import { createContext, useContext } from "react";
import { Store } from "../types";

const StoreContext = createContext<Store | null>(null);

export const StoreProvider = ({
    store,
children,
}: {
store: Store;
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