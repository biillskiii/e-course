import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import {
  Category,
  Home,
  LogoutCurve,
  Monitor,
  Ticket,
  Wallet,
} from "iconsax-react";
import NavbarDashboard from "../../components/NavbarDashboard";
import {
  userData,
  userKelas,
  sertifKelas,
  userWebinar,
  courseData,
} from "../../data";
import Card from "../../components/Card";
import TransactionCard from "../../components/TransactionCard";
import { jwtDecode } from "jwt-decode";

const DaftarTransaksi = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [visibleClasses, setVisibleClasses] = useState([]);
  const [userData, setUserData] = useState(null); // Tambahkan state untuk data pengguna
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState("");

  const handleNavigation = (path) => {
    navigate(path);
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/usertransactions`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setIsLoading(false);
      const result = await response.json();
      setTransaction(result);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchClasses();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/masuk");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
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

  const handleCourses = () => {
    navigate("/user/kelas");
  };
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/masuk");
  };

  return (
    <section>
      <div>
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
              onClick={() => handleNavigation("/user/dashboard")}
            />
            <Button
              label="Kelas"
              variant="side-primary"
              leftIcon={<Monitor />}
              size="very-big"
              onClick={() => handleNavigation("/user/kelas")}
            />
            <Button
              label="Webinar"
              variant="disable"
              leftIcon={<Ticket />}
              size="very-big"
              onClick={() => handleNavigation("/user/webinar")}
            />
            <Button
              label="Daftar Transaksi"
              active={true}
              variant="side-primary"
              leftIcon={<Wallet />}
              size="very-big"
              onClick={() => handleNavigation("/user/daftar-transaksi")}
            />
            <Button
              label="Pengaturan"
              variant="side-primary"
              leftIcon={<Category />}
              size="very-big"
              onClick={() => handleNavigation("/user/pengaturan")}
            />
          </div>
          <div className="mt-20">
            <Button
              label="Keluar"
              variant="side-danger"
              leftIcon={<LogoutCurve />}
              size="very-big"
              onClick={() => handleLogout("/masuk")}
            />
          </div>
        </div>
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={userProfile?.avatar}
            username={userProfile?.username}
          />

          <div className="w-full flex flex-col p-10">
            <div className="flex flex-col gap-8">
              <h1 className="font-bold text-3xl">Daftar Transaksi</h1>
              {transaction.map((user) => (
                <TransactionCard
                  img={user.course.path_photo}
                  title={user.course.class_name}
                  price={user.course.price}
                  status={user.course.status}
                  date={user.course.updated_at}
                  transaction_id={user.transaction_id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaftarTransaksi;
