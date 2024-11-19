import React, { useState, useEffect } from "react";
import NavbarDashboard from "../../components/NavbarDashboard";
import Button from "../../components/Button";
import { userData, mentorData } from "../../data";
import { useNavigate } from "react-router-dom";
import {
  Home,
  People,
  Monitor,
  MonitorRecorder,
  Wallet,
  Setting3,
  LogoutCurve,
  Teacher,
  Filter,
  SearchNormal1,
  Edit2,
  Trash,
} from "iconsax-react";
const Mentor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorData, setMentorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://be-course.serpihantech.com/api/mentors"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        console.log(data.data.name);
        // Validasi apakah data adalah array
        if (!Array.isArray(data.data)) {
          throw new Error("Unexpected data format from API");
        }

        setMentorData(data.data); // Data sesuai respons API
        setFilteredData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleNavigation = (path) => {
    navigate(path);
  };
  // Filter data based on search term
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredData(mentorData);
    } else {
      const filtered = mentorData.filter((mentor) =>
        mentor.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-60 fixed  min-h-screen bg-white shadow-lg flex flex-col justify-between items-center p-5">
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
            variant="side-primary"
            leftIcon={<Monitor />}
            size="very-big"
            onClick={() => handleNavigation("/admin/kelas")}
          />
          <Button
            label="Webinar"
            variant="side-primary"
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
            active={true}
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
          <Button
            label="Pengaturan"
            variant="side-primary"
            leftIcon={<Setting3 />}
            size="very-big"
          />
        </div>
        <Button
          label="Keluar"
          variant="side-danger"
          leftIcon={<LogoutCurve />}
          size="very-big"
          onClick={() => handleNavigation("/login")}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-60">
        <NavbarDashboard
          avatar={userData.avatar}
          username={userData.username}
        />

        {/* Header Section */}
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-semibold">Daftar Webinar</h1>
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

            {/* Mentee Text */}
            <div className="flex items-center text-primary-500">
              <span className="mr-2">Mentee</span>
            </div>

            {/* Add Class Button */}
            <Button label="Tambah Kelas" size="small" variant="primary" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow mx-6">
          <table className="w-full">
            <thead className="bg-primary-50/75">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm text-[#20B1A8]">ID</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">NAMA</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">PEKERJAAN</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">AKSI</th>
              </tr>
            </thead>
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : error ? (
              <div className="w-full text-red-500 text-center py-10">
                {error}
              </div>
            ) : (
              <tbody>
                {currentData.map((mentor, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="px-6 py-4">{mentor.id}</td>
                    <td className="px-6 py-4">{mentor.name}</td>
                    <td className="px-6 py-4">{mentor.specialist}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-[#20B1A8] hover:bg-gray-100 rounded">
                          <Edit2 size={20} />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-gray-100 rounded">
                          <Trash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {/* Pagination */}
          <div className="flex justify-end gap-2 p-4">
            {Array.from({ length: totalPages }, (_, i) => (
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
  );
};

export default Mentor;
