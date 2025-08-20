import { getCurrentCustomer } from "@/lib/queries/customer";
import { redirect } from "next/navigation";

export default async function CustomerDashboardLayout(
    {
        children, params }: {
            children: React.ReactNode;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            params: any;
        }) {
    const { slug } = params;
    const customer = await getCurrentCustomer();
    if (!customer) redirect(`/${slug}/signin`)
    return (
        <div>
            {children}
        </div>
    )
}