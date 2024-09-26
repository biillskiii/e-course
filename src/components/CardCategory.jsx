import React from "react";
import BgCard from "../assets/category.png";

const CardCategory = ({ label }) => {
  return (
    <div
      className="relative w-[384px] h-[164px] rounded-3xl overflow-hidden"
      style={{
        backgroundImage: `url(${BgCard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Text */}
      <p className="mango leading-tight absolute top-1/2 left-6 transform -translate-y-1/2 text-secondary-50 w-[188px] uppercase text-[48px] z-20">
        {label}
      </p>
    </div>
  );
};

export default CardCategory;
