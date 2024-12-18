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
const Dashboard = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [visibleClasses, setVisibleClasses] = useState([]);
  const [userData, setUserData] = useState(null); // Tambahkan state untuk data pengguna
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState("");
  const [hasNoData, setHasNoData] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

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
      setIsLoading(false);
      if (response.data.length === 0) {
        setHasNoData(true);
      } else {
        setClasses(response.data);
        setVisibleClasses(response.data.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      setHasNoData(true); // Jika gagal ambil data
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
            <h1 className="mango text-center text-secondary-500 text-[40px] mb-10">
              PIXEL<span className="text-primary-500">CODE.</span>
            </h1>
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
            avatar={userProfile?.avatar} // Gunakan data avatar dari API
            username={userProfile?.username} // Gunakan username dari API
          />
          <div className="flex justify-between p-10">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex w-[950px] justify-between mr-16 items-center">
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
              {isLoading ? (
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
              )}
            </div>
            {/* <div className="flex flex-col">
              <div className="flex w-[425px] justify-between items-center">
                <h1 className="font-bold text-2xl">Sertifikat Terbaru</h1>
              </div>
              <div className="mt-4 space-y-4">
                <img src={Sertifikat} alt="Sertifikat 1" />
                <img src={Sertifikat} alt="Sertifikat 2" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
