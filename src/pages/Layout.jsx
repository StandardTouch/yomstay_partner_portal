import React from "react";
import { AppSidebar } from "../components/Appsidebar";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FaBars } from "react-icons/fa6";
import { useSidebar, SidebarProvider } from "../components/ui/sidebar";
import { DarkModeSwitch } from 'react-toggle-dark-mode';


import '@fontsource-variable/jetbrains-mono';
import { RiFontFamily } from "react-icons/ri";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ModeToggle } from "../components/mode-toggle";

function LayoutContent({ children }) {
  const { toggleSidebar, open } = useSidebar();
  const { user } = useUser();
  const [isDark, setIsDark] = useState(false);

  // On mount, check localStorage and set theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar */}
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 left-0 right-0 flex items-center justify-between px-4 py-4 bg-card text-card-foreground border-b shadow-sm z-40 rounded-none">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:outline-2 hover:outline-gray-500"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            // style={{ color: "var(--color-navyblue)" }}
          >
            <FaBars className="w-5 h-5 " />
          </button>
          <div className="text-1.5xl md:text-3xl font-semibold" style={{fontFamily: "jetbrains mono"}} >
            Partner Portal
          </div>
          <div className="flex items-center gap-4">
            <DarkModeSwitch
              checked={isDark}
              onChange={toggleTheme}
              size={24}
              className="cursor-pointer"
            />
            <UserButton signOutRedirectUrl="/login" />
          </div>
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
