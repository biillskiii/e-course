import React, { useState } from "react";
import CardWebinar from "../components/CardWebinar";
import FilterSidebarWebinar from "../components/FilterSidebarWebinar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Avatar from "../assets/avatar1.png";

const cardWebinar = [
  {
    img: Avatar,
    name: "John Doe",
    category: "UI/UX Research & Design",
    job: "Software Engineer",
    title: "Bangun Personal Brandingmu Sebagai UI/UX Designer",
    date: "Senin, 13 Desember 2025",
    hours: "13.00 - 15.00 WIB",
    price: 500000,
    isFree: true,
  },
  {
    img: Avatar,
    name: "John Doe",
    category: "UI/UX Research & Design",
    job: "Software Engineer",
    title: "Bangun Personal Brandingmu Sebagai UI/UX Designer",
    date: "Senin, 13 Desember 2025",
    hours: "13.00 - 15.00 WIB",
    price: 500000,
    hasDiscount: 50,
  },
  {
    img: Avatar,
    name: "John Doe",
    category: "UI/UX Research & Design",
    job: "Software Engineer",
    title: "Bangun Personal Brandingmu Sebagai UI/UX Designer",
    date: "Senin, 13 Desember 2025",
    hours: "13.00 - 15.00 WIB",
    price: 500000,
  },
  {
    img: Avatar,
    name: "John Doe",
    category: "Frontend Development",
    job: "Software Engineer",
    title: "Bangun Personal Brandingmu Sebagai Frontend Developer",
    date: "Senin, 13 Desember 2025",
    hours: "13.00 - 15.00 WIB",
    price: 500000,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const filterCards = () => {
    return cardWebinar.filter((card) => {
      const matchesSearch = card.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filteredCategories.length === 0 ||
        filteredCategories.includes("Semua Kategori") ||
        filteredCategories.includes(card.category);
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
          <FilterSidebarWebinar
            setFilteredCategories={setFilteredCategories}
            setFilteredLevels={setFilteredLevels}
          />
          <div className="flex flex-col space-y-10">
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="mt-[160px]">
              <div className="flex flex-wrap gap-5">
                {filterCards().map((webinar, index) => (
                  <CardWebinar
                    key={index}
                    img={webinar.img}
                    title={webinar.title}
                    name={webinar.name}
                    job={webinar.job}
                    date={webinar.date}
                    hours={webinar.hours}
                    price={webinar.price}
                    isFree={webinar.isFree}
                    hasDiscount={webinar.hasDiscount}
                    discountPrice={webinar.discountPrice}
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
