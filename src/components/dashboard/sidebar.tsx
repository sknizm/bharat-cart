"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Sidebar, SidebarContent,  SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";

export function DashboardSidebar(){
  const { slug } = useParams()
    const items = [
  {
    title: "Home",
    url: `/${slug}/dashboard/home`,
    icon: Home,
  },
  {
    title: "All Products",
    url: `/${slug}/dashboard/products`,
    icon: Inbox,
  },
  {
    title: "All Media",
    url: `/${slug}/dashboard/media`,
    icon: Calendar,
  },
  {
    title: "Search",
    url: `/${slug}/dashboard/home`,
    icon: Search,
  },
  {
    title: "Settings",
    url: `/${slug}/dashboard/home`,
    icon: Settings,
  },
]
    return(
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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