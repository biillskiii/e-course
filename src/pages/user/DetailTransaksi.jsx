import React from "react";
import { useParams } from "react-router-dom";
import { courseData, userData } from "../../data";
import Label from "../../components/Label";
import {
  Copy,
  Home,
  Monitor,
  Ticket,
  Wallet,
  Category,
  LogoutCurve,
} from "iconsax-react";
import Button from "../../components/Button";
import NavbarDashboard from "../../components/NavbarDashboard";
import Mandiri from "../../assets/mandiri.png";
import Qris from "../../assets/qris.png";
import QrisQRCode from "../../assets/QRCode.png";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  // Optionally add a toast/notification here
};

const DetailTransaksi = () => {
  const { billNumber } = useParams();
  const course = courseData.find((item) => item.billNumber === billNumber);

  if (!course) {
    return <p>Data tidak ditemukan.</p>;
  }

  const isPending = course.status === "Menunggu Pembayaran";
  const isSuccessful = course.status === "Pembayaran Berhasil";

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
              active={true}
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
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={userData.avatar}
            username={userData.username}
          />

          <div className="p-10 space-y-8">
            {/* Transaction Info */}
            <div className="flex items-center space-x-4">
              {/* Course Image */}
              <div className="flex w-80 h-[180px]">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[180px] justify-evenly flex flex-col">
                <div>
                  <p className="text-sm">
                    No Tagihan{" "}
                    <span className="font-bold">{course.billNumber}</span>
                  </p>
                  <p className="text-gray-500 text-sm font-bold">
                    {course.date}
                  </p>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{course.title}</h1>
                  <p className="text-[28px] font-bold">{course.price}</p>
                </div>
              </div>
            </div>

            <div className="border-2 flex p-6 rounded-3xl border-primary-500 border-opacity-20 gap-x-32">
              <div className="flex flex-col gap-2">
                <p>Status Pembayaran</p>
                <Label
                  label={course.status}
                  variant={"pending"}
                  size="w-[233px] h-[44px]"
                />
              </div>
              {/* Payment Method Conditional Rendering */}
              <div>
                <p>Metode Pembayaran</p>
                {course.paymentMethod === "bank" ? (
                  <img src={Mandiri} alt="Mandiri" className="w-[90px]" />
                ) : (
                  <img src={Qris} alt="QRIS" className="w-[90px]" />
                )}
              </div>
              <div>
                <p>Total Tagihan</p>
                <p className="text-2xl font-bold text-primary-500">
                  {course.price}
                </p>
              </div>
              {/* Conditional Rendering for Payment Code or QR Code */}
              <div className="flex flex-col">
                <p>Kode Pembayaran</p>
                {course.paymentMethod === "bank" ? (
                  <div className="flex gap-4">
                    <p className="text-2xl font-bold">{course.codePayment}</p>
                    <button onClick={() => copyToClipboard(course.codePayment)}>
                      <Copy size={24} />
                    </button>
                  </div>
                ) : (
                  <img
                    src={QrisQRCode}
                    alt="QR Code for QRIS"
                    className="w-[249px] h-[249px]"
                  />
                )}
              </div>
            </div>

            {/* Payment Instructions */}
            {course.paymentMethod === "bank" ? (
              <div className="border-2 border-primary-500 border-opacity-20 p-4 rounded-3xl space-y-6">
                <h3 className="text-lg font-bold mb-2">
                  Cara Pembayaran Bank Transfer
                </h3>
                {/* Bank transfer instructions */}
                <div>
                  <h4 className="font-semibold mb-6">ATM Mandiri</h4>
                  <ol className="text-sm list-decimal list-inside space-y-6">
                    <li>Masukkan kartu ATM dan PIN ATM</li>
                    <li>Pilih menu Bayar/Beli</li>
                    <li>Pilih opsi Lainnya {">"} Multipayment</li>
                    <li>Masukkan kode biller perusahaan</li>
                    <li>Masukkan nomor Virtual Account {">"} Benar</li>
                    <li>
                      Masukkan angka yang diminta untuk memilih tagihan {">"} Ya
                    </li>
                  </ol>
                </div>
                <hr className="border border-primary-500 border-opacity-20" />
                <div>
                  <h4 className="font-semibold mb-6">M-Banking</h4>
                  <ol className="text-sm list-decimal list-inside space-y-6">
                    <li>Masuk aplikasi Livin by Mandiri</li>
                    <li>Klik Menu Bayar/VA pada beranda</li>
                    <li>
                      Masukkan merchant atau masukkan VA di kolom pencarian
                    </li>
                    <li>Pilih sumber dana</li>
                    <li>Klik Lanjutkan</li>
                    <li>Masukkan PIN Livin</li>
                    <li>Bayar tagihan berhasil</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="border-2 border-primary-500 border-opacity-20 p-4 rounded-3xl space-y-6">
                <h3 className="text-lg font-bold mb-2">
                  Cara Pembayaran QRIS/E-Wallet
                </h3>
                {/* QRIS/e-wallet instructions */}
                <div>
                  <ol className="text-sm list-decimal list-inside space-y-6">
                    <li>Buka aplikasi e-wallet atau m-banking</li>
                    <li>Pindai kode QR yang tertera</li>
                    <li>Konfirmasi pembayaran pada aplikasi</li>
                    <li>Pembayaran selesai</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailTransaksi;
