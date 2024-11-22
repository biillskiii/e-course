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
import { userData, userKelas, sertifKelas } from "../../data";
import Card from "../../components/Card";
import { NotificationCircle } from "iconsax-react";
const Kelas = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [kelasStatus, setKelasStatus] = useState("Dalam Progress");
  const [isLoading, setIsLoading] = useState(true);
  const handleNavigation = (path) => {
    navigate(path);
  };
  const fetchClasses = async () => {
    try {
      const response = await fetch(
        "https://be-course.serpihantech.com/api/courses"
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
    // fetchWebinar();
  }, []);

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
              active={true}
              variant="side-primary"
              leftIcon={<Monitor />}
              size="very-big"
              onClick={() => handleNavigation("/user/kelas")}
            />
            <Button
              label="Webinar"
              variant="side-primary"
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
              onClick={() => handleNavigation("/masuk")}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={userData.avatar}
            username={userData.username}
          />

          <div className="w-full flex flex-col p-10">
            <div className="">
              <div className="flex items-center justify-between w-full">
                <div>
                  <h1 className="text-2xl font-bold">Kelas yang Kamu Ikuti</h1>
                </div>
                <div className="w-[342px] flex justify-between">
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
                      kelasStatus === "Selesai" ? "submenu-active" : "submenu"
                    }
                    onClick={() => setKelasStatus("Selesai")}
                  />
                </div>
              </div>
              {isLoading ? (
                <div className="w-full h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {kelasStatus === "Dalam Progress" ? (
                    <>
                      {classes.map((kelas) => (
                        <Card
                          img={kelas.path_photo}
                          mentorImg={kelas.mentor.path_photo}
                          title={kelas.name}
                          name={kelas.mentor.name}
                          job={kelas.mentor.specialist}
                          price={kelas.price}
                          level={kelas.level}
                          onClick={() =>
                            kelas?.id && navigate(`/user/detail/${kelas.id}`)
                          }
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {sertifKelas.map((kelas) => (
                        <Card
                          img={kelas.img}
                          title={kelas.title}
                          name={kelas.name}
                          job={kelas.job}
                          variant={kelas.variant}
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
