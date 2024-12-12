import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import NavbarDashboard from "../../components/NavbarDashboard";
import Button from "../../components/Button";
import CardDashboard from "../../components/CardDashboard";
import { popularClasses, statsCards, transactions } from "../../data";

import {
  Home,
  People,
  Monitor,
  MonitorRecorder,
  Wallet,
  Setting3,
  LogoutCurve,
  Teacher,
} from "iconsax-react";

const Dashboard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalMentor, setTotalMentor] = useState(0);
  const [totalMentee, setTotalMentee] = useState(0);
  const [topCourse, setTopCourse] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
  });
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/masuk");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role_id != 1) {
        navigate("/masuk");
        return;
      }
      setUserProfile({
        username: decodedToken.name || "",
        avatar:
          decodedToken.avatar ||
          "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
      });
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/masuk");
    }
  }, [navigate]);
  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/courses`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setTotalCourses(result.data.length); // Simpan panjang data courses
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchMentor = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/mentors`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setTotalMentor(result.data.length); // Simpan panjang data courses
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchMentee = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/purchases`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setTotalMentee(result.length); // Simpan panjang data courses
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchTopCourse = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/course-admin`,
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
      if (!Array.isArray(result.data)) {
        throw new Error("Unexpected data format from API");
      }

      setTopCourse(result.data);
    } catch (error) {
      console.error("Error fetching top courses:", error);
      setTopCourse([]); // Set to an empty array in case of error
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch data on component mount
  useEffect(() => {
    setIsLoading(true);
    fetchClasses();
    fetchMentor();
    fetchMentee();
    fetchTopCourse();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-start">
        {/* Sidebar */}
        <div className="w-60 fixed min-h-screen bg-white shadow-lg flex flex-col justify-between items-center p-5">
          <div className="space-y-6">
            <h1 className="mango text-center text-secondary-500 text-[40px] mb-10">
              PIXEL<span className="text-primary-500">CODE.</span>
            </h1>
            <Button
              label="Dashboard"
              active={true}
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
          />
        </div>

        {/* Main Content */}
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={userProfile.avatar}
            username={userProfile.username}
          />

          {/* Rest of the dashboard content remains the same */}
          <div className="p-8">
            {/* Stats Cards and other sections */}
            <div className="flex justify-between">
              <div className="flex w-7/12 flex-wrap gap-5">
                <CardDashboard id={1} type={"Kelas"} sum={totalCourses} />
                <CardDashboard id={2} type={"Webinar Aktif"} sum={"0"} />
                <CardDashboard id={3} type={"Total Mentor"} sum={totalMentor} />
                <CardDashboard id={4} type={"Total Mentee"} sum={totalMentee} />
              </div>

              {/* Popular Classes Section */}
              <div className="w-[600px] bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Kelas Populer</h2>
                <div className="space-y-4">
                  {topCourse && topCourse.length > 0 ? (
                    topCourse
                      .sort((a, b) => b.user_count - a.user_count)
                      .slice(0, 3)

                      .map((kelas, index) => (
                        <div
                          key={index + 1}
                          className="flex items-center justify-between border-primary-50 border-2 p-4 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <span className="bg-primary-50 text-primary-500 text-3xl rounded-lg w-12 h-12 flex justify-center items-center font-semibold">
                              {index + 1}
                            </span>
                            <span className="text-base font-medium">
                              {kelas.class_name}
                            </span>
                          </div>
                          <div className="text-gray-500">
                            <span className="text-3xl text-primary-500 font-bold">
                              {kelas.user_count}{" "}
                            </span>{" "}
                            <br /> mentee
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-500">No popular classes found</p>
                  )}
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Transaksi Terbaru</h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-4">ID</th>
                    <th className="pb-4">KODE PROGRAM</th>
                    <th className="pb-4">NAMA PROGRAM</th>
                    <th className="pb-4">STATUS</th>
                    <th className="pb-4">METODE</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
