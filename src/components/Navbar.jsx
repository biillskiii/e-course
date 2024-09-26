import React from "react";
import Button from "./Button";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full h-[92px] px-[120px] shadow-sm">
      <h1 className="mango uppercase text-primary-500 text-3xl">
        pixel<span className="text-secondary-500">code.</span>
      </h1>
      <ul className="">
        <li className="space-x-[48px]">
          <a className="text-primary-500 font-bold" href="">
            Beranda
          </a>
          <a className=" font-bold" href="">
            Kelas
          </a>
          <a className=" font-bold" href="">
            Webinar
          </a>
        </li>
      </ul>
      <Button label={"Masuk"} variant="primary" size="small" />
    </div>
  );
};

export default Navbar;
