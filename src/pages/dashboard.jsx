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
    bg: "var(--color-pastelgreen)",
    color: "var(--color-navyblue)"
  },
  {
    title: "700",
    message: `Schedule Room`,
    icon: <Hotel className="w-7 h-7 text-[var(--color-navyblue)]" />, 
    bg: "var(--color-lavender)",
    color: "var(--color-navyblue)"
  },
  {
    title: "400",
    message: `Checkin`,
    icon: <LogIn className="w-7 h-7 text-[var(--color-navyblue)]" />, 
    bg: "var(--color-success-light)",
    color: "var(--color-navyblue)"
  },
  {
    title: "780",
    message: `Checkout`,
    icon: <LogOut className="w-7 h-7 text-[var(--color-navyblue)]" />, 
    bg: "var(--color-danger-light)",
    color: "var(--color-navyblue)"
  },
];

const pieData = [
  { name: "New Booking", value: 400 },
  { name: "Schedule Room", value: 300 },
  { name: "Checkin", value: 300 },
  { name: "Checkout", value: 200 },
];

const COLORS = [
  "var(--color-pastelgreen)",
  "var(--color-lavender)",
  "var(--color-success)",
  "var(--color-danger)"
];

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
      <section className="rounded-lg   mb-8 p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: "var(--bg-gradient-yomstay)", color: "var(--color-navyblue)" }}>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Your Dashboard</h2>
          <p className="text-lg max-w-xl">Manage your bookings, view statistics, and get insights into your hotel operations—all in one place.</p>
        </div>
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-16 h-16 text-[var(--color-navyblue)] bg-[var(--color-pastelgreen)] rounded-full p-3 shadow" />
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8">
        {cardsData.map((card, index) => (
          <Card key={index} className="shadow-lg flex flex-row items-center gap-4 p-4" style={{ background: card.bg, color: card.color }}>
            <div className="flex-shrink-0">{card.icon}</div>
            <div>
              <div className="text-2xl font-bold">{card.title}</div>
              <div className="text-base font-medium opacity-80">{card.message}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart Card */}
        <Card className="w-full" style={{ background: "var(--color-white)", color: "var(--color-navyblue)" }}>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Booking Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name }) => name}
                  outerRadius={80}
                  fill="var(--color-navyblue)"
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
        <Card className="w-full" style={{ background: "var(--color-white)", color: "var(--color-navyblue)" }}>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Booking Trends (Horizontal)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="var(--color-navyblue)" />
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
