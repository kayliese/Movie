import React from "react";
import StarRatings from "react-star-ratings";

function Rating({ rating }) {
  return (
    <StarRatings
      starRatedColor="greay"
      numberOfStars={10}
      rating={rating}
      name="rating"
      style={{ border: "1px solid black" }}
      starDimension="20px"
      starSpacing="6px"
    />
  );
}
export default Rating;
