import { CustomerDashboardHeader } from "@/components/customer/header";
import { CustomerDashboardSidebar } from "@/components/customer/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
       <SidebarProvider>
        <CustomerDashboardSidebar />
            <div className="min-h-screen bg-gray-100 w-full">
                <CustomerDashboardHeader />
                {children}
            </div>
       </SidebarProvider>
    )
}