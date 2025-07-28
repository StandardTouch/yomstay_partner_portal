import React, { useEffect, useMemo, useState } from "react";
import { Home, Hotel, Inbox } from "lucide-react";
import { FaHotel } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

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
import { useTheme } from "next-themes";

// Menu items
const items = [
  // { title: "Dashboard", url: "/dashboard", icon: Home },
  // { title: "Hotel", url: "/hotel", icon: Hotel },
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
  {
    title: "RoomDetail",
    url: "/roomdetail",
    icon: Inbox,
  },
  
];

export function AppSidebar() {
  const {
    open,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Open mobile sidebar on mount if mobile
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(true);
    }
  }, [isMobile, setOpenMobile]);

  const logoSrc = useMemo(() => {
    if (!mounted) return ""; // Prevent SSR mismatch
    return resolvedTheme === "dark" ? "/logo_white.png" : "/logo_black.png";
  }, [resolvedTheme, mounted]);

  const smallLogoSrc = useMemo(() => {
    if (!mounted) return "";
    return resolvedTheme === "dark" ? "/logo_small_white.png" : "/logo_small_black.png";
  }, [resolvedTheme, mounted]);

  return (
    <Sidebar className="z-50" collapsible="icon">
      <SidebarContent>
        {/* Sidebar Header for Mobile */}
        {openMobile && (
          <SidebarHeader className="flex mt-5 justify-between flex-row space-x-2 px-3 py-2">
            <div />
            <div>
              {/* <FaHotel className="w-5 h-5" /> */}
                            <img src={logoSrc} alt="Logo Small" className="w-32" />

            </div>
            <div>
              <MdClose
                onClick={toggleSidebar}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </SidebarHeader>
        )}

        {/* Sidebar Header for Desktop */}
        {!openMobile && (
          <SidebarHeader
            className={`flex items-center space-x-2 ${open ? "px-3 py-2" : "px-2"}`}
          >
            {open ? (
              <img src={logoSrc} alt="Logo" className="w-full" />
            ) : (
              <img src={smallLogoSrc} alt="Logo Small" className="w-6 pt-1" />
            )}
          </SidebarHeader>
        )}

        {/* Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem onClick={openMobile? toggleSidebar : null} key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
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
    </Sidebar>
  );
}
