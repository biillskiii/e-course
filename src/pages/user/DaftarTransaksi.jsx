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
  Cup,
} from "iconsax-react";
import NavbarDashboard from "../../components/NavbarDashboard";
import TransactionCard from "../../components/TransactionCard";
import NotTransaction from "../../assets/pana.png";
const DaftarTransaksi = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [visibleClasses, setVisibleClasses] = useState([]);
  const [userData, setUserData] = useState(null); // Tambahkan state untuk data pengguna
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleNavigation = (path) => {
    navigate(path);
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/usertransactions`,
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
  const fetchProfileData = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/user`, // Endpoint API
        {
          headers: {
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
  useEffect(() => {
    setIsLoading(true);
    fetchProfileData();
    fetchClasses();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/masuk");
      return;
    }
  }, [navigate]);

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
            <a href="/">
              <h1 className="mango  text-center text-secondary-500 text-[40px] mb-10">
                PIXEL<span className="text-primary-500">CODE.</span>
              </h1>
            </a>
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
            />{" "}
            <Button
              label="Sertifikat"
              variant="side-primary"
              leftIcon={<Cup />}
              size="very-big"
              onClick={() => handleNavigation("/user/sertifikat")}
            />
          </div>
          <div className="mt-20">
            <Button
              label="Keluar"
              variant="side-danger"
              leftIcon={<LogoutCurve />}
              size="very-big"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={profileImage}
            username={profileData.name}
            isLoading={true}
          />

          <div className="w-full flex flex-col p-10">
            <div className="flex flex-col gap-8">
              <h1 className="font-bold text-3xl">Daftar Transaksi</h1>
              {isLoading ? (
                <div className="w-full h-screen flex items-start mt-52 justify-center">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : transaction.length === 0 ? (
                <div className="flex flex-col mt-32 justify-center items-center">
                  <img src={NotTransaction} alt="money" width={350} />
                  <p className="text-gray-500 mt-5">Belum ada transaksi</p>
                </div>
              ) : (
                transaction.map((user) => (
                  <TransactionCard
                    img={user.course.path_photo}
                    title={user.course.class_name}
                    price={user.course.price}
                    status={user.status}
                    date={user.course.updated_at}
                    transaction_id={user.transaction_id}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaftarTransaksi;
