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
import { userData, userKelas, userWebinar } from "../../data";
import Card from "../../components/Card";
import Sertifikat from "../../assets/Certificate.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const handleNavigation = (path) => {
    navigate(path);
  };
  const fetchClasses = async () => {
    try {
      const response = await fetch(
        "https://be-course.serpihantech.com/api/courses"
      );
      const result = await response.json();
      setClasses(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  useEffect(() => {
    fetchClasses();
    // fetchWebinar();
  }, []);

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

          <div className="flex p-10">
            <div className="flex flex-col">
              <div className="flex w-[728px] justify-between mr-16 items-center">
                <h1 className="font-bold text-2xl">Kelas yang Kamu Ikuti</h1>
                <Button label={"Lihat Semua"} size="small" variant="submenu" />
              </div>
              <div className="grid grid-cols-2 gap-y-10 mt-4 mb-8">
                {classes.map((kelas) => (
                  <Card
                    img={kelas.path_photo}
                    title={kelas.name}
                    name={kelas.mentor.name}
                    job={kelas.mentor.specialist}
                    price={kelas.price}
                    level={kelas.level}
                  />
                ))}
              </div>
              <div className="flex w-[728px] justify-between mr-16 items-center">
                <h1 className="font-bold text-2xl">Webinar yang Kamu Ikuti</h1>
                <Button label={"Lihat Semua"} size="small" variant="submenu" />
              </div>
              <div className="grid grid-cols-2 gap-y-10 mt-4 mb-8">
                {userWebinar.map((webinar) => (
                  <Card
                    img={webinar.img}
                    title={webinar.title}
                    job={webinar.job}
                    variant={webinar.variant}
                    schedule={webinar.schedule}
                    time={webinar.time}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex w-[425px] justify-between items-center">
                <h1 className="font-bold text-2xl">Sertifikat Terbaru</h1>
                <Button label={"Lihat Semua"} size="small" variant="submenu" />
              </div>
              <div className="mt-4 space-y-4">
                <img src={Sertifikat} />
                <img src={Sertifikat} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
