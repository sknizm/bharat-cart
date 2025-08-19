"use client";
import { Calendar, Home, Inbox,  Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Badge } from "../ui/badge";

export function DashboardSidebar() {
  const { slug } = useParams()
  const pathname = usePathname();
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
      badge: "",
    },
    {
      title: "Custom Domain",
      url: `/${slug}/dashboard/domain`,
      icon: Calendar,
      badge: "New",
    },
    {
      title: "Settings",
      url: `/${slug}/dashboard/setting`,
      icon: Settings,
      badge: "",
    },
  ]
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={`${ pathname.endsWith(item.url) ? "bg-green-500 text-white" : ""}`} asChild>
                    <Link href={item.url}>
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