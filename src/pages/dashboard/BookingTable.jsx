import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

function BookingTable({ showAllBookings, setShowAllBookings, bookings }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Hotel Name</TableHead>
          <TableHead>Check-in Date</TableHead>
          <TableHead>Check-out Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.slice(0, showAllBookings).map((booking) => (
          <TableRow
            key={booking.id}
            className="hover:bg-gray-100 transition-colors dark:hover:bg-gray-700 *:border odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950"
          >
            <TableCell className="font-medium w-[120px]">
              {booking.name}
            </TableCell>
            <TableCell className="text-wrap w-[100px]">
              {booking.hotelName}
            </TableCell>
            <TableCell>{booking.checkin}</TableCell>
            <TableCell>{booking.checkout}</TableCell>
            <TableCell className="text-right">
              <Button
                className={` min-w-[100px] ${
                  booking.status === "Confirmed"
                    ? "bg-green-500 hover:bg-green-600"
                    : booking.status === "Pending"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {booking.status}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default BookingTable;
