import React from "react";
import { SearchNormal1 } from "iconsax-react";

const SearchBar = ({ setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex w-[824px] items-center space-x-2">
      {/* Search Input */}
      <div className="flex items-center w-full bg-white border border-gray-200 rounded-full px-3 shadow-sm">
        {/* Icon */}
        <SearchNormal1 className="text-gray-500" />

        {/* Input */}
        <input
          type="text"
          placeholder="Cari"
          className="border-none focus:outline-none focus:ring-0 text-gray-600 px-3 py-2"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
