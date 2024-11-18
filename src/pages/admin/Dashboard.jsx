import React from "react";
import NavbarDashboard from "../../components/NavbarDashboard";
import Button from "../../components/Button";
import { userData, popularClasses, statsCards, transactions } from "../../data";
import { useNavigate } from "react-router-dom";
import CardDashboard from "../../components/CardDashboard";
import {
  Home,
  People,
  Monitor,
  MonitorRecorder,
  Wallet,
  Setting3,
  LogoutCurve,
  Teacher,
} from "iconsax-react";

const Dashboard = () => {
  // Data for statistics cards
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div>
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
              onClick={() => handleNavigation("/admin/dashboard")}
            />
            <Button
              label="Kelas"
              variant="side-primary"
              leftIcon={<Monitor />}
              size="very-big"
              onClick={() => handleNavigation("/admin/kelas")}
            />
            <Button
              label="Webinar"
              variant="side-primary"
              leftIcon={<MonitorRecorder />}
              size="very-big"
              onClick={() => handleNavigation("/admin/webinar")}
            />
            <Button
              label="Mentee"
              variant="side-primary"
              leftIcon={<People />}
              size="very-big"
              onClick={() => handleNavigation("/admin/mentee")}
            />
            <Button
              label="Mentor"
              variant="side-primary"
              leftIcon={<Teacher />}
              size="very-big"
              onClick={() => handleNavigation("/admin/mentor")}
            />
            <Button
              label="Daftar Transaksi"
              variant="side-primary"
              leftIcon={<Wallet />}
              size="very-big"
              onClick={() => handleNavigation("/admin/daftar-transaksi")}
            />
            <Button
              label="Pengaturan"
              variant="side-primary"
              leftIcon={<Setting3 />}
              size="very-big"
            />
          </div>
          <Button
            label="Keluar"
            variant="side-danger"
            leftIcon={<LogoutCurve />}
            size="very-big"
          />
        </div>

        {/* Main Content */}
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={userData.avatar}
            username={userData.username}
          />

          {/* Stats Cards Grid */}
          <div className="p-8 ">
            <div className="flex justify-between">
              <div className="flex w-7/12 flex-wrap gap-5">
                {statsCards.map((kelas) => (
                  <CardDashboard
                    key={kelas.id}
                    id={kelas.id}
                    type={kelas.title}
                    sum={kelas.value}
                  />
                ))}
              </div>

              {/* Popular Classes Section */}
              <div className="w-[600px] bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Kelas Populer</h2>
                <div className="space-y-4">
                  {popularClasses.map((kelas) => (
                    <div
                      key={kelas.id}
                      className="flex items-center justify-between border-primary-50 border-2 p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <span className="bg-primary-50 text-primary-500  text-3xl rounded-lg w-12 h-12 flex justify-center items-center font-semibold">
                          {kelas.id}
                        </span>
                        <span className="text-base font-medium">
                          {kelas.title}
                        </span>
                      </div>
                      <div className="text-gray-500">
                        <span className="text-3xl text-primary-500 font-bold">
                          {kelas.members}{" "}
                        </span>{" "}
                        <br /> mentee
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Transaksi Terbaru</h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-4">ID</th>
                    <th className="pb-4">KODE PROGRAM</th>
                    <th className="pb-4">NAMA PROGRAM</th>
                    <th className="pb-4">STATUS</th>
                    <th className="pb-4">METODE</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="py-3 text-[#1DA599]">{transaction.id}</td>
                      <td className="py-3 text-[#1DA599]">
                        {transaction.kodeProgram}
                      </td>
                      <td className="py-3">{transaction.namaProgram}</td>
                      <td className="py-3">
                        <span
                          className={`px-4 py-2 rounded-full text-sm ${
                            transaction.status === "Menunggu Pembayaran"
                              ? "bg-orange-100 text-orange-500"
                              : transaction.status === "Pembayaran Berhasil"
                              ? "bg-green-100 text-green-500"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3">{transaction.metode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
