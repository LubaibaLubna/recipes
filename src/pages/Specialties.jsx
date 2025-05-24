import { useState } from "react";

const tabs = ["Starters", "Mains", "Desserts"];
const content = {
  Starters: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua.",
    image: "https://i.ibb.co/yFzh84V2/top-view-tasty-meat-sauce-soup-with-seasonings-black.jpg",
  },
  Mains: {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://i.ibb.co/PZXPkfy8/112080.jpg",
  },
  Desserts: {
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://i.ibb.co/7d6CxDH2/15452.jpg",
  },
};

export default function Specialties() {
  const [activeTab, setActiveTab] = useState("Starters");

  return (
<section
  className="py-16 px-4 md:px-20 text-center bg-[url('https://i.ibb.co/gFdn2TzW/brooke-lark-w-Mzx2n-Bdeng-unsplash.jpg')] bg-cover bg-center bg-no-repeat relative"
>
  <div className="absolute inset-0 bg-white/50 z-0"></div>

  <div className="relative z-10">
    <p className="uppercase text-sm text-gray-600 mb-2">Tasty and Crunchy</p>
    <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-8 text-black">THE SPECIALTIES</h2>

    <div className="flex justify-center space-x-6 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`uppercase text-sm font-medium pb-1 border-b-2 transition-all ${
            activeTab === tab
              ? "text-black border-black"
              : "text-gray-500 border-transparent hover:text-black"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>

    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 text-gray-700 px-4 max-w-4xl mx-auto">
      <img
        src={content[activeTab].image}
        alt={activeTab}
        className="w-48 h-48 object-cover rounded-full"
      />
      <p className="text-base max-w-md">{content[activeTab].text}</p>
    </div>


  </div>
</section>

  );
}
