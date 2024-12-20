import React, { useState, useEffect } from "react";
import {
  Category,
  Cup,
  Home,
  LogoutCurve,
  Monitor,
  Ticket,
  Wallet,
} from "iconsax-react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../../components/NavbarDashboard";
import CardUser from "../../components/CardUser";
import Sertif from "../../assets/sertif-empty.png";
import { jwtDecode } from "jwt-decode";
import Certificate from "../../components/Certificate";
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
  const [certificates, setCertificates] = useState([]);
  const [visibleCertificates, setVisibleCertificates] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [hasNoData, setHasNoData] = useState(false);
  const [hasNoCertificates, setHasNoCertificates] = useState(false);
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
          `${import.meta.env.VITE_LOCAL_API_KEY}/api/user`, // Endpoint API
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
          `${import.meta.env.VITE_LOCAL_API_KEY}/api/user`,
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
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/purchased-courses`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      const result = await response.json();
      setIsLoading(false);
      if (result.data.length === 0) {
        setHasNoData(true);
      } else {
        setClasses(result.data);
        setVisibleClasses(result.data.slice(0, 4));
        setHasNoData(false);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      setHasNoData(true);
      setIsLoading(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/userCertificate`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      const result = await response.json();
      setIsLoading(false);

      setCertificates(result);
      setHasNoCertificates(false);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setHasNoCertificates(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchClasses(), fetchCertificates()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/masuk");
  };

  return (
    <section>
      <div className="flex justify-start">
        {/* Sidebar remains the same */}
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
              active={true}
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
        <div className="w-full justify-between pl-60">
          <NavbarDashboard
            avatar={profileImage}
            username={profileData.name}
            isLoading={isLoading}
          />
          <div className="px-10">
            {isProfileIncomplete && <CompleteProfileBanner />}
          </div>
          <div className="flex justify-between overflow-x-hidden p-10">
            {/* Classes Section */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex w-[750px] justify-between mr-16 items-center">
                  <h1 className="font-bold text-2xl">Kelas yang Kamu Ikuti</h1>
                  {hasNoData ? (
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
                      onClick={() => navigate("/user/kelas")}
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
                      progress={kelas.completion_percentage}
                      onClick={() =>
                        kelas?.id && navigate(`/user/detail-user/${kelas.id}`)
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Certificates Section */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex w-[400px] justify-between mr-5 items-center">
                  <h1 className="font-bold text-2xl">Sertifikat Terbaru</h1>
                  <Button
                    label={"Lihat Semua"}
                    size="small"
                    variant="submenu"
                    onClick={() => navigate("/user/sertifikat")}
                  />
                </div>
              </div>
              {isLoading ? (
                <div className="w-full h-screen flex items-start mt-52 justify-center">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : hasNoCertificates ? (
                <div className="flex flex-col items-center mt-20 text-gray-500">
                  <img src={Sertif} width={300} alt="empty certificates" />
                </div>
              ) : (
                <div className="space-y-10 mt-4 mb-8">
                  {certificates.map((certificate) => (
                    <div className="flex flex-wrap " key={certificate.id}>
                      <Certificate
                        name={certificate.user.name}
                        code={certificate.certificate_code}
                        course={certificate.course.class_name}
                        date={certificate.created_at}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
