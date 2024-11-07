import React, { useState } from "react";
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

const Kelas = () => {
  const navigate = useNavigate();
  const [kelasStatus, setKelasStatus] = useState("Dalam Progress");

  const handleNavigation = (path) => {
    navigate(path);
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
              <div className="grid grid-flow-col mt-4">
                {kelasStatus === "Dalam Progress" ? (
                  <>
                    {userKelas.map((kelas) => (
                      <Card
                        img={kelas.img}
                        title={kelas.title}
                        name={kelas.name}
                        job={kelas.job}
                        variant={kelas.variant}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kelas;
