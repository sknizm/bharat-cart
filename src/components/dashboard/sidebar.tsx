"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Sidebar, SidebarContent,  SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "../ui/badge";

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
    badge:"",
  },
  {
    title: "Settings",
    url: `/${slug}/dashboard/setting`,
    icon: Settings,
    badge:"Latest",
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
                      <span className="flex items-center justify-center">{item.title} {item.badge && (<Badge className=" text-xs bg-green-600 ml-2">{item.badge}</Badge>)}</span>
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