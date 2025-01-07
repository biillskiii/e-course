import React, { useState, useEffect } from "react";
import NavbarDashboard from "../../components/NavbarDashboard";
import Button from "../../components/Button";
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
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Mentor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorData, setMentorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const itemsPerPage = 5;
  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    specialist: "",
    path_photo: "",
  });

  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/masuk");
      return;
    }

    try {
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
      console.error("Error decoding token:", error);
      navigate("/masuk");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/mentors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }
        const result = await response.json();
        console.log(result);
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Unexpected data format from API");
        }

        setMentorData(result.data);
        setFilteredData(result.data);
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

  const handleEdit = (mentor) => {
    setSelectedMentor(mentor);
    setEditFormData({
      name: mentor.name,
      specialist: mentor.specialist,
      path_photo: mentor.path_photo,
    });
    setShowEditModal(true);
  };

  const handleDelete = (mentor) => {
    setSelectedMentor(mentor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/mentors/${
          selectedMentor.id
        }`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete mentor");
      }

      setMentorData(
        mentorData.filter((mentor) => mentor.id !== selectedMentor.id)
      );
      setFilteredData(
        filteredData.filter((mentor) => mentor.id !== selectedMentor.id)
      );
      setShowDeleteModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/mentors/${
          selectedMentor.id
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update mentor");
      }

      const updatedData = mentorData.map((mentor) =>
        mentor.id === selectedMentor.id
          ? { ...mentor, ...editFormData }
          : mentor
      );
      setMentorData(updatedData);
      setFilteredData(updatedData);
      setShowEditModal(false);
    } catch (error) {
      setError(error.message);
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
          <h1 className="text-2xl font-semibold">Data Mentor</h1>
          <div className="flex gap-4 items-center">
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
                size={"20"}
                className="absolute left-2 cursor-pointer text-primary-500"
                onClick={() => setIsSearchActive(true)}
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg">
              <Filter />
            </button>
            <Button
              label="Tambah Mentor"
              size="small"
              variant="primary"
              onClick={() => handleNavigation("/admin/tambah-mentor")}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow mx-6">
          <table className="w-full">
            <thead className="bg-primary-50/75">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm text-[#20B1A8]">ID</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">NAMA</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">
                  SPESIALISASI
                </th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">FOTO</th>
                <th className="px-6 py-4 text-sm text-[#20B1A8]">AKSI</th>
              </tr>
            </thead>
            {/* Edit Modal */}
            {showEditModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl font-semibold mb-4">Edit Mentor</h2>
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-4">
                      <label className="block mb-2">Nama</label>
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Spesialisasi</label>
                      <input
                        type="text"
                        value={editFormData.specialist}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            specialist: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        label="Cancel"
                        variant="secondary"
                        onClick={() => setShowEditModal(false)}
                      />
                      <Button label="Save" variant="primary" type="submit" />
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl font-semibold mb-4">
                    Confirm Deletion
                  </h2>
                  <p>Are you sure you want to delete {selectedMentor.name}?</p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      label="Cancel"
                      variant="secondary"
                      onClick={() => setShowDeleteModal(false)}
                    />
                    <Button
                      label="Delete"
                      variant="danger"
                      onClick={confirmDelete}
                    />
                  </div>
                </div>
              </div>
            )}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="text-center text-red-500 py-10">
                    {error}
                  </td>
                </tr>
              ) : (
                currentData.map((mentor) => (
                  <tr key={mentor.id} className="border-t border-gray-100">
                    <td className="px-6 py-4">{mentor.id}</td>
                    <td className="px-6 py-4">{mentor.name}</td>
                    <td className="px-6 py-4">{mentor.specialist}</td>
                    <td className="px-6 py-4">
                      {mentor.path_photo ? (
                        <img
                          src={mentor.path_photo}
                          alt={mentor.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No photo</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-[#20B1A8] hover:bg-gray-100 rounded">
                          <Edit2 onClick={() => handleEdit(mentor)} size={20} />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-gray-100 rounded">
                          <Trash
                            onClick={() => handleDelete(mentor)}
                            size={20}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
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
