import React from "react";
import { Level, Book, Clock } from "iconsax-react";

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
  imgMentor,
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
      <div className="w-[560px] flex justify-between h-[315px] mt-10 rounded-xl">
        <img className="flex items-end" src={img} alt={title} />
      </div>
      <h1 className="font-bold text-2xl mt-10">Pengajar</h1>
      <div className="flex gap-x-2 items-center mt-5">
        <div className="rounded-full w-12 h-12 bg-primary-500 overflow-hidden">
          <img
            src={imgMentor}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-bold text-base">{name}</p>
          <p>{job}</p>
        </div>
      </div>
      <div className="w-full">
        <h1 className="font-bold text-2xl mt-10">Deskripsi</h1>
        <p className="text-justify">{description}</p>
      </div>
    </div>
  );
};

export default ClassHeader;
