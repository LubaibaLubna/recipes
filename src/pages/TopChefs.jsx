
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const chefs = [
  {
    name: "THOMAS JACKKI",
    image: "https://i.ibb.co/9HFbMz3T/pexels-photo-6874240.webp",
    recipes: 24,
  },
  {
    name: "ROLKAR JAMES",
    image: "https://i.ibb.co/R4JZ5tZC/pexels-photo-6050297.webp",
    recipes: 24,
  },
  {
    name: "WILLIMES NOMIN",
    image: "https://i.ibb.co/PGbjb3z9/pexels-photo-4590935.webp",
    recipes: 24,
  },
];

export default function TopChefs() {
  return (
    <div className="bg-gray-300 py-12 px-4 lg:px-24 text-center relative overflow-hidden ">
      <h4 className="text-yellow-600 font-semibold mb-2">Expert and Professional</h4>
      <h2 className="text-3xl md:text-4xl font-bold mb-10">TOP CHEF’S RECIPS</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
        className="pb-10"
      >
        {chefs.map((chef, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden text-left">
              <img src={chef.image} alt={chef.name} className="w-full h-72 object-cover" />
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-1">{chef.recipes} Recipes</p>
                <h3 className="font-bold text-xl">{chef.name}</h3>
                <div className="mt-2 text-yellow-600 text-xl font-bold">&rarr;</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 flex flex-col items-center text-sm">
        <p className="text-yellow-600 font-bold">
          📞 Waiting Your Call: <span className="text-gray-700">(378) 400-1234</span>
        </p>
        <div className="flex space-x-4 mt-4">
          <button className="btn btn-circle btn-sm"><i className="fab fa-facebook-f"></i></button>
          <button className="btn btn-circle btn-sm"><i className="fab fa-google"></i></button>
          <button className="btn btn-circle btn-sm"><i className="fab fa-twitter"></i></button>
          <button className="btn btn-circle btn-sm"><i className="fab fa-linkedin-in"></i></button>
        </div>
      </div>
    </div>
  );
}
