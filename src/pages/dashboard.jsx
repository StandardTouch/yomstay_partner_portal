// app/dashboard.jsx
"use client";

import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FaBars } from "react-icons/fa6";
import { SidebarProvider, useSidebar } from "../components/ui/sidebar";
import { AppSidebar } from "../components/sidebar";
import { Calendar } from "@/components/ui/calendar";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"; 

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Car } from "lucide-react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";


const Dashboard = () => {
  const { user } = useUser();
  const { toggleSidebar, open } = useSidebar();

const cardsData = [
    {
      title: "800",
      message: `New Booking`,
      bgColor: "bg-sky-300",
    },
    {
      title: "700",
      message: `Schedule Room`,
      bgColor: "bg-green-300",
    },
    {
      title: "400",
      message: `Checkin`,
      bgColor: "bg-yellow-400",
    },
    {
      title: "780",
      message: `Checkout`,
      bgColor: "bg-red-300",
    },
  ];

  const pieData = [
    { name: "New Booking", value: 400 }, 
    { name: "Schedule Room", value: 300 },
    { name: "Checkin", value: 300 },
    { name: "Checkout", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const barData = [
    { name: "New Booking", value: 400 },
    { name: "Schedule Room", value: 300 },
    { name: "Checkin", value: 300 },
    { name: "Checkout", value: 200 },
  ]; 

  const [date, setDate] = React.useState(new Date());

  return (
    <div className="flex w-full min-h-screen">
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex justify-between items-center px-4 bg-gray-200">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-300 focus:outline-none focus:ring"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            <FaBars className="w-5 h-5" />
          </button>
          <div className="text-2xl md:text-3xl font-semibold">
            Welcome to Partner Portal
          </div>
          <UserButton signOutRedirectUrl="/login" />
        </header>

        {/* Main content */}
        <main className="w-full mt-5 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {cardsData.map((card, index) => (
              <Card key={index} className={`shadow-lg ${card.bgColor}`}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{card.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pie Chart Card */}
          <Card className="w-full">
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
                    fill="#8884d8"
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
         <Card className="w-full">
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
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
        </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Calendar Card */}
        <Card className="w-full">
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

        </main>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Dashboard />
    </SidebarProvider>
  );
}
