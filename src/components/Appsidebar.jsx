import React, { useEffect } from "react";
import { Calendar, Home, Hotel, Inbox, Search, Settings, User } from "lucide-react";
import { FaHotel } from "react-icons/fa6";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarHeader, useSidebar } from "./ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Hotel",
    url: "/hotel",
    icon: Hotel,
  },
  
];

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
  
    toggleSidebar,
  } = useSidebar();


  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>

        {/* sidebar header  */}
        <SidebarHeader className="flex mt-5 items-center space-x-2 px-3 py-2">
  <FaHotel  className="w-5 h-5" />
  {open && <span className="whitespace-nowrap">Yomstay</span>}
</SidebarHeader>

        {/* other group */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

       

      </SidebarContent>
    </Sidebar>
  );
}
