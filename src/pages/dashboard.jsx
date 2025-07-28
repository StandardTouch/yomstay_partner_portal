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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

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
    glow: "#F1C40F"
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
  { name: "New Booking", value: 400 },
  { name: "Schedule Room", value: 300 },
  { name: "Checkin", value: 300 },
  { name: "Checkout", value: 200 },
];

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe']; // different shades of blue

const barData = [
  { name: "New Booking", value: 400 },
  { name: "Schedule Room", value: 300 },
  { name: "Checkin", value: 300 },
  { name: "Checkout", value: 200 },
];

const Dashboard = () => {
  const { user } = useUser();
  const { toggleSidebar, open } = useSidebar();
  const [date, setDate] = React.useState(new Date());

  return (
    <>
      {/* Hero Section */}
        <section
      className="rounded-2xl mb-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg bg-[#F0F9FF] text-slate-800"
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">
          Welcome to Your Dashboard
        </h2>
        <p className="text-lg leading-relaxed max-w-2xl text-slate-700">
          Manage your bookings, view statistics, and get insights into your hotel operations—all in one place.
        </p>
      </div>

      {/* Hide this icon on mobile */}
      <div className="hidden md:flex items-center">
        <div className="bg-emerald-500 text-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform">
          <CalendarIcon className="w-12 h-12" />
        </div>
      </div>
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
          <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-20 blur-2xl" style={{ background: card.glow }}></div>
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
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  {/* Pie Chart Card */}
  <Card className="w-full bg-[#f9fafb] text-gray-800 shadow-sm rounded-xl border border-gray-200">
    <CardHeader className="border-b border-gray-200 px-6 py-4">
      <CardTitle className="text-base font-semibold text-gray-700">Booking Statistics</CardTitle>
    </CardHeader>
    <CardContent className="px-6 py-4">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name }) => name}
            outerRadius={80}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Bar Chart Card */}
  <Card className="w-full bg-[#f9fafb] text-gray-800 shadow-sm rounded-xl border border-gray-200">
    <CardHeader className="border-b border-gray-200 px-6 py-4">
      <CardTitle className="text-base font-semibold text-gray-700">Booking Trends (Horizontal)</CardTitle>
    </CardHeader>
    <CardContent className="px-6 py-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" stroke="#9ca3af" />
          <YAxis dataKey="name" type="category" stroke="#9ca3af" />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
</div>

      {/* Calendar Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full" style={{ background: "var(--color-white)", color: "var(--color-navyblue)" }}>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Booking Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
