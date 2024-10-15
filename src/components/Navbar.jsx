import React, { useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRoutes
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center w-full h-[92px] px-[120px] shadow-sm">
      <h1 className="mango uppercase text-primary-500 text-3xl">
        pixel<span className="text-secondary-500">code.</span>
      </h1>
      <button className="md:hidden p-2" onClick={toggleMenu}>
        {/* Hamburger icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <ul
        className={`flex-col md:flex md:flex-row ${
          isMenuOpen ? "flex" : "hidden"
        } md:space-x-[48px]`}
      >
        <li>
          <a
            className={`font-bold ${
              location.pathname === "/" ? "text-primary-500" : ""
            }`}
            href="/"
          >
            Beranda
          </a>
        </li>
        <li>
          <a
            className={`font-bold ${
              location.pathname === "/kelas" ? "text-primary-500" : ""
            }`}
            href="/kelas"
          >
            Kelas
          </a>
        </li>
        <li>
          <a
            className={`font-bold ${
              location.pathname === "/webinar" ? "text-primary-500" : ""
            }`}
            href="/webinar"
          >
            Webinar
          </a>
        </li>
        <li>
          <a
            className={`font-bold ${
              location.pathname === "/hubungi-kami" ? "text-primary-500" : ""
            }`}
            href="/hubungi-kami"
          >
            Hubungi Kami
          </a>
        </li>
      </ul>
      <Button label={"Masuk"} variant="primary" size="small" />
    </div>
  );
};

export default Navbar;
