import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Notification } from "iconsax-react";

import Button from "./Button";

const Navbar = ({ variant = "default" }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Logo = () => (
    <h1 className="uppercase mango text-primary-500 text-5xl">
      pixel<span className="text-secondary-500">code.</span>
    </h1>
  );

  const DefaultNavbar = () => (
    <div className="flex justify-between items-center w-full h-24 px-8 md:px-32 shadow-sm">
      <Logo />
      <button className="md:hidden p-2" onClick={toggleMenu}>
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
        className={`absolute md:relative top-24 md:top-0 left-0 right-0 bg-white md:bg-transparent
          ${isMenuOpen ? "flex" : "hidden"} 
          flex-col md:flex md:flex-row md:space-x-12 
          p-4 md:p-0 space-y-4 md:space-y-0 shadow-md md:shadow-none
          ${!isMenuOpen && "md:flex"}`}
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
      {!userData.isLoggedIn && (
        <Button label="Masuk" variant="primary" size="small" />
      )}
    </div>
  );

  const LogoOnlyNavbar = () => (
    <div className="flex justify-start items-center w-full h-24 px-8 md:px-32 shadow-sm">
      <Logo />
    </div>
  );



  switch (variant) {
    case "logo-only":
      return <LogoOnlyNavbar />;
    case "welcome":
      return <WelcomeNavbar />;
    default:
      return <DefaultNavbar />;
  }
};

export default Navbar;
