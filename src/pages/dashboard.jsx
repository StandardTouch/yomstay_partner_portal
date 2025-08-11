// app/dashboard.jsx
"use client";

import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FaBars } from "react-icons/fa6";
import { SidebarProvider, useSidebar } from "../components/ui/sidebar";
import { AppSidebar } from "../components/Appsidebar";
import { Calendar } from "@/components/ui/calendar";
import Layout from "./Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Calendar as CalendarIcon, Hotel, LogIn, LogOut } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ChartLineLabel } from "./dashboard/ChartLineLabel";
import { ChartBarDefault } from "./dashboard/ChartBarDefault";
import BookingList from "./dashboard/BookingList";

const cardsData = [
  {
    title: "800",
    message: `New Booking`,
    icon: <LogIn className="w-7 h-7 text-[var(--color-navyblue)]" />,
    gradient: "linear-gradient(135deg, #16A085, #1ABC9C)", // teal to aqua
    glow: "#1ABC9C",
  },
  {
    title: "700",
    message: `Schedule Room`,
    icon: <Hotel className="w-7 h-7 text-[var(--color-navyblue)]" />,
    gradient: "linear-gradient(135deg, #2C3E50, #3498DB)", // dark blue to sky
    glow: "#3498DB",
  },
  {
    title: "400",
    message: `Checkin`,
    icon: <LogIn className="w-7 h-7 text-[var(--color-navyblue)]" />,
    gradient: "linear-gradient(135deg, #F39C12, #F1C40F)", // orange to yellow
    glow: "#F1C40F",
  },
  {
    title: "780",
    message: `Checkout`,
    icon: <LogOut className="w-7 h-7 text-[var(--color-navyblue)]" />,
    gradient: "linear-gradient(135deg, #E74C3C, #C0392B)", // red to crimson
    glow: "#E74C3C",
  },
];

const pieData = [
  { name: "New Booking", value: 800 },
  { name: "Schedule Room", value: 700 },
  { name: "Checkin", value: 400 },
  { name: "Checkout", value: 780 },
];

const COLORS = ["#1F204C", "#1F204CD9", "#1F204CB3", "#1F204CA1", "#1F204C73"]; // different shades of blue

const barData = [
  { name: "New-Booking", value: 800 },
  { name: "Schedule-Room", value: 700 },
  { name: "Checkin", value: 400 },
  { name: "Checkout", value: 780 },
];

const Dashboard = () => {
  const { user } = useUser();
  const { toggleSidebar, open } = useSidebar();
  const [date, setDate] = React.useState(new Date());

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--primary)",
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="rounded-2xl mb-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg bg-navyblue-dark text-white">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white capitalize">
            Welcome, {user.firstName || "Partner"} {user.lastName || ""}
          </h2>
          <p className="text-lg leading-relaxed text-white/80">
            Here's your today's overview of your bookings and activities. Manage
            your hotel efficiently with our intuitive dashboard.
          </p>
        </div>

        {/* Hide this icon on mobile */}
        {/* <div className="hidden md:flex items-center">
        <div className="bg-pastelgreen hover:bg-pastelgreen-dark text-navyblue-dark rounded-full p-4 shadow-lg hover:scale-105 transition-transform">
          <CalendarIcon className="w-12 h-12" />
        </div>
      </div> */}
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            className="rounded-2xl p-6 shadow-xl text-white relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            style={{
              background: card.gradient,
              color: card.color || "#ffffff",
            }}
          >
            {/* Background Accent Circles */}
            <div
              className="absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-20 blur-2xl"
              style={{ background: card.glow }}
            ></div>
            <div className="flex items-center gap-4 relative z-10">
              {/* Icon with soft background */}
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                {card.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{card.title}</div>
                <div className="text-sm opacity-90">{card.message}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
        {/* Booking Trends */}
        <ChartBarDefault />

        {/* Revenue Card */}
        <ChartLineLabel />
      </div>
      <BookingList />
    </>
  );
};

export default Dashboard;
