"use client";
import { CreditCard, Home, Inbox } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Badge } from "../ui/badge";

export function CustomerDashboardSidebar() {
  const { slug } = useParams()
  const pathname = usePathname();
  const items = [
    {
      title: "Account Details",
      url: `/${slug}/customer-dashboard/account`,
      icon: Home,
      badge:""
    },
    {
      title: "My Orders",
      url: `/${slug}/customer-dashboard/account`,
      icon: Inbox,
      badge:""
    },
    {
      title: "My Payments",
      url: `/${slug}/customer-dashboard/account`,
      icon: CreditCard,
      badge:""
    },
  ]
  return (
    <Sidebar >
      <SidebarContent className="bg-green-600">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-white mb-3">My Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton className="bg-black text-white py-4" asChild>
                    <Link className="py-4" href={item.url}>
                      <item.icon />
                      <span className="flex items-center justify-center">{item.title} {item.badge && 
                      (<Badge className={`${pathname.endsWith(item.url)?"hidden":""} text-xs   bg-green-600 ml-2`}>{item.badge}</Badge>)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>);
}