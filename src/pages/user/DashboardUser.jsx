import React, { useState, useEffect } from "react";
import {
  Category,
  Home,
  LogoutCurve,
  Monitor,
  Ticket,
  Wallet,
} from "iconsax-react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../../components/NavbarDashboard";
import { userKelas, userWebinar } from "../../data";
import CardUser from "../../components/CardUser";
import Sertifikat from "../../assets/Certificate.png";
import { jwtDecode } from "jwt-decode";
import Sertif from "../../assets/sertif-empty.png";
import EmptyClass from "../../assets/empt-class.png";
import BgUser from "../../assets/BgUser.png";

const CompleteProfileBanner = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${BgUser})`,
        backgroundSize: "500px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
      className="bg-[#FFF4DA] z-5 mt-5 rounded-lg p-10 flex items-start justify-between relative"
    >
      <div className="space-y-5">
        <h2 className="text-4xl font-bold text-green-900 mb-2">
          Lengkapi Profilmu
        </h2>
        <p className="text-green-900 text-base">
          Kamu belum melengkapi profilmu loh. Ayo, segera lengkapi profilmu!
        </p>
        <div>
          <Button
            label={"Edit Profil"}
            size="small"
            onClick={() => handleNavigation("/user/pengaturan")}
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 opacity-20">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="100" fill="#F2E9C8" />
          <circle cx="100" cy="100" r="70" fill="#D1E2D1" />
        </svg>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [visibleClasses, setVisibleClasses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [hasNoData, setHasNoData] = useState(false);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/masuk");
      return;
    }
    const fetchProfileData = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/user`, // Endpoint API
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
    // Fetch user data to check if the profile is complete
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await response.json();
        setUserData(data.user);

        // Check if any required fields are null or empty
        const requiredFields = [
          "phone_number",
          "place_of_birth",
          "date_of_birth",
          "address",
          "last_education",
          "work",
        ];

        const incomplete = requiredFields.some(
          (field) => data.user[field] === null || data.user[field] === ""
        );

        setIsProfileIncomplete(incomplete);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsProfileIncomplete(true);
      }
    };

    fetchUserData();
    fetchProfileData();
  }, [navigate]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/purchased-courses`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      const result = await response.json();
      console.log(result.data);
      setIsLoading(false);
      if (result.data.length === 0) {
        setHasNoData(true);
      } else {
        setClasses(result.data);
        setVisibleClasses(result.data.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      setHasNoData(true); // If data fetching fails
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchClasses();
  }, []);

  const handleCourses = () => {
    navigate("/user/kelas");
  };
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/masuk");
  };

  return (
    <section>
      <div className="flex justify-start">
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
              active={true}
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
              onClick={handleLogout}
            />
          </div>
        </div>
        {/* Main Content */}
        <div className="w-full justify-between pl-60">
          <NavbarDashboard
            avatar={profileImage}
            username={profileData.name}
            isLoading={true}
          />
          <div className="px-10">
            {isProfileIncomplete && <CompleteProfileBanner />}
          </div>
          <div className="flex justify-between overflow-x-hidden p-10">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex w-[750px] justify-between mr-16 items-center">
                  <h1 className="font-bold text-2xl">Kelas yang Kamu Ikuti</h1>
                  {visibleClasses.length === 0 ? (
                    <Button
                      label={"Beli Kelas"}
                      size="small"
                      variant="primary"
                      onClick={() => navigate("/kelas")}
                    />
                  ) : (
                    <Button
                      label={"Lihat Semua"}
                      size="small"
                      variant="submenu"
                      onClick={handleCourses}
                    />
                  )}
                </div>
              </div>
              {isLoading ? (
                <div className="w-full h-screen flex items-start mt-52 justify-center">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : hasNoData ? (
                <div className="flex flex-col items-center mt-20 text-gray-500">
                  <img src={EmptyClass} width={200} alt="empty class" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-y-10 mt-4 mb-8">
                  {visibleClasses.map((kelas) => (
                    <CardUser
                      key={kelas.id}
                      img={kelas.path_photo}
                      mentorImg={kelas.mentor.path_photo}
                      title={kelas.class_name}
                      name={kelas.mentor.name}
                      job={kelas.mentor.specialist}
                      price={kelas.price}
                      level={kelas.level}
                      onClick={() =>
                        kelas?.id && navigate(`/user/detail-user/${kelas.id}`)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex w-[400px] justify-between mr-5 items-center">
                  <h1 className=" font-bold text-2xl">Sertifikat Terbaru</h1>
                  {visibleClasses.length === 0 ? (
                    <Button
                      label={"Lihat Semua"}
                      size="small"
                      variant="submenu"
                    />
                  ) : (
                    <Button
                      label={"Lihat Semua"}
                      size="small"
                      variant="submenu"
                    />
                  )}
                </div>
              </div>
              {/* {isLoading ? (
                <div className="w-full h-screen flex items-start mt-52 justify-center">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : hasNoData ? (
                <div className="flex flex-col items-center mt-20 text-gray-500">
                  <img src={Sertif} width={300} alt="empty class" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-y-10 mt-4 mb-8">
                  {visibleClasses.map((kelas) => (
                    <CardUser
                      key={kelas.id}
                      img={kelas.path_photo}
                      mentorImg={kelas.mentor.path_photo}
                      title={kelas.class_name}
                      name={kelas.mentor.name}
                      job={kelas.mentor.specialist}
                      price={kelas.price}
                      level={kelas.level}
                      onClick={() =>
                        kelas?.id && navigate(`/user/detail-user/${kelas.id}`)
                      }
                    />
                  ))}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
