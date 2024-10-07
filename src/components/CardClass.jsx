import React from "react";
import BgCard from "../assets/bg-class.png";

const CardClass = ({ name, job, img, title }) => {
  return (
    <div
      className="w-full flex justify-center h-[203px] mb-5 rounded-xl pl-4"
      style={{
        backgroundImage: `url(${BgCard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-between h-full space-y-10 py-5">
        <h1 className="text-primary-800 font-bold text-2xl flex w-[180px]">
          {title}
        </h1>
        <div>
          <p className="text-sm font-bold text-primary-800">{name}</p>
          <p className="text-[10px] font-bold text-primary-800">{job}</p>
        </div>
      </div>
      <img className="w-[153px] h-full" src={img} alt={title} />
    </div>
  );
};

export default CardClass;
