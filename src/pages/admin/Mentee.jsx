import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
// Iconsax Icons
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
} from "iconsax-react";

// Custom Components
import NavbarDashboard from "../../components/NavbarDashboard";
import Button from "../../components/Button";

const Mentor = () => {
  // State Variables
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [listMentee, setListMentee] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listCourses, setListCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menteeName, setMenteeName] = useState("");
  const [menteeClass, setMenteeClass] = useState("");

  // Pagination Configuration
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Hooks
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/purchases`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch mentees");
      }

      const result = await response.json();

      if (!Array.isArray(result)) {
        throw new Error("Unexpected data format from API mentee");
      }

      setListMentee(result);
      setFilteredData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch Data on Component Mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
              if (!token) {
          navigate("/masuk");
          return;
        }

        // Fetch Users
        const userResponse = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!userResponse.ok) throw new Error("Failed to fetch users");
        const userResult = await userResponse.json();
        setListUser(userResult.data);

        // Fetch Courses
        const courseResponse = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/courses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!courseResponse.ok) throw new Error("Failed to fetch courses");
        const courseResult = await courseResponse.json();
        setListCourses(courseResult.data);

        // Decode Token
        const decodedToken = jwtDecode(token);
        if (decodedToken.role_id !== 1) {
          navigate("/masuk");
          return;
        }

        setUserProfile({
          username: decodedToken.name || "Admin",
          avatar:
            decodedToken.avatar ||
            "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
        });
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
    fetchData();
  }, [navigate]);

  // Event Handlers
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredData(listMentee);
    } else {
      const filtered = listMentee.filter((kelas) =>
        kelas.user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleSubmitMentee = async (e) => {
    e.preventDefault();

    if (!menteeName || !menteeClass) {
      toast.error("Please select both Mentee Name and Mentee Class");
      return;
    }

    setIsLoading(true);
    try {
          const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/purchases`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: menteeName,
            course_id: menteeClass,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add mentee");
      }

      // Refresh mentee list
      const fetchResponse = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/purchases`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!fetchResponse.ok) {
        throw new Error("Failed to refresh mentee list");
      }

      const updatedMentees = await fetchResponse.json();

      setListMentee(updatedMentees);
      setFilteredData(updatedMentees);

      toast.success("Mentee added successfully!");
      setMenteeName("");
      setMenteeClass("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || "An error occurred while adding mentee");
      console.error("Error adding mentee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/masuk");
  };
  // Render
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
            active={true}
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
          <h1 className="text-2xl font-semibold">Daftar Mentee</h1>
          <div className="flex gap-4 items-center">
            {/* Search Bar */}
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

            <Button
              label="Tambah Mentee"
              size="big"
              variant="primary"
              onClick={toggleModal}
            />
          </div>
        </div>

        {/* Add Mentee Modal */}
        {isModalOpen && (
          <div className="fixed inset-0  bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white py-10 pb-14 flex flex-col justify-center items-center rounded-lg h-auto w-[672px]">
              <h2 className="text-2xl font-semibold mb-4">Tambah Mentee</h2>
              <form
                onSubmit={handleSubmitMentee}
                className="space-y-10 w-full px-10"
              >
                {/* Mentee Name Dropdown */}
                <div>
                  <label
                    htmlFor="menteeName"
                    className="block text-sm font-medium mb-2"
                  >
                    User Name
                  </label>
                  <select
                    id="menteeName"
                    value={menteeName}
                    onChange={(e) => setMenteeName(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    required
                  >
                    <option value="">Pilih User</option>
                    {listUser
                      .filter((mentee) => mentee.id > 1)
                      .map((mentee) => (
                        <option key={mentee.id} value={mentee.id}>
                          {mentee.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Mentee Class Dropdown */}
                <div>
                  <label
                    htmlFor="menteeClass"
                    className="block text-sm font-medium mb-2"
                  >
                    Kelas
                  </label>
                  <select
                    id="menteeClass"
                    value={menteeClass}
                    onChange={(e) => setMenteeClass(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    required
                  >
                    <option value="">Pilih Kelas</option>
                    {listCourses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.class_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modal Buttons */}
                <div className="flex items-center gap-x-5 mt-10">
                  <Button
                    type="button"
                    label="Cancel"
                    size="full"
                    variant="secondary"
                    onClick={toggleModal}
                  />
                  <Button
                    type="submit"
                    label="Submit"
                    size="full"
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mentee Table */}
        <div className="bg-white rounded-lg shadow mx-6">
          <table className="w-full">
            <thead className="bg-primary-50/75">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm text-[#20B1A8]">ID</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">NAMA</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">EMAIL</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">COURSE</th>
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
                  <td colSpan="4" className="text-center text-red-500 py-4">
                    {error}
                  </td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData
                  .filter((mentee) => mentee.user_id > 1)
                  .map((mentee, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4">{mentee.id}</td>
                      <td className="px-6 py-4">{mentee.user.name}</td>
                      <td className="px-6 py-4">{mentee.user.email}</td>
                      <td className="capitalize px-6 py-4">
                        {mentee.course.class_name}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 py-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-primary-500 text-white"
                  : "bg-white text-primary-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentor;
