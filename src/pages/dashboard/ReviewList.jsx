import React from "react";
import { ChartPieDonutText } from "./ChartPieDonutText";
import ReviewCard from "../../screens/UpdateHotel/ReviewCard";
import reviews from "../../features/Review";

function ReviewList() {
  const review = reviews;
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 mb-10 gap-6 *:rounded-2xl *:hover:shadow-xl *:hover:translate-y-[-10px] *:transition-all *:duration-300">
      <ChartPieDonutText />
      <ReviewCard reviews={review} showAllReviews={4} viewAll={true} />
    </div>
  );
}

export default ReviewList;
