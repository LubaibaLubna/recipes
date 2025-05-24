import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Typewriter } from 'react-simple-typewriter'; 
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      image: "https://i.ibb.co/0pn0zg7M/32618029-7967011.jpg",
    },
    {
      image: "https://i.ibb.co/9Hv51ykG/freepik-upload-71850.jpg",
    },
    {
      image: "https://i.ibb.co/FLVLYvB2/freepik-upload-71849.jpg",
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="w-full mx-auto overflow-hidden shadow-lg"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[550px] bg-cover bg-center flex flex-col items-center justify-center text-white p-6 relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-gray-200 text-black bg-opacity-50 p-6 rounded-xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold">
                <Typewriter
                  words={['Welcome to Recipe Book', 'Discover Delicious Recipes', 'Cook with Passion']}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h1>
              <p className="mt-4 text-lg">Explore the best recipes from around the world</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
