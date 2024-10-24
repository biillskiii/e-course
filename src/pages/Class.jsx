import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import FilterSidebarKelas from "../components/FilterSidebarKelas";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://be-course.serpihantech.com/api/categories"
      );
      const result = await response.json();
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchKelas = async () => {
    try {
      const response = await fetch(
        "https://be-course.serpihantech.com/api/kelas"
      );
      const result = await response.json();
      setKelas(result.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Fungsi untuk melakukan filtering dan pagination
  const filterAndPaginateCards = () => {
    // Filter berdasarkan search term, kategori, dan level
    const filtered = kelas.filter((card) => {
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

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Return paginated data
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filtered = kelas.filter((card) => {
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
    return Math.ceil(filtered.length / itemsPerPage);
  };

  useEffect(() => {
    fetchKelas();
    fetchCategories();
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
          <FilterSidebarKelas
            setFilteredCategories={setFilteredCategories}
            setFilteredLevels={setFilteredLevels}
            categories={categories}
          />
          <div className="flex flex-col space-y-10">
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="mt-[160px]">
              <div className="flex flex-wrap gap-5">
                {paginatedCards.length > 0 ? (
                  paginatedCards.map((item) => <Card key={item.id} {...item} />)
                ) : (
                  <div className="w-full text-center text-primary-500 font-bold">
                    Tidak ada kelas yang tersedia
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
