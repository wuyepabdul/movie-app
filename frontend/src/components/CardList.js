import React from "react";
import cardImg1 from "../assets/plan.jpg";
import cardImg2 from "../assets/sinners2.jpg";
import cardImg3 from "../assets/tron.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

const CardList = () => {
  const data = [
    {
      id: 1,
      title: "Card1",
      description: "Description for card 1",
      imageUrl: cardImg1,
    },
    {
      id: 2,
      title: "Card2",
      description: "Description for card 2",
      imageUrl: cardImg2,
    },
    {
      id: 3,
      title: "Card3",
      description: "Description for card 3",
      imageUrl: cardImg3,
    },
    {
      id: 4,
      title: "Card4",
      description: "Description for card 4",
      imageUrl: cardImg1,
    },
    {
      id: 5,
      title: "Card5",
      description: "Description for card 5",
      imageUrl: cardImg2,
    },
    {
      id: 6,
      title: "Card6",
      description: "Description for card 6",
      imageUrl: cardImg3,
    },
    {
      id: 7,
      title: "Card7",
      description: "Description for card 7",
      imageUrl: cardImg1,
    },
    {
      id: 8,
      title: "Card8",
      description: "Description for card 8",
      imageUrl: cardImg2,
    },
    {
      id: 9,
      title: "Card9",
      description: "Description for card 9",
      imageUrl: cardImg3,
    },
  ];
  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">Upcoming</h2>
      <Swiper slidesPerView={"auto"} className="mySwiper ">
        {data.map((item) => (
          <SwiperSlide key={item.id} className="max-w-72 px-2">
            <img
              src={item.imageUrl}
              alt="movieCover-img"
              className="h-44 w-full object-center object-cover"
            />
            <p className="text-center pt-2  ">A very good movie</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardList;
