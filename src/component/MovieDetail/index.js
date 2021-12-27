import React from "react";
import StarRatings from "react-star-ratings";

function MovieDetail({ title, rating, category }) {
  return (
    <>
      <div className="grid grid-cols-12 px-3">
        <div className="lg:col-span-11 col-span-9 text-left">
          <b className="text-sm">{title}</b>

          <div className="-mt-1">
            <StarRatings
              starRatedColor="greay"
              numberOfStars={10}
              rating={rating}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />
          </div>
        </div>
        <div className="lg:col-span-1 col-span-3 text-sm font-medium">
          {category}
        </div>
      </div>
    </>
  );
}
export default MovieDetail;
