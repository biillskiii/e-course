import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutCurve } from "iconsax-react";
import { jwtDecode } from "jwt-decode";
import Button from "./Button";

const DefaultNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
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
          name: decodedToken.username || "User", // Adjust key based on your token structure
          // email: decodedToken.email || "",
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

  const handleLogout = () => {
    // Remove all user-related items from sessionStorage
    sessionStorage.removeItem("accessToken");

    // Update state
    setIsLoggedIn(false);
    setUserData({});

    // Redirect to home or login page
    navigate("/");
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

        <div className="flex items-center gap-x-5">
          <nav>
            <ul
              className={`absolute md:relative top-24 md:top-0 left-0 right-0
                flex flex-col md:flex-row
                md:space-x-12 p-4 md:p-0 space-y-4 md:space-y-0
                bg-white md:bg-transparent
                shadow-md md:shadow-none
                transition-all duration-200 ease-in-out
                ${isMenuOpen ? "flex" : "hidden md:flex"}
              `}
            >
              <li>
                <a
                  href="/user/dashboard"
                  className={`font-bold transition-colors duration-200
                    hover:text-primary-800 text-primary-500`}
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>

          {/* {!isLoggedIn ? (
            <div className="hidden md:block">
              <Button
                label="Masuk"
                variant="primary"
                size="small"
                onClick={() => navigate("/login")}
              />
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="font-semibold text-gray-800">
                  {userData.name}
                </span>
                <span className="text-sm text-gray-500">{userData.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 transition-colors"
                aria-label="Logout"
              >
                <LogoutCurve size={24} />
              </button>
            </div>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default DefaultNavbar;
