import React, { useEffect, useState, useMemo } from "react";
import Card from "../components/Card";
import FilterSidebarKelas from "../components/FilterSidebarKelas";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/masuk");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/user`,
          {
            headers: {
              application: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setProfileData(result.user);
        setProfileImage(
          result.user.path_photo ||
            "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [navigate, token]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/courses`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setClasses(result.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchClasses();
  }, []);

  const applyFilters = (card) => {
    const className = card.class_name || "";
    const matchesSearch = className
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
  };

  const filteredClasses = useMemo(() => {
    return classes.filter(applyFilters);
  }, [classes, searchTerm, filteredCategories, filteredLevels]);

  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredClasses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredClasses, currentPage]);

  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full min-h-screen">
      <Navbar avatar={profileImage} />
      <div className="container px-10 mx-auto">
        <div className="flex items-start px-[120px] gap-x-16 justify-center py-10">
          <FilterSidebarKelas
            setFilteredCategories={setFilteredCategories}
            setFilteredLevels={setFilteredLevels}
          />
          <div className="flex flex-col space-y-10">
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="mt-[160px]">
              {isLoading ? (
                <div className="w-full h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-5">
                  {paginatedCards.length > 0 ? (
                    paginatedCards.map((item) => (
                      <Card
                        key={item.id}
                        img={item.path_photo}
                        mentorImg={item.mentor.path_photo}
                        title={item.class_name}
                        name={item.mentor.name}
                        job={item.mentor.specialist}
                        hasDiscount={item.price_discount}
                        level={item.level}
                        description={item.description}
                        rating={item.avg_star}
                        price={item.price}
                        label={"Daftar Kelas"}
                        onClick={() =>
                          item?.id && navigate(`/user/detail/${item.id}`)
                        }
                      />
                    ))
                  ) : (
                    <div className="w-full text-center text-primary-500 font-bold">
                      Tidak ada kelas yang tersedia
                    </div>
                  )}
                </div>
              )}
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
