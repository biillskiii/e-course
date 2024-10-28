import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import { Notification } from "iconsax-react";
import DefaultAvatar from "../assets/avatar.png";

const Navbar = ({ variant = "default" }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Logo = () => (
    <h1 className="mango uppercase text-primary-500 text-5xl">
      pixel<span className="text-secondary-500">code.</span>
    </h1>
  );

  const DefaultNavbar = () => (
    <div className="flex justify-between items-center w-full h-[92px] px-[120px] shadow-sm">
      <Logo />
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
            className={`font-bold cursor-not-allowed text-gray-500 ${
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

  const LogoOnlyNavbar = () => (
    <div className="flex justify-start items-center w-full h-[92px] my-auto px-[120px] shadow-sm">
      <Logo />
    </div>
  );

  const WelcomeNavbar = ({ userData }) => (
    <div className="flex items-center px-10">
      <Logo />
      <div className="flex justify-between items-center w-full h-[92px] px-[120px] shadow-sm">
        <div className="flex flex-col items-start">
          <p className="text-sm">Halo, {userData.username}!</p>
          <p className="text-sm text-gray-500">Selamat datang di dashboard</p>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="bg-[#E9EBED] flex justify-center items-center rounded-full w-10 h-10">
            <Notification size="24" />
          </div>
          <img
            src={userData.img}
            alt="profile"
            width={40}
            height={40}
            onError={(e) => {
              e.target.src = DefaultAvatar;
            }}
          />
          <p className="">{userData.username}</p>
        </div>
      </div>
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
