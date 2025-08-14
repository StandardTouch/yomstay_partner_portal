import React from "react";
import reviews from "../features/Review";
import ReviewCard from "./UpdateHotel/ReviewCard";


function ReviewScreen() {
  const review = reviews;
  return (
    <ReviewCard reviews={review} showAllReviews={review.length} viewAll={false} />
  );
}

export default ReviewScreen;
