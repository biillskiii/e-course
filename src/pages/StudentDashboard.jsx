import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Category,
  Home,
  LogoutCurve,
  Monitor,
  Ticket,
  Wallet,
} from "iconsax-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Avatar from "../assets/avatar1.png";
import Label from "../components/Label";
import TransactionDetail from "../components/TransactionDetail";

function App() {
  const [activePage, setActivePage] = useState("Daftar Transaksi");
  const [kelasStatus, setKelasStatus] = useState("Dalam Progress");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);

  const transactionData = {
    date: "17 Agustus 2024 · 13.59 WIB",
    invoiceNumber: "AB20240701",
    title: "UI/UX Fundamental",
    price: "Rp560.000",
    status: "Menunggu Pembayaran",
    img: Avatar,
    name: "Instructor Name",
    job: "Instructor Position",
    amount: "Rp560.000",
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <div className="flex">
            <div className="flex flex-col">
              <div className="w-[728px] flex justify-between mr-[72px] items-center">
                <h1 className="font-bold text-2xl">Kelas yang Kamu Ikuti</h1>
                <p className="text-sm text-primary-500 font-bold">
                  Lihat Semua
                </p>
              </div>
              <div className="grid grid-flow-col mt-4">
                <Card
                  img={Avatar}
                  title="React Development Course"
                  name="John Doe"
                  job="Senior Developer"
                  variant="default"
                  rating={3}
                  price={5000000}
                />
                <Card
                  img={Avatar}
                  title="React Development Course"
                  name="John Doe"
                  job="Senior Developer"
                  variant="progress"
                />
              </div>
            </div>
            <div className="">
              <div className="w-[403px] flex justify-between items-center">
                <h1 className="font-bold text-2xl">Sertifikat Terbaru</h1>
                <p className="text-sm text-primary-500 font-bold">
                  Lihat Semua
                </p>
              </div>
            </div>
          </div>
        );
      case "Kelas":
        return (
          <div className="flex flex-col w-full">
            <div className="w-full flex justify-between items-center">
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
                  <Card
                    img={Avatar}
                    title="React Development Course"
                    name="John Doe"
                    job="Senior Developer"
                    variant="progress"
                  />
                  <Card
                    img={Avatar}
                    title="Advanced CSS Course"
                    name="Jane Smith"
                    job="Frontend Developer"
                    variant="progress"
                  />
                  <Card
                    img={Avatar}
                    title="JavaScript Essentials"
                    name="Michael Lee"
                    job="Software Engineer"
                    variant="progress"
                  />
                </>
              ) : (
                <>
                  <Card
                    img={Avatar}
                    title="Python for Data Science"
                    name="Anna Johnson"
                    job="Data Scientist"
                    variant="certificate"
                  />
                  <Card
                    img={Avatar}
                    title="Full Stack Development"
                    name="Chris Evans"
                    job="Full Stack Developer"
                    variant="certificate"
                  />
                  <Card
                    img={Avatar}
                    title="Full Stack Development"
                    name="Chris Evans"
                    job="Full Stack Developer"
                    variant="certificate"
                  />
                </>
              )}
            </div>
          </div>
        );
      case "Tiket Webinar":
        return <h1>Tiket Webinar</h1>;
      case "Daftar Transaksi":
        return (
          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-bold">
              {isCardVisible ? "Daftar Transaksi Kamu" : "Detail Transaksi"}
            </h1>

            {isCardVisible ? (
              <div
                className="bg-primary-500 bg-opacity-5 p-6 rounded-3xl mt-8 cursor-pointer hover:bg-opacity-10 transition-all"
                onClick={() => setIsCardVisible(false)}
              >
                <div className="flex justify-between w-full items-center">
                  <div className="flex gap-2">
                    <Monitor size={24} />
                    <p>Kelas</p>
                  </div>
                  <p className="font-bold text-gray-300 text-sm">
                    {transactionData.date}
                  </p>
                </div>
                <div className="flex mt-6 w-full">
                  <div className="mr-4">
                    <Card
                      variant="header-only"
                      img={Avatar}
                      title={transactionData.title}
                      name={transactionData.name}
                      job={transactionData.job}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>
                      No. Tagihan <span className="font-bold">AB20240701</span>
                    </p>
                    <h1 className="text-xl font-bold">UI/UX Fundamental</h1>
                    <h1 className="text-2xl font-bold my-6">
                      {transactionData.amount}
                    </h1>
                    <Label
                      label={transactionData.status}
                      variant={"pending"}
                      size="w-[233px] h-[44px]"
                    />
                  </div>
                  <div className="flex items-end justify-end w-[585px]">
                    <p className="font-bold text-primary-500 hover:text-primary-700">
                      Lihat Detail
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-lg">
                <div className="flex justify-between items-center"></div>
                <TransactionDetail />
                <Button
                  onClick={() => setIsCardVisible(true)}
                  label="Kembali"
                  size="small"
                />
              </div>
            )}
          </div>
        );
      case "Pengaturan":
        return <h1>Pengaturan Akun</h1>;
      default:
        return <h1>Selamat Datang di Aplikasi</h1>;
    }
  };

  return (
    <section className="w-full flex min-h-screen">
      {/* Sidebar */}
      <div>
        <div className="w-60 min-h-screen flex flex-col items-center">
          <h1 className="mango text-center text-primary-500 text-[40px] mt-6">
            PIXEL<span className="text-secondary-500">CODE.</span>
          </h1>
          <div className="mt-10 space-y-6">
            <Button
              label="Dashboard"
              variant={
                activePage === "Dashboard"
                  ? "side-primary-active"
                  : "side-primary"
              }
              leftIcon={<Home />}
              size="very-big"
              onClick={() => setActivePage("Dashboard")}
            />
            <Button
              label="Kelas"
              variant={
                activePage === "Kelas" ? "side-primary-active" : "side-primary"
              }
              leftIcon={<Monitor />}
              size="very-big"
              onClick={() => setActivePage("Kelas")}
            />
            <Button
              label="Tiket Webinar"
              variant={
                activePage === "Tiket Webinar"
                  ? "side-primary-active"
                  : "side-primary"
              }
              leftIcon={<Ticket />}
              size="very-big"
              onClick={() => setActivePage("Tiket Webinar")}
            />
            <Button
              label="Daftar Transaksi"
              variant={
                activePage === "Daftar Transaksi"
                  ? "side-primary-active"
                  : "side-primary"
              }
              leftIcon={<Wallet />}
              size="very-big"
              onClick={() => setActivePage("Daftar Transaksi")}
            />
            <Button
              label="Pengaturan"
              variant={
                activePage === "Pengaturan"
                  ? "side-primary-active"
                  : "side-primary"
              }
              leftIcon={<Category />}
              size="very-big"
              onClick={() => setActivePage("Pengaturan")}
            />
          </div>
          <div className="mt-20">
            <Button
              label="Keluar"
              variant="side-danger"
              leftIcon={<LogoutCurve />}
              size="very-big"
              onClick={() => setActivePage("Keluar")}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <Navbar variant="welcome" />
        <div className="w-full p-10 flex flex-col">{renderContent()}</div>
      </div>
    </section>
  );
}

export default App;
