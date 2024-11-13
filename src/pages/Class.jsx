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
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 4;

  const fetchKelas = async () => {
    try {
      const response = await fetch(
        "https://be-course.serpihantech.com/api/courses"
      );
      const result = await response.json();
  
      if (result.status === "success") {
        setKelas(result.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await fetchKelas();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndPaginateCards = () => {
    const filtered = kelas.filter((card) => {
      const matchesSearch = card.class_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filteredCategories.length === 0 ||
        filteredCategories.includes("Semua Kategori") ||
        filteredCategories.includes(card.category?.category_name);
      const matchesLevel =
        filteredLevels.length === 0 ||
        filteredLevels.includes("Semua Level") ||
        filteredLevels.includes(card.level);

      return matchesSearch && matchesCategory && matchesLevel;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = () => {
    const filtered = kelas.filter((card) => {
      const matchesSearch = card.class_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filteredCategories.length === 0 ||
        filteredCategories.includes("Semua Kategori") ||
        filteredCategories.includes(card.category?.category_name);
      const matchesLevel =
        filteredLevels.length === 0 ||
        filteredLevels.includes("Semua Level") ||
        filteredLevels.includes(card.level);

      return matchesSearch && matchesCategory && matchesLevel;
    });
    return Math.ceil(filtered.length / itemsPerPage);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedCards = filterAndPaginateCards();
  const totalPages = getTotalPages();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="container px-10 mx-auto">
        <div className="flex items-start px-[120px] gap-x-16 justify-center py-10">
          <FilterSidebarKelas />
          <div className="flex flex-col space-y-10">
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="mt-[160px]">
              <div className="flex flex-wrap gap-5">
                {paginatedCards.length > 0 ? (
                  paginatedCards.map((item) => (
                    <Card
                      key={item.id}
                      class_name={item.class_name}
                      level={item.level}
                      img={item.path_photo}
                      description={item.description}
                      rating={item.rating}
                      price={item.price}
                    />
                  ))
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
