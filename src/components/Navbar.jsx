import React from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="flex justify-between items-center w-full h-[92px] px-[120px] shadow-sm">
      <h1 className="mango uppercase text-primary-500 text-3xl">
        pixel<span className="text-secondary-500">code.</span>
      </h1>
      <ul className="">
        <li className="space-x-[48px]">
          <a
            className={`font-bold ${
              location.pathname === "/" ? "text-primary-500" : ""
            }`}
            href="/"
          >
            Beranda
          </a>
          <a
            className={`font-bold ${
              location.pathname === "/kelas" ? "text-primary-500" : ""
            }`}
            href="/kelas"
          >
            Kelas
          </a>
          <a
            className={`font-bold ${
              location.pathname === "/webinar" ? "text-primary-500" : ""
              }`}
            href="/webinar"
          >
            Webinar
          </a>
        </li>
      </ul>
      <Button label={"Masuk"} variant="primary" size="small" />
    </div>
  );
};

export default Navbar;
