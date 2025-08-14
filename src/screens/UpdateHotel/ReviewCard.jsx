import React from "react";
import { Card } from "@/components/ui/card";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

function ReviewCard({ reviews, showAllReviews, viewAll }) {
  return (
    <Card className="p-6 rounded-lg md:col-span-2 col-span-1 ">
      <div className=" flex justify-between items-center mb-2">
        <h2
          className={`${
            viewAll && "text-xl font-semibold"
          } text-2xl font-bold  `}
        >
          Reviews
        </h2>
        {viewAll && (
          <Link to="/review">
            <Button variant="outline" className="text-sm cursor-pointer">
              View All
            </Button>
          </Link>
        )}
      </div>
      <div>
        {reviews.slice(0, showAllReviews).map((review) => (
          <div
            key={review.id}
            className="border-b-2 last:border-0 py-4 flex justify-between"
          >
            <div className="flex gap-4">
              <div>
                <img
                  src={review.icon}
                  alt={review.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div>
                <h2 className="font-semibold">{review.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {review.comment.slice(0, 20)}...
                </p>
              </div>
            </div>
            <div className="flex md:gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                let icon;
                if (review.rating >= star)
                  icon = <FaStar className="text-amber-400" />;
                else if (review.rating >= star - 0.5)
                  icon = <FaStarHalfAlt className="text-yellow-400" />;
                else icon = <FaRegStar className="text-gray-400" />;
                return (
                  <div key={star} className="w-6 h-6">
                    {icon}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ReviewCard;
