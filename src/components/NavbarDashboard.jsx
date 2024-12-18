import React, { useState, useRef, useEffect } from "react";
import { Notification } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const NavbarDashboard = ({ username, avatar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Automatically remove loading state when username is available
  useEffect(() => {
    if (username) {
      setIsLoading(false);
    }
  }, [username]);

  // Close dropdown when clicking outside
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

  // Pulse animation classes
  const pulseClass = "animate-pulse bg-gray-200";

  return (
    <div className="flex justify-between items-center w-full h-24 px-8 md:px-10 shadow-sm">
      <div className="flex flex-col items-start">
        {isLoading ? (
          <>
            <div className={`h-4 w-32 ${pulseClass} rounded mb-2`}></div>
            <div className={`h-4 w-48 ${pulseClass} rounded`}></div>
          </>
        ) : (
          <>
            <p className="text-sm">Halo, {username}!</p>
            <p className="text-sm text-gray-500">Selamat datang di dashboard</p>
          </>
        )}
      </div>
      <div className="flex justify-end pr-3 items-center gap-x-3">
        <div className="bg-gray-100 flex justify-center items-center rounded-full w-10 h-10">
          <Notification size={24} />
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-x-3 focus:outline-none"
            disabled={isLoading}
          >
            <img
              src={isLoading ? "/api/placeholder/14/14" : avatar}
              alt="profile"
              className={`w-14 h-14 rounded-full ${
                isLoading ? pulseClass : ""
              }`}
              onError={(e) => {
                e.target.src = "/api/placeholder/14/14";
              }}
            />

            <p className={`-ml-3 font-bold ${isLoading ?`ml-2 h-4 w-32 ${pulseClass} rounded ` : ""}`}>
              {username}
            </p>
          </button>

          {/* Dropdown Menu */}
          {!isLoading && isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2 z-50">
              <nav className="mt-2">
                <a
                  onClick={handleLogout}
                  className="block cursor-pointer px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                >
                  Keluar
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
