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
import CardUser from "../../components/CardUser";
import EmptyClass from "../../assets/empt-class.png";
const Kelas = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [kelasStatus, setKelasStatus] = useState("Dalam Progress");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const handleNavigation = (path) => {
    navigate(path);
  };
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/masuk");
      return;
    }
  }, [navigate]);
  const fetchProfileData = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/user/`, // Endpoint API
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
  const fetchClasses = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/purchased-courses`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setIsLoading(false);
      const result = await response.json();
      setClasses(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchClasses();
    fetchProfileData();
  }, []);
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
              active={true}
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
              onClick={handleLogout}
            />
          </div>
          <div className="mt-20">
            <Button
              label="Keluar"
              variant="side-danger"
              leftIcon={<LogoutCurve />}
              size="very-big"
              onClick={() => handleNavigation("/masuk")}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={profileImage}
            username={profileData.name}
            isLoading={true}
          />

          <div className="w-full flex flex-col p-10">
            <div className="">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h1 className="text-2xl font-bold">Kelas yang Kamu Ikuti</h1>
                </div>
                <div className="w-[342px] flex justify-end">
                  {classes.length === 0 ? (
                    <Button
                      label="Beli Kelas"
                      variant={"primary"}
                      size="big"
                      onClick={() => handleNavigation("/kelas")}
                    />
                  ) : (
                    <div className="flex items-center w-full">
                      <Button
                        label="Dalam Progress"
                        variant={
                          kelasStatus === "Dalam Progress"
                            ? "submenu-active"
                            : "submenu"
                        }
                        onClick={() => setKelasStatus("Dalam Progress")}
                      />
                      <Button
                        label="Selesai"
                        variant={
                          kelasStatus === "Selesai"
                            ? "submenu-active"
                            : "submenu"
                        }
                        onClick={() => setKelasStatus("Selesai")}
                      />
                    </div>
                  )}
                </div>
              </div>

              {isLoading ? (
                <div className="w-full h-screen flex items-start mt-32 justify-center">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : classes.length === 0 ? (
                <div className="flex flex-col min-h-screen  items-center mt-32 text-gray-500">
                  <img src={EmptyClass} width={250} alt="empty class" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {kelasStatus === "Dalam Progress" ? (
                    <>
                      {classes
                        .filter((kelas) => kelas.completion_percentage < 100)
                        .map((kelas) => (
                          <CardUser
                            img={kelas.path_photo}
                            mentorImg={kelas.mentor.path_photo}
                            title={kelas.class_name}
                            name={kelas.mentor.name}
                            job={kelas.mentor.specialist}
                            price={kelas.price}
                            level={kelas.level}
                            progress={kelas.completion_percentage}
                            onClick={() =>
                              kelas?.id &&
                              navigate(`/user/detail-user/${kelas.id}`)
                            }
                          />
                        ))}
                    </>
                  ) : (
                    <>
                      {classes
                        .filter((kelas) => kelas.completion_percentage === 100)
                        .map((kelas) => (
                          <CardUser
                            img={kelas.path_photo}
                            mentorImg={kelas.mentor.path_photo}
                            title={kelas.class_name}
                            name={kelas.mentor.name}
                            job={kelas.mentor.specialist}
                            price={kelas.price}
                            level={kelas.level}
                            progress={kelas.completion_percentage}
                          />
                        ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kelas;
