import React, { useState } from "react";
import InputBase from "./InputForm";

const FilterSidebar = () => {
  // State to manage the selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const categories = [
    "Semua Kategori",
    "Frontend Development",
    "Backend Development",
    "Android Development",
    "UI/UX Research & Design",
    "Data Science",
  ];

  const levels = ["Semua Level", "Pemula", "Menengah", "Ahli"];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((item) => item !== level)
        : [...prev, level]
    );
  };

  // Function to reset filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  return (
    <div className="p-10 border border-primary-200 rounded-3xl w-[305px]">
      <FilterSection
        title="Kategori"
        options={categories}
        selectedOptions={selectedCategories}
        onOptionChange={handleCategoryChange}
      />
      <FilterSection
        title="Level Kesulitan"
        options={levels}
        selectedOptions={selectedLevels}
        onOptionChange={handleLevelChange}
      />
      <button
        onClick={resetFilters}
        className="text-alert-danger text-base font-bold"
      >
        Reset Filter
      </button>
    </div>
  );
};

// Reusable FilterSection Component
const FilterSection = ({ title, options, selectedOptions, onOptionChange }) => (
  <div className="mb-10">
    <h3 className="font-bold text-xl mb-6">{title}</h3>
    <ul>
      {options.map((option, index) => (
        <li key={index} className="flex items-center mb-4">
          <InputBase
            type="checkbox"
            checked={selectedOptions.includes(option)} // Bind checked state
            onChange={() => onOptionChange(option)} // Update state on change
          />
          <label htmlFor={option} className="ml-2 text-gray-700">
            {option}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default FilterSidebar;
