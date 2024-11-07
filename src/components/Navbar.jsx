import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Notification } from "iconsax-react";
import Button from "./Button";
import DefaultAvatar from "../assets/avatar.png";

const NAV_ITEMS = [
  { path: "/", label: "Beranda" },
  { path: "/kelas", label: "Kelas" },
  { path: "/webinar", label: "Webinar" },
  { path: "/hubungi-kami", label: "Hubungi Kami" },
];

const Logo = () => (
  <h1 className="mango uppercase text-5xl">
    <span className="text-primary-500">pixel</span>
    <span className="text-secondary-500">code.</span>
  </h1>
);

const MenuButton = ({ isOpen, onClick }) => (
  <button
    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
    onClick={onClick}
    aria-expanded={isOpen}
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
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
        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
      />
    </svg>
  </button>
);

const NavList = ({ isMenuOpen, currentPath }) => (
  <nav>
    <ul
      className={`absolute md:relative top-24 md:top-0 left-0 right-0
        flex flex-col md:flex-row
        md:space-x-12 p-4 md:p-0 space-y-4 md:space-y-0
        bg-white md:bg-transparent
        shadow-md md:shadow-none
        transition-all duration-200 ease-in-out
        ${isMenuOpen ? "flex" : "hidden md:flex"}`}
    >
      {NAV_ITEMS.map(({ path, label }) => (
        <li key={path}>
          <a
            href={path}
            className={`font-bold transition-colors duration-200
              hover:text-primary-600
              ${currentPath === path ? "text-primary-500" : "text-gray-700"}`}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const DefaultNavbar = ({ userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-center w-full h-24 px-8 md:px-32 shadow-sm">
        <Logo />

        <MenuButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        <NavList isMenuOpen={isMenuOpen} currentPath={location.pathname} />

        {!userData?.isLoggedIn && (
          <div className="hidden md:block">
            <Button label="Masuk" variant="primary" size="small" />
          </div>
        )}
      </div>
    </header>
  );
};

const LogoOnlyNavbar = () => (
  <header className="w-full h-24 px-8 md:px-32 shadow-sm">
    <div className="flex items-center h-full">
      <Logo />
    </div>
  </header>
);

const Navbar = ({ variant = "default", userData = {} }) => {
  switch (variant) {
    case "logo-only":
      return <LogoOnlyNavbar />;
    default:
      return <DefaultNavbar userData={userData} />;
  }
};

export default Navbar;
