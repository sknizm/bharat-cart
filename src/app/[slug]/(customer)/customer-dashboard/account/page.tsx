"use client"
import { useCustomer } from "@/lib/context/customer-context"

const AccountPage = () => {
    const customer = useCustomer();
    return (
        <div>
            Hello {customer?.email}
        </div>
    )
}

export default AccountPage