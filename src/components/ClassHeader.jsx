import React from "react";
import { Level } from "iconsax-react";
import { Book } from "iconsax-react";
import { Clock } from "iconsax-react";
import BgCard from "../assets/bg-class.png";

const ClassHeader = ({
  category,
  title,
  level,
  module,
  time,
  name,
  job,
  img,
  description,
}) => {
  return (
    <div className="w-[560px]">
      {/* Bagian header */}
      <div className="flex flex-col justify-start">
        <p className="text-xl font-medium mb-2">{category}</p>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <ul className="flex text-sm font-bold gap-10">
          <li className="flex items-center gap-2">
            <Level /> {level}
          </li>
          <li className="flex items-center gap-2">
            <Book /> {module}
          </li>
          <li className="flex items-center gap-2">
            <Clock /> {time}
          </li>
        </ul>
      </div>

      {/* Bagian card */}
      <div
        className="w-[560px] flex justify-between h-[315px] mt-5 rounded-xl pl-4"
        style={{
          backgroundImage: `url(${BgCard})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-between h-full space-y-10 py-5">
          <h1 className="text-primary-800 font-bold text-4xl flex w-[180px]">
            {title}
          </h1>
          <div>
            <p className="text-xl font-bold text-primary-800">{name}</p>
            <p className="text-[20px] font-bold text-primary-800">{job}</p>
          </div>
        </div>
        <img
          className="flex items-end"
          src={img}
          alt={title}
        />
      </div>
      <h1 className="font-bold text-2xl mt-5">Pengajar</h1>
      <div className="flex gap-x-2 items-center mt-5">
        <div className="rounded-full w-12 h-12 bg-primary-500 overflow-hidden">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-bold text-base">{name}</p>
          <p>{job}</p>
        </div>
      </div>
      <div className="w-full">
        <h1 className="font-bold text-2xl mt-5">Deskripsi</h1>
        <p className="text-justify">{description}</p>
      </div>
    </div>
  );
};

export default ClassHeader;
