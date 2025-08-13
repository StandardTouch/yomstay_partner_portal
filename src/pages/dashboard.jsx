// app/dashboard.jsx
"use client";

import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Card } from "../components/ui/card";
import { Calendar as CalendarIcon, Hotel, LogIn, LogOut } from "lucide-react";
import { ChartLineLabel } from "./dashboard/ChartLineLabel";
import { ChartBarDefault } from "./dashboard/ChartBarDefault";
import BookingList from "./dashboard/BookingList";
import { Button } from "../components/ui/button";
import BookingTable from "./dashboard/BookingTable";
import bookings from "../features/BookingLsit";
import { Link } from "react-router-dom";

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

const Dashboard = () => {
  const { user } = useUser();
  const booking = bookings;

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
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8 *:hover:shadow-lg *:hover:translate-y-[-10px] *:transition-all *:duration-300">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            className="rounded-2xl p-6 shadow-xl text-white relative overflow-hidden hover:scale-[1.02] hover:shadow-2xl"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 *:hover:shadow-2xl *:hover:translate-y-[-10px] *:transition-all *:duration-300">
        {/* Booking Trends */}
        <ChartBarDefault />

        {/* Revenue Card */}
        <ChartLineLabel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 *:hover:shadow-2xl *:hover:translate-y-[-10px] *:transition-all *:duration-300">
        <Card className="md:col-span-2 col-span-1 overflow-x-auto md:w-full md:p-6 p-2 rounded-lg gap-2 ">
          <div className=" flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4 ">Booking Details</h2>
            <Link to="/bookinglist">
              <Button variant="outline" className="text-sm cursor-pointer">
                View All
              </Button>
            </Link>
          </div>
          <BookingTable showAllBookings={5} bookings={booking} />
        </Card>
      </div>
      <BookingList />
    </>
  );
};

export default Dashboard;
