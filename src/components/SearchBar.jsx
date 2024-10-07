import React from "react";
import { SearchNormal1 } from "iconsax-react"; // Using react-icons for search icon

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Search Input Container */}
      <div className="flex items-center w-[737px] bg-white border border-gray-200 rounded-full px-3 shadow-sm">
        {/* Search Icon */}
        <SearchNormal1 className="text-gray-500" />

        {/* Input Field */}
        <input
          type="text"
          placeholder="Cari"
          className="border-none focus:outline-none focus:ring-0 text-gray-600 px-3 py-2"
        />
      </div>

      {/* Search Button */}
      <button className="w[31px] bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none">
        Cari
      </button>
    </div>
  );
};

export default SearchBar;
