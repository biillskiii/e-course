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
import Sertif from "../../assets/sertif-empty.png";
import Cookies from "js-cookie";
import Certificate from "../../components/Certificate";

const Sertifikat = () => {
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
  const token = Cookies.get("accessToken");
  useEffect(() => {
    if (!token) {
      navigate("/masuk");
      return;
    }
    const fetchProfileData = async () => {
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
              Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
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
        `${import.meta.env.VITE_SERVER_API_KEY}/api/userCertificate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    Cookies.remove("accessToken");
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
              active={true}
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
            isLoading={isLoading}
          />
          {/* Certificates Section */}
          <div className="flex flex-col w-full  p-10">
            <div className="flex justify-between items-center">
              <div className="flex w-[400px] justify-between mr-5 items-center">
                <h1 className="font-bold text-2xl">Daftar Sertifikat</h1>
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
              <div className="w-full flex flex-wrap items-center gap-10 mt-4 mb-8">
                {certificates.map((certificate) => (
                  <div
                    className="rounded-xl border border-[#E9EBED]  p-5 bg-white "
                    key={certificate.id}
                  >
                    <div className="rounded-xl">
                      <Certificate
                        name={certificate.user.name}
                        code={certificate.certificate_code}
                        course={certificate.course.class_name}
                        date={certificate.created_at}
                      />
                    </div>
                    <h1 className="text-xl capitalize font-bold mt-4">
                      {certificate.course.class_name}
                    </h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sertifikat;
