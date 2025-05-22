import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
      const slides = [
    {
     
      image: "  https://i.ibb.co/0pn0zg7M/32618029-7967011.jpg",
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
            className="h-[550px] bg-cover flex flex-col items-center justify-center text-white p-6"
            style={{ backgroundImage: `url(${slide.image})` }}
          >

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    );
};

export default Banner;
