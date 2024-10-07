import React, { useState } from "react";
import Card from "../components/Card";
import FilterSidebar from "../components/FilterSidebarKelas";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Avatar from "../assets/avatar1.png";

const cardData = [
  {
    img: Avatar,
    title: "UI/UX Fundamental",
    category: "UI/UX Research & Design",
    name: "John Doe",
    job: "Software Engineer",
    level: "Pemula",
    rating: 4,
    price: 200000,
    ratingNum: "4.5",
  },
  {
    img: Avatar,
    title: "Basic Frontend Development",
    category: "Frontend Development",
    name: "Jane Smith",
    job: "Frontend Developer",
    level: "Menengah",
    rating: 5,
    price: 200000,
    ratingNum: "5.0",
  },
  {
    img: Avatar,
    title: "Belajar Membuat Component",
    category: "Frontend Development",
    name: "Robert Johnson",
    job: "UI/UX Designer",
    level: "Ahli",
    rating: 3,
    price: 200000,
    hasDiscount: 20,
    ratingNum: "3.0",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  // Function to handle filtering based on search term, categories, and levels
  const filterCards = () => {
    return cardData.filter((card) => {
      // Check if search term matches the card title (case-insensitive)
      const matchesSearch = card.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Check if the card matches any of the selected categories
      const matchesCategory =
        filteredCategories.length === 0 ||
        filteredCategories.includes("Semua Kategori") ||
        filteredCategories.includes(card.category);

      // Check if the card matches any of the selected levels
      const matchesLevel =
        filteredLevels.length === 0 ||
        filteredLevels.includes("Semua Level") ||
        filteredLevels.includes(card.level);

      return matchesSearch && matchesCategory && matchesLevel;
    });
  };

  return (
    <section className="w-full min-h-screen">
      <div className="container px-10 mx-auto">
        <Navbar />
        <div className="flex items-start px-[120px] gap-x-16 justify-center py-10">
          <FilterSidebar
            setFilteredCategories={setFilteredCategories} // Pass the setter function
            setFilteredLevels={setFilteredLevels} // Pass the setter function
          />
          <div className="flex flex-col space-y-10">
            <SearchBar setSearchTerm={setSearchTerm} /> {/* Pass the setter */}
            {/* Kelas Populer Section */}
            <div className="mt-[160px]">
              <div className="flex flex-wrap gap-5">
                {filterCards().map((card, index) => (
                  <Card
                    key={index}
                    img={card.img}
                    title={card.title}
                    name={card.name}
                    job={card.job}
                    level={card.level}
                    rating={card.rating}
                    price={card.price}
                    ratingNum={card.ratingNum}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
