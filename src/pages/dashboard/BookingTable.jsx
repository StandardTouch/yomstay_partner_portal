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
import AlertBox from "../../components/Alert_box";

function BookingTable({ showAllBookings, bookings, viewAll }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800 *:border">
          <TableHead>No</TableHead>
          <TableHead>Name</TableHead>
          {viewAll && <TableHead>Phone</TableHead>}
          <TableHead>Room Type</TableHead>
          <TableHead>Check-in Date</TableHead>
          <TableHead>Check-out Date</TableHead>
          {viewAll && <TableHead>Payment Status</TableHead>}
          <TableHead>Status</TableHead>
          {viewAll && <TableHead>Booking</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.slice(0, showAllBookings).map((booking) => (
          <TableRow
            key={booking.id}
            className="hover:bg-gray-100 transition-colors dark:hover:bg-gray-700 *:border odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950"
          >
            <TableCell className="font-medium w-[50px]">{booking.id}</TableCell>
            <TableCell className="font-medium w-[120px]">
              {booking.name}
            </TableCell>
            {viewAll && (
              <TableCell className="text-wrap w-[150px]">
                <a
                  href={`tel:${booking.phone}`}
                  className="text-blue-600 border-b-0 hover:underline "
                >
                  {booking.phone}
                </a>
              </TableCell>
            )}
            <TableCell className="text-wrap w-[150px]">
              {booking.roomType}
            </TableCell>
            <TableCell>{booking.checkin}</TableCell>
            <TableCell>{booking.checkout}</TableCell>
            {viewAll && (
              <TableCell>
                <Button
                  className={` min-w-[100px] capitalize dark:text-white ${
                    booking.paymet === "paid"
                      ? "bg-green-700 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {booking.paymet}
                </Button>
              </TableCell>
            )}
            <TableCell>
              <Button
                className={` min-w-[100px] dark:text-white ${
                  booking.status === "Confirmed"
                    ? "bg-green-700 hover:bg-green-600"
                    : booking.status === "Pending"
                    ? "bg-amber-500 hover:bg-yellow-500"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {booking.status}
              </Button>
            </TableCell>
            {viewAll && (
              <TableCell>
                {booking.status !== "Cancelled" ? (
                  <div className="flex gap-2 w-fit my-0 mx-auto ">
                    <AlertBox onDelete={() => {}} Check="Approve" />
                    <AlertBox onDelete={() => {}} Check="Reject" />
                  </div>
                ) : (
                  <div className="flex gap-2 w-fit my-0 mx-auto text-red-500">
                    Cancelled
                  </div>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default BookingTable;
