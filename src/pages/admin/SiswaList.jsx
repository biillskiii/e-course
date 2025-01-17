import React, { useState, useEffect } from "react";
import NavbarDashboard from "../../components/NavbarDashboard";
import Button from "../../components/Button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { NotificationCircle } from "iconsax-react";
import {
  Home,
  People,
  Monitor,
  MonitorRecorder,
  Wallet,
  Setting3,
  LogoutCurve,
  Teacher,
  SearchNormal1,
  Filter,
  Edit2,
  Trash,
} from "iconsax-react";
import { jwtDecode } from "jwt-decode";

const Kelas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listMentee, setListMentee] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 5;
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { class_name } = location.state || {};
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/mentee-list/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const result = await response.json();

        // Updated data validation for the new API structure
        if (!Array.isArray(result.data.purchases)) {
          throw new Error("Unexpected data format from API");
        }

        setListMentee(result.data.purchases);
        console.log(listMentee);
        setFilteredData(result.data.purchases);

        // Update pagination-related state
        setTotalItems(result.total || result.data.length);
        setLastPage(result.last_page || 1);
        setCurrentPage(result.current_page || 1);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Authentication and token validation
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/masuk");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);

      // Check role_id
      if (decodedToken.role_id != 1) {
        navigate("/masuk");
        return;
      }

      setUserProfile({
        username: decodedToken.name || "1",
        avatar:
          decodedToken.avatar ||
          "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
      });
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/masuk");
    }
  }, [navigate]);

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredData(listMentee);
    } else {
      const filtered = listMentee.filter((kelas) =>
        kelas.class_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Pagination handler
  const handlePageChange = async (pageNumber) => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/courses?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const result = await response.json();

      setlistMentee(result.data);
      setFilteredData(result.data);
      setCurrentPage(result.current_page || pageNumber);
      setTotalItems(result.total || result.data.length);
      setLastPage(result.last_page || 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/masuk");
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-60 fixed min-h-screen bg-white shadow-lg flex flex-col justify-between items-center p-5">
        <div className="space-y-6">
          <h1 className="mango text-center text-secondary-500 text-[40px] mb-10">
            PIXEL<span className="text-primary-500">CODE.</span>
          </h1>
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
            onClick={() => handleNavigation("/admin/dashboard")}
          />
          <Button
            label="Kelas"
            active={true}
            variant="side-primary"
            leftIcon={<Monitor />}
            size="very-big"
            onClick={() => handleNavigation("/admin/kelas")}
          />
          <Button
            label="Webinar"
            variant="disable"
            leftIcon={<MonitorRecorder />}
            size="very-big"
            onClick={() => handleNavigation("/admin/webinar")}
          />
          <Button
            label="Mentee"
            variant="side-primary"
            leftIcon={<People />}
            size="very-big"
            onClick={() => handleNavigation("/admin/mentee")}
          />
          <Button
            label="Mentor"
            variant="side-primary"
            leftIcon={<Teacher />}
            size="very-big"
            onClick={() => handleNavigation("/admin/mentor")}
          />
          <Button
            label="Daftar Transaksi"
            variant="side-primary"
            leftIcon={<Wallet />}
            size="very-big"
            onClick={() => handleNavigation("/admin/daftar-transaksi")}
          />
        </div>
        <Button
          label="Keluar"
          variant="side-danger"
          leftIcon={<LogoutCurve />}
          size="very-big"
          onClick={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-60">
        <NavbarDashboard
          avatar={userProfile.avatar}
          username={userProfile.username}
        />

        {/* Header Section */}
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-semibold">Daftar Mentee {class_name}</h1>
          <div className="flex gap-4 items-center">
            {/* Animated Search Bar */}
            <div
              className={`relative flex items-center transition-all duration-300 ${
                isSearchActive ? "w-64" : "w-10"
              }`}
            >
              <input
                type="text"
                placeholder="Cari"
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsSearchActive(true)}
                onBlur={() => !searchTerm && setIsSearchActive(false)}
                className={`transition-all duration-300 ease-in-out pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-primary-500 ${
                  isSearchActive ? "opacity-100 w-full" : "opacity-0 w-0"
                }`}
              />
              <SearchNormal1
                size="20"
                className="absolute left-2 cursor-pointer text-primary-500"
                onClick={() => setIsSearchActive(true)}
              />
            </div>

            {/* Filter Button */}
            <button className="p-2 border border-gray-200 rounded-lg">
              <Filter />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow mx-6">
          <table className="w-full">
            <thead className="bg-primary-50/75">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm text-[#20B1A8]">ID</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">NAMA</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">EMAIL</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : (
                // Filter data dengan id > 1
                filteredData
                  .filter((kelas) => kelas.user.id > 1)
                  .map((kelas) => (
                    <tr key={kelas.id} className="border-t border-gray-100">
                      <td className="px-6 py-4">{kelas.user.id}</td>
                      <td className="px-6 py-4">{kelas.user.name}</td>
                      <td className="px-6 py-4">{kelas.user.email}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex w-full justify-between items-center py-6 px-6">
            <div>
              Showing {(currentPage - 1) * perPage + 1}-
              {Math.min(currentPage * perPage, totalItems)} of {totalItems}{" "}
              entries
            </div>
            <div className="flex justify-end gap-2 p-4">
              {Array.from({ length: lastPage }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-[#20B1A8] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kelas;
