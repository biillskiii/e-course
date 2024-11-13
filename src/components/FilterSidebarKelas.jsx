import React, { useState } from "react";
import { Icon } from "@iconify/react";

const FilterSidebar = ({ setFilteredCategories, setFilteredLevels }) => {
  const [selectedCategories, setSelectedCategoriesState] = useState([
    "Semua Kategori",
  ]);
  const [selectedLevels, setSelectedLevelsState] = useState(["Semua Level"]);

  const categories = [
    "Semua Kategori",
    "UI/UX Research & Design",
    "Frontend Development",
    "Backend Development",
    "Data Science",
  ];

  const levels = ["Semua Level", "Pemula", "Menengah", "Ahli"];

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    if (
      updatedCategories.includes("Semua Kategori") &&
      updatedCategories.length > 1
    ) {
      setSelectedCategoriesState(
        updatedCategories.filter((item) => item !== "Semua Kategori")
      );
    } else {
      setSelectedCategoriesState(updatedCategories);
    }
    setFilteredCategories(updatedCategories);
  };

  const handleLevelChange = (level) => {
    const updatedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter((item) => item !== level)
      : [...selectedLevels, level];
    if (updatedLevels.includes("Semua Level") && updatedLevels.length > 1) {
      setSelectedLevelsState(
        updatedLevels.filter((item) => item !== "Semua Level")
      );
    } else {
      setSelectedLevelsState(updatedLevels);
    }
    setFilteredLevels(updatedLevels);
  };

  const resetFilters = () => {
    setSelectedCategoriesState(["Semua Kategori"]);
    setFilteredCategories(["Semua Kategori"]);

    setSelectedLevelsState(["Semua Level"]);
    setFilteredLevels(["Semua Level"]);
  };

  return (
    <div className="p-10 border border-primary-200 rounded-3xl w-full">
      {/* Kategori Filter */}
      <FilterSection
        title="Kategori"
        options={categories}
        selectedOptions={selectedCategories}
        onOptionChange={handleCategoryChange}
      />
      {/* Level Filter */}
      <FilterSection
        title="Level"
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

const FilterSection = ({ title, options, selectedOptions, onOptionChange }) => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <div>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="checkbox"
              id={option}
              checked={selectedOptions.includes(option)}
              onChange={() => onOptionChange(option)}
              className="form-checkbox h-5 w-5 rounded-lg border-2 border-green-500 text-green-500 focus:ring-green-500"
            />
            {/* {selectedOptions.includes(option) && (
              <Icon
                icon="mingcute:check-fill"
                className="text-green-500 absolute ml-1"
              />
            )} */}
            <label htmlFor={option} className="ml-2 text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
