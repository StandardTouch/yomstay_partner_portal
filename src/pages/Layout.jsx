import React from "react";
import { AppSidebar } from "../components/Appsidebar";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FaBars } from "react-icons/fa6";
import { useSidebar, SidebarProvider } from "../components/ui/sidebar";

function LayoutContent({ children }) {
  const { toggleSidebar, open } = useSidebar();
  const { user } = useUser();

  return (
    <div className="flex w-full min-h-screen" style={{ background: "var(--color-lightgray)" }}>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 fixed flex w-full  z-50 shadow-lg justify-between items-center px-4" style={{ background: "var(--color-navyblue)", color: "var(--color-white)" }}>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:outline-2 focus:ring"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            style={{ color: "var(--color-navyblue)" }}
          >
            <FaBars className="w-5 h-5 text-white" />
          </button>
          <div className="text-1.5xl md:text-3xl font-semibold">
            Welcome to Partner Portal
          </div>
          <UserButton signOutRedirectUrl="/login" />
        </header>
        {/* Main content */}
        <main className="w-full mt-16 p-4">
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