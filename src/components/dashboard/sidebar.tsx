"use client";
import { Home, Inbox, Settings, User, ChevronRight, Box, ShoppingCart, Globe, CreditCard } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const { slug } = useParams()
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      url: `/${slug}/dashboard/home`,
      icon: Home,
    },
    {
      title: "Products",
      url: `/${slug}/dashboard/products`,
      icon: Box,
    },
    {
      title: "Media",
      url: `/${slug}/dashboard/media`,
      icon: Inbox,
      badge: "",
    },
    {
      title: "Orders",
      url: `/${slug}/dashboard/orders`,
      icon: ShoppingCart,
    },
    {
      title: "Payment Options",
      url: `/${slug}/dashboard/payment`,
      icon: CreditCard,
      badge: "",
    },
    {
      title: "Domain",
      url: `/${slug}/dashboard/domain`,
      icon: Globe,
    },
    {
      title: "Settings",
      url: `/${slug}/dashboard/setting`,
      icon: Settings,
    },
  ];

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/");
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="bg-white text-gray-900 min-h-screen">
        {/* Header with brand */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-black rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Store Admin</h1>
          </div>
          <p className="text-gray-500 text-xs mt-1">Manage your store settings</p>
        </div>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "mx-4 rounded-lg mb-1 transition-all duration-200",
                        active
                          ? "bg-black text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <Link href={item.url}>
                        <div className="flex items-center gap-3 py-2.5 px-3">
                          <item.icon className={cn(
                            "h-4 w-4 transition-colors",
                            active ? "text-white" : "text-gray-500"
                          )} />
                          <span className="font-medium text-sm flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge className={cn(
                              "ml-auto text-xs px-1.5 py-0.5 min-w-[20px] flex justify-center",
                              active
                                ? "bg-white text-black"
                                : "bg-gray-200 text-gray-800"
                            )}>
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronRight className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            active ? "text-white" : "text-gray-400"
                          )} />
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>



      </SidebarContent>
    </Sidebar>
  );
}