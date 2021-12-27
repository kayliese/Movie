import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import MovieDetail from "../../component/MovieDetail";
import Rating from "../../component/Rating";

const movies = [
  { title: "The Matrix", rating: 8.5, category: "Action" },
  { title: "Focus", rating: 7, category: "Comedy" },
  { title: "The Lazarus Effect", rating: 6.4, category: "Thriller" },
  { title: "Everly", rating: 5.0, category: "Action" },
  { title: "Map to the Stars", rating: 7.5, category: "Drama" },
];

const category = ["Any Genre", "Action", "Comedy", "Drama", "Thriller"];
const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Home() {
  const [movie, setMovie] = useState(movies);
  const [filterMovie, setfilterMovie] = useState(movie);
  const [serchText, setSerchText] = useState();
  const [ratingShow, setRatingShow] = useState(false);
  const [genreShow, setGenreShow] = useState(false);
  const [focused, setFocused] = React.useState(false);
  const [largestRating, setLargestRating] = useState(10);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [categoryFilter, setcategoryFilter] = useState([]);
  useEffect(() => {
    let largestnum = 10;
    if (ratingFilter.length === 0) {
      console.log("length");
      console.log(movies);
      setMovie([...filterMovie]);
    } else if (ratingFilter.includes("any")) {
      largestnum = 10;
      setLargestRating(10);

      let mo = filterMovie.filter((m) => m.rating <= largestnum);
      if (categoryFilter.length > 0 && !categoryFilter.includes("Any Genre")) {
        let mo = filterMovie.filter(
          (m) => m.rating <= largestnum && m.category === categoryFilter
        );
        setMovie(mo);
      } else {
        setMovie(mo);
      }
    } else {
      ratingFilter.sort(function (a, b) {
        return a - b;
      });
      largestnum = ratingFilter[ratingFilter.length - 1];
      setLargestRating(largestnum);
      let mo = filterMovie.filter((m) => m.rating <= largestnum);
      if (categoryFilter.length > 0 && !categoryFilter.includes("Any Genre")) {
        let mo = filterMovie.filter(
          (m) => m.rating <= largestnum && m.category === categoryFilter
        );
        setMovie(mo);
      } else {
        setMovie(mo);
      }
    }
  }, [ratingFilter]);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const RDropHandler = () => {
    setRatingShow(!ratingShow);
    setGenreShow(false);
  };
  const GDropHandler = () => {
    setRatingShow(false);
    setGenreShow(!genreShow);
  };
  const handleChange = (e) => {
    setSerchText(e.target.value);
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    let c = results.filter((m) => m.rating <= largestRating);
    setTimeout(() => setMovie(c), 20);
    setTimeout(() => setfilterMovie(c), 20);
  };
  const RatingFilter = (v) => {
    const a = ratingFilter;
    if (a.includes(v)) {
      let b = a.filter((a) => a !== v);

      setRatingFilter(b);
    } else {
      setRatingFilter([...a, v]);
    }
    console.log(a);
  };
  const categoryFilterHandler = (v) => {
    setcategoryFilter([v]);

    if (v === "Any Genre") {
      setTimeout(() => setMovie(filterMovie), 20);
    } else {
      let c = filterMovie.filter(
        (m) => m.rating <= largestRating && m.category === v
      );
      setTimeout(() => setMovie(c), 20);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 m-5 gap-3">
        <input
          className=" lg:col-span-8 col-span-6 w-full p-3 border border-gray-400  outline-none"
          type="text"
          placeholder="Enter Movie Name"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => handleChange(e)}
        />
        <div
          className="p-3 border border-gray-400 lg:col-span-2 col-span-3 "
          onClick={RDropHandler}
        >
          <div className="flex justify-between">
            <p>Rating</p>
            <div>
              <FontAwesomeIcon
                style={{ color: "#696969", fontSize: "15px" }}
                icon={ratingShow ? faChevronUp : faChevronDown}
              />
            </div>
          </div>
        </div>
        <div
          className="p-3 border border-gray-400 lg:col-span-2 col-span-3"
          onClick={GDropHandler}
        >
          <div className="flex justify-between">
            <p>Genre</p>
            <div>
              <FontAwesomeIcon
                style={{ color: "#696969", fontSize: "15px" }}
                icon={genreShow ? faChevronUp : faChevronDown}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 m-5 gap-3">
        <div className=" lg:col-span-8 col-span-6 ">
          {focused || serchText ? (
            <div className=" pt-5 pb-5 border border-gray-400 ">
              {movie.length > 0 ? (
                <>
                  {movie.map((v, k) => (
                    <div className="py-2 hover:bg-gray-100" key={k}>
                      <MovieDetail
                        title={v.title}
                        rating={parseFloat(v.rating)}
                        category={v.category}
                      />
                    </div>
                  ))}{" "}
                </>
              ) : (
                <p className="text-center font-medium text-sm">
                  No Movie Found
                </p>
              )}
            </div>
          ) : null}
        </div>

        {ratingShow ? (
          <div className="lg:col-span-4 col-span-6 px-3 py-4 border border-gray-400 ">
            <div className="flex items-center ">
              <input
                onClick={() => RatingFilter("any")}
                type="checkbox"
                className="regular-checkbox"
                defaultChecked={ratingFilter.includes("any") ? true : false}
              />
              <span className="pl-5"> Any Rating </span>
            </div>
            {rating.map((v, k) => (
              <div className="flex items-center mt-1" key={k}>
                <input
                  type="checkbox"
                  className="regular-checkbox"
                  onClick={() => RatingFilter(v)}
                  defaultChecked={ratingFilter.includes(v) ? true : false}
                />
                <span className="pl-5">
                  <Rating rating={v} />
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {genreShow ? (
          <>
            <div className="lg:col-span-2 col-span-3"></div>
            <div className="lg:col-span-2 col-span-3   ">
              <div className="px-3 py-4 border border-gray-400">
                {category.map((v, k) => (
                  <div className="flex items-center mt-1.5" key={k}>
                    <input
                      type="checkbox"
                      className="regular-checkbox"
                      onChange={() => categoryFilterHandler(v)}
                      checked={categoryFilter.includes(v)}
                    />
                    <span className="pl-5 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
export default Home;
