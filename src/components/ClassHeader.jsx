import React from "react";
import { Level, Book, Clock } from "iconsax-react";
import Button from "./Button";

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
  // Periksa apakah token ada di sessionStorage
  const hasToken = !!sessionStorage.getItem("accessToken");

  return (
    <div className="w-full">
      {/* Bagian header */}
      <div className="flex flex-col justify-start">
        <p className="capitalize text-xl font-medium mb-2">{category}</p>
        <h1 className="capitalize text-4xl font-bold mb-4">{title}</h1>
        <ul className="flex text-sm font-bold gap-10">
          <li className="flex capitalize items-center gap-2">
            <Level /> {level}
          </li>
          <li className="flex capitalize items-center gap-2">
            <Book /> {module} Module
          </li>
          <li className="flex capitalize items-center gap-2">
            <Clock /> {time}
          </li>
        </ul>
      </div>

      {/* Bagian card */}
      <div className="mt-10 rounded-xl">
        <img className="flex items-end " width={750} src={img} alt={title} />
      </div>

      {/* Tombol Selanjutnya dan Sebelumnya */}
      {hasToken && (
        <div className="flex justify-end mt-10 gap-x-5">
          <Button
            label="Sebelumnya"
            size="big"
            variant="secondary"
            className="mt-4"
          />
          <Button
            label="Selanjutnya"
            size="big"
            variant="primary"
            className="mt-4"
          />
        </div>
      )}

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
