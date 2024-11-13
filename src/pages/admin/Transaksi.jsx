import React, { useState } from "react";
import NavbarDashboard from "../../components/NavbarDashboard";
import Button from "../../components/Button";
import { userData, transactions } from "../../data";
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
  const [filteredData, setFilteredData] = useState(
    Array.isArray(transactions) ? transactions : []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Filter data based on search term
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredData(Array.isArray(transactions) ? transactions : []);
    } else {
      const filtered = (Array.isArray(transactions) ? transactions : []).filter(
        (transaction) =>
          transaction.namaProgram.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = Array.isArray(filteredData)
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(
    (Array.isArray(filteredData) ? filteredData.length : 0) / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            variant="side-primary"
            leftIcon={<Teacher />}
            size="very-big"
            onClick={() => handleNavigation("/admin/mentor")}
          />
          <Button
            label="Daftar Transaksi"
            active={true}
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
          <h1 className="text-2xl font-semibold">Daftar Transaksi</h1>
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
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-4">ID</th>
                <th className="pb-4">NAMA PROGRAM</th>
                <th className="pb-4">STATUS</th>
                <th className="pb-4">METODE</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((transaction, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-3 text-[#1DA599]">{transaction.id}</td>
                  <td className="py-3 text-[#1DA599]">
                    {transaction.kodeProgram}
                  </td>
                  <td className="py-3">{transaction.namaProgram}</td>
                  <td className="py-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${
                        transaction.status === "Menunggu Pembayaran"
                          ? "bg-orange-100 text-orange-500"
                          : transaction.status === "Pembayaran Berhasil"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3">{transaction.metode}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => handlePageChange(pageIndex + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === pageIndex + 1
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
