import React from "react";
import { Level } from "iconsax-react";
import { Book } from "iconsax-react";
import { Clock } from "iconsax-react";

const Classheader = ({ category, title, level, module, time }) => {
  return (
    <div className="flex flex-col justify-start">
      <p className="text-xl font-medium mb-2">{category}</p>
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
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
  );
};

export default Classheader;
