import React from "react";
import { AppSidebar } from "../components/Appsidebar";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FaBars } from "react-icons/fa6";
import { useSidebar, SidebarProvider } from "../components/ui/sidebar";

import '@fontsource-variable/jetbrains-mono';
import { RiFontFamily } from "react-icons/ri";

function LayoutContent({ children }) {
  const { toggleSidebar, open } = useSidebar();
  const { user } = useUser();

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar */}
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className=" sticky top-0 left-0 right-0 flex items-center justify-between px-4 py-4 bg-gray-100 text-black shadow-lg z-40">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:outline-2 hover:outline-gray-500"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            style={{ color: "var(--color-navyblue)" }}
          >
            <FaBars className="w-5 h-5 text-black" />
          </button>
          <div className="text-1.5xl md:text-3xl font-semibold" style={{fontFamily: "jetbrains mono"}} >
            Partner Portal
          </div>
          <UserButton signOutRedirectUrl="/login" />
        </header>

        {/* Main content */}
        <main className="w-full mt-4 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
