import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { isStoreOwner } from "@/lib/queries/store";
import { getCurrentUser } from "@/lib/queries/user";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const user = await getCurrentUser();
    if (!user) {
        redirect("/signin");
    }

    const isOwner = await isStoreOwner(user._id, slug);
    if (!isOwner) {
        redirect("/signin");
    }

    return (
        <SidebarProvider >
            <DashboardSidebar/>
             <div className="min-h-screen bg-gray-100 w-full">
            <DashboardHeader/>
            {children}
        </div>
        </SidebarProvider>
       
    );
}