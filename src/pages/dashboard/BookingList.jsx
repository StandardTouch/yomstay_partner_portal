import React from "react";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropdown } from "react-icons/io";
import { ChartPieDonutText } from "./ChartPieDonutText";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingTable from "./BookingTable";

function BookingList() {
  const bookings = [
    {
      id: 1,
      name: "John Doe",
      hotelName: "Heller, Kling and Graham Hotel",
      roomType: "Standard Room",
      checkin: "2023-10-01",
      checkout: "2023-10-05",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Jane Smith",
      hotelName: "Nienow - Huel Hotel",
      roomType: "Deluxe Room",
      checkin: "2023-10-02",
      checkout: "2023-10-06",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alice Johnson",
      hotelName: "Stokes - Stoltenberg Hotel",
      roomType: "Suite",
      checkin: "2023-10-03",
      checkout: "2023-10-07",
      status: "Cancelled",
    },
    {
      id: 4,
      name: "Bob Brown",
      hotelName: "Leannon, Weissnat and Strosin Hotel",
      roomType: "Superior Room",
      checkin: "2023-10-04",
      checkout: "2023-10-08",
      status: "Confirmed",
    },
    {
      id: 5,
      name: "Charlie White",
      hotelName: "Ruecker, Ebert and Pollich Hotel",
      roomType: "Family Room",
      checkin: "2023-10-05",
      checkout: "2023-10-09",
      status: "Pending",
    },
    {
      id: 6,
      name: "Bob Brown",
      hotelName: "Leannon, Weissnat and Strosin Hotel",
      roomType: "Superior Room",
      checkin: "2023-10-04",
      checkout: "2023-10-08",
      status: "Cancelled",
    },
    {
      id: 7,
      name: "Charlie White",
      hotelName: "Ruecker, Ebert and Pollich Hotel",
      roomType: "Family Room",
      checkin: "2023-10-05",
      checkout: "2023-10-09",
      status: "Pending",
    },
    {
      id: 8,
      name: "John Doe",
      hotelName: "Heller, Kling and Graham Hotel",
      roomType: "Standard Room",
      checkin: "2023-10-01",
      checkout: "2023-10-05",
      status: "Confirmed",
    },
    {
      id: 9,
      name: "Jane Smith",
      hotelName: "Nienow - Huel Hotel",
      roomType: "Deluxe Room",
      checkin: "2023-10-02",
      checkout: "2023-10-06",
      status: "Pending",
    },
    {
      id: 10,
      name: "Alice Johnson",
      hotelName: "Stokes - Stoltenberg Hotel",
      roomType: "Suite",
      checkin: "2023-10-03",
      checkout: "2023-10-07",
      status: "Cancelled",
    },
  ];
  const [showAllBookings, setShowAllBookings] = React.useState(5);
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      <div className=" md:col-span-2 col-span-1 overflow-x-auto md:w-full md:p-6 p-2 rounded-lg shadow-md border bg-card md:block">
        <div className=" flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4">Booking List</h2>
          {/* <Button variant="outline">
            Month <IoMdArrowDropdown />
          </Button> */}
          <Dialog>
            <DialogTrigger className="cursor-pointer">View All</DialogTrigger>
            <DialogContent className="sm:max-w-3xl h-4/5 overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold ">
                  Booking List
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-auto">
                <BookingTable
                  showAllBookings={bookings.length}
                  setShowAllBookings={setShowAllBookings}
                  bookings={bookings}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <BookingTable
          showAllBookings={showAllBookings}
          setShowAllBookings={setShowAllBookings}
          bookings={bookings}
        />
      </div>
      <ChartPieDonutText />
    </div>
  );
}

export default BookingList;
