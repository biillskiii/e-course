
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutCurve } from "iconsax-react";
import { jwtDecode } from "jwt-decode";
import Button from "./Button";

const DefaultNavbar = ({avatar}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for access token in sessionStorage
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      try {
        // Decode the token to get user information
        const decodedToken = jwtDecode(accessToken);
        setIsLoggedIn(true);
        setUserData({
          name: decodedToken.name || "User", // Adjust key based on your token structure
        });
      } catch (error) {
        console.error("Invalid token", error);
        // If token is invalid, clear it
        sessionStorage.removeItem("accessToken");
      }
    } else {
      setIsLoggedIn(false);
      setUserData({});
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/masuk");
  };
  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "font-bold text-primary-500 transition-colors duration-200"
      : "font-bold text-gray-900 hover:text-primary-800 transition-colors duration-200";
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-center w-full h-24 px-8 md:px-32 shadow-sm">
        <h1 className="mango uppercase text-5xl">
          <span className="text-primary-500">pixel</span>
          <span className="text-secondary-500">code.</span>
        </h1>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

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
            <li>
              <a href="/" className={getNavLinkClass("/")}>
                Beranda
              </a>
            </li>
            <li>
              <a href="/kelas" className={getNavLinkClass("/kelas")}>
                Kelas
              </a>
            </li>
            <li>
              <a
                href="/hubungi-kami"
                className={getNavLinkClass("/hubungi-kami")}
              >
                Hubungi Kami
              </a>
            </li>
            <li>
              <a
                href="/user/dashboard"
                className={getNavLinkClass("/user/dashboard")}
              >
                Dashboard
              </a>
            </li>
          </ul>
        </nav>

        {!isLoggedIn ? (
          <div className="hidden md:block">
            <Button
              label="Masuk"
              variant="primary"
              size="small"
              onClick={() => navigate("/masuk")}
            />
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDropdown}
              className="flex  items-center gap-x-5"
            >
              <img
                src={avatar}
                className="w-10 h-10 rounded-full font-bold text-gray-800"
              ></img>
              {/* <span className="text-sm text-gray-500">{userData.email}</span> */}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-20 right-[78px] w-60 bg-white rounded-lg shadow-lg py-2 z-50">
                <nav className="mt-2">
                  {/* <a
                  href="/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Pengaturan
                </a> */}
                  <a
                    onClick={handleLogout}
                    className="block cursor-pointer px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    Keluar
                  </a>
                </nav>
              </div>
            )}
            {/* <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 transition-colors"
                aria-label="Logout"
              >
                <LogoutCurve size={24} />
              </button> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default DefaultNavbar;
