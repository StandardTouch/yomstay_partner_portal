import React from "react";
import BookingTable from "../pages/dashboard/BookingTable";
import bookings from "../features/BookingLsit";
import { Card } from "../components/ui/card";

function BookingListScreen() {
  const booking = bookings;
  return (
    <Card className="w-full h-full p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <BookingTable showAllBookings={booking.length} bookings={booking} viewAll={true} />
    </Card>
  );
}

export default BookingListScreen;
