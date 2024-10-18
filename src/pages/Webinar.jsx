import React, { useEffect, useState } from "react";
import CardWebinar from "../components/CardWebinar";
import FilterSidebarWebinar from "../components/FilterSidebarWebinar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [webinar, setWebinar] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchWebinar = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/webinars");
      const result = await response.json();
      setWebinar(result.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const filterAndPaginateCards = () => {
    // Filter the cards first
    const filtered = webinar.filter((card) => {
      const matchesSearch = card.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filteredCategories.length === 0 ||
        filteredCategories.includes("Semua Kategori") ||
        filteredCategories.includes(card.category);

      return matchesSearch && matchesCategory;
    });

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Return paginated data
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filtered = webinar.filter((card) => {
      const matchesSearch = card.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filteredCategories.length === 0 ||
        filteredCategories.includes("Semua Kategori") ||
        filteredCategories.includes(card.category);

      return matchesSearch && matchesCategory;
    });
    return Math.ceil(filtered.length / itemsPerPage);
  };

  useEffect(() => {
    fetchWebinar();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedCards = filterAndPaginateCards();
  const totalPages = getTotalPages();

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
                {paginatedCards.length > 0 ? (
                  paginatedCards.map((item) => (
                    <CardWebinar key={item.id} {...item} />
                  ))
                ) : (
                  <div className="w-full text-center text-primary-500 font-bold">
                    Tidak ada webinar yang tersedia
                  </div>
                )}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
