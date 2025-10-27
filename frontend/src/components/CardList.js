import React, { useEffect, useState } from "react";
import cardImg1 from "../assets/plan.jpg";
import cardImg2 from "../assets/sinners2.jpg";
import cardImg3 from "../assets/tron.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { getTopRatedMovies } from "../api/apiCalls";

import { Link } from "react-router"; 

const CardList = ({ title, category }) => {
  const [data, setData] = useState(null);

  const fetchTopRatedMovies = async (cat) => {
    const response = await getTopRatedMovies(cat);
    setData(response.results);
  };

  useEffect(() => {
    fetchTopRatedMovies(category);
  }, [category]);

  return (
    <>
      {data ? (
        <div className="text-white md:px-4">
          <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>
          <Swiper slidesPerView={"auto"} className="mySwiper ">
            {data.map((item) => (
              <SwiperSlide key={item.id} className="max-w-72 px-2">
                <Link to={`/movie/${item.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                    alt="movieCover-img"
                    className="h-44 w-full object-center object-cover"
                  />
                </Link>

                <p className="text-center pt-2  ">{item.original_title}</p>
              </SwiperSlide>
            ))}
            {console.log(data)}
          </Swiper>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default CardList;
