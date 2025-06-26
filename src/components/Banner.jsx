import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Typewriter } from 'react-simple-typewriter';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
        <div className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                effect="fade"
                loop
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="w-full h-full">
                        <div
                            className="w-full h-full bg-cover bg-center relative flex items-center justify-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            {/* Content */}
                            <div className="relative z-10 text-center text-white px-4">
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
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
                                <p className="text-sm md:text-lg lg:text-xl max-w-xl mx-auto drop-shadow mb-6">
                                    Explore the best recipes from around the world. Easy, healthy, and delicious!
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
