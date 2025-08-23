"use client";
import { CreditCard, Home, Inbox, User, Settings, LogOut, ChevronRight } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function CustomerDashboardSidebar() {
  const { slug } = useParams()
  const pathname = usePathname();
  
  const items = [
    {
      title: "Account Details",
      url: `/${slug}/customer-dashboard/account`,
      icon: User,
      badge: ""
    },
    {
      title: "My Orders",
      url: `/${slug}/customer-dashboard/orders`,
      icon: Inbox,
      badge: ""
    },
    // {
    //   title: "Payment Methods",
    //   url: `/${slug}/customer-dashboard/payments`,
    //   icon: CreditCard,
    //   badge: ""
    // },
    // {
    //   title: "Settings",
    //   url: `/${slug}/customer-dashboard/settings`,
    //   icon: Settings,
    //   badge: ""
    // },
  ];

  const isActive = (url: string) => {
    return pathname === url;
  };
 
  return (
    <Sidebar className="border-r-0">
      <SidebarContent className="bg-gradient-to-b from-green-600 to-emerald-700 min-h-screen">
        {/* Header with brand */}
        <div className="p-6 border-b border-emerald-500/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">My Account</h1>
          </div>
          <p className="text-emerald-100 text-sm mt-1">Manage your account settings</p>
        </div>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-6 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-3">
            Dashboard
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
                        "mx-4 py-2 rounded-xl mb-2 transition-all duration-200",
                        active 
                          ? "bg-white/10 text-white shadow-lg" 
                          : "text-emerald-100 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Link href={item.url}>
                        <div className="flex items-center gap-3 py-3">
                          <div className={cn(
                            "p-2 rounded-lg transition-colors",
                            active 
                              ? "bg-emerald-500 text-white" 
                              : "bg-white/10 text-emerald-100"
                          )}>
                            <item.icon className="h-3 w-3" />
                          </div>
                          <span className="font-medium flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge className={cn(
                              "ml-auto text-xs px-1.5 py-0.5 min-w-[20px] flex justify-center",
                              active 
                                ? "bg-white text-emerald-700" 
                                : "bg-emerald-500 text-white"
                            )}>
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronRight className={cn(
                            "h-4 w-4 transition-transform",
                            active ? "text-emerald-500" : "text-emerald-200/70"
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

        {/* Additional section for secondary actions */}
        {/* <div className="mt-8 px-6">
          <div className="border-t border-emerald-500/30 pt-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="mx-4 rounded-xl text-emerald-100 hover:bg-white/5 hover:text-white transition-colors">
                  <div className="flex items-center gap-3 py-3">
                    <div className="p-2 rounded-lg bg-white/10 text-emerald-100">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </div> */}
      </SidebarContent>
    </Sidebar>
  );
}