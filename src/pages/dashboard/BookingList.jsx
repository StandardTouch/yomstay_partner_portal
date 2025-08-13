import React from "react";
import { ChartPieDonutText } from "./ChartPieDonutText";
import ReviewCard from "../../screens/UpdateHotel/ReviewCard";
import reviews from "../../features/Review";

function BookingList() {
  const review = reviews;
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 mb-10 gap-6 *:rounded-2xl *:hover:shadow-2xl *:hover:translate-y-[-10px] *:transition-all *:duration-300">
      <ChartPieDonutText />
      <ReviewCard reviews={review} showAllReviews={4} />
    </div>
  );
}

export default BookingList;
