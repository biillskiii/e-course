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
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
  });

  const LoadingCard = () => (
    <div className="animate-pulse bg-primary-500/20  w-[300px] h-[180.5px] rounded-[24px] p-6 shadow-sm">
      <div className="h-4 bg-primary-500/20  rounded w-1/4 mb-4"></div>
      <div className="h-8 bg-primary-500/20  rounded w-1/2"></div>
      <div className="h-8 bg-primary-500/20  rounded w-1/2"></div>
    </div>
  );

  const LoadingTable = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-primary-500/20 rounded w-1/4 mb-4"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-primary-500/20 rounded"></div>
        ))}
      </div>
    </div>
  );

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
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/courses`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setTotalCourses(result.data.length);
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
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/mentors`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setTotalMentor(result.data.length);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMentee = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/purchases`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setTotalMentee(result.length);
    } catch (error) {
      console.error("Error fetching mentees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopCourse = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/course-admin`,
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

      if (!Array.isArray(result.data)) {
        throw new Error("Unexpected data format from API");
      }

      setTopCourse(result.data);
    } catch (error) {
      console.error("Error fetching top courses:", error);
      setTopCourse([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/transactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      const sortedTransactions = result
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
      setTransaction(sortedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchClasses();
    fetchMentor();
    fetchMentee();
    fetchTopCourse();
    fetchTransactions();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/masuk");
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
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={userProfile.avatar}
            username={userProfile.username}
          />

          <div className="p-8">
            {/* Stats Cards Section */}
            <div className="flex justify-between">
              <div className="flex w-7/12 flex-wrap gap-5">
                {isLoading ? (
                  <>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                  </>
                ) : (
                  <>
                    <CardDashboard id={1} type={"Kelas"} sum={totalCourses} />
                    <CardDashboard id={2} type={"Webinar Aktif"} sum={"0"} />
                    <CardDashboard
                      id={3}
                      type={"Total Mentor"}
                      sum={totalMentor}
                    />
                    <CardDashboard
                      id={4}
                      type={"Total Mentee"}
                      sum={totalMentee}
                    />
                  </>
                )}
              </div>

              {/* Popular Classes Section */}
              <div className="w-[600px] bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Kelas Populer</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-20 bg-primary-500/20  rounded-lg mb-4"
                        ></div>
                      ))}
                    </div>
                  </div>
                ) : (
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
                              <span className="capitalize text-base font-medium">
                                {kelas.class_name}
                              </span>
                            </div>
                            <div className="text-gray-500">
                              <span className="text-3xl text-primary-500 font-bold">
                                {kelas.user_count}{" "}
                              </span>{" "}
                              <br /> Mentee
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-500">No popular classes found</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Transactions Table */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Transaksi Terbaru</h2>
              {isLoading ? (
                <LoadingTable />
              ) : (
                <div className="bg-white rounded-lg shadow ">
                  <table className="w-full rounded-lg">
                    <thead className="bg-primary-50/75">
                      <tr className="text-center">
                        <th className="px-6 py-4 text-[#20B1A8]">ID</th>
                        <th className="px-6 py-4 text-[#20B1A8]">NAMA</th>
                        <th className="px-6 py-4 text-[#20B1A8]">
                          NAMA PROGRAM
                        </th>
                        <th className="px-6 py-4 text-[#20B1A8]">STATUS</th>
                        <th className="px-6 py-4 text-[#20B1A8]">METODE</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {transaction.map((transaction, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="py-3 text-[#1DA599]">
                            {transaction.transaction_id}
                          </td>
                          <td className="py-3 text-[#1DA599]">
                            {transaction.user.name}
                          </td>
                          <td className="capitalize py-3">
                            {transaction.course.class_name}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-4 py-2  rounded-full text-sm uppercase font-semibold ${
                                transaction.status === "pending"
                                  ? "bg-orange-100 text-orange-500"
                                  : transaction.status === "completed"
                                  ? "bg-green-100 text-green-500"
                                  : "bg-red-100 text-red-500"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="uppercase  py-3">
                            {transaction.payment_method === "echannel"
                              ? "VA"
                              : transaction.payment_method === null
                              ? "-"
                              : transaction.payment_method}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
