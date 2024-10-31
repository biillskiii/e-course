import React, { useState } from "react";
import Label from "./Label";
import Card from "./Card";
import Avatar from "../assets/avatar1.png";
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

const TransactionDetail = () => {
  return (
    <div className="rounded-lg">
      {/* Transaction Info */}
      <div className="flex items-center space-x-4 mb-6">
        <Card
          variant="header-only"
          img={Avatar}
          title={transactionData.title}
          name={transactionData.name}
          job={transactionData.job}
        />
        <div>
          <h3 className="text-lg font-semibold">UI/UX Fundamental</h3>
          <p className="text-gray-600 text-sm">No. Tagihan AB20240701</p>
          <p className="text-gray-600 text-sm">17 Agustus 2024 - 13:59 WIB</p>
        </div>
      </div>

      {/* Amount Info */}
      <div className="mb-4">
        <p className="text-lg font-semibold">Rp560.000</p>
      </div>

      {/* Status and Payment Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">Status Pembayaran</span>
          <span className="text-yellow-500 font-semibold">
            Menunggu Pembayaran
          </span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">Metode Pembayaran</span>
          <span className="flex items-center">
            <img
              src="/path/to/mandiri-logo.png"
              alt="Mandiri"
              className="w-6 h-6 mr-2"
            />
            Mandiri
          </span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">Total Tagihan</span>
          <span className="text-teal-500 font-semibold">Rp616.000</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">Kode Pembayaran</span>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">01826767629</span>
            <button className="text-blue-500 text-sm">Copy</button>
          </div>
        </div>
      </div>

      {/* Payment Instructions */}
      <h3 className="text-lg font-bold mb-2">Cara Pembayaran</h3>
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div>
          <h4 className="font-semibold">ATM Mandiri</h4>
          <ol className="text-sm list-decimal list-inside space-y-1 text-gray-700">
            <li>Masukkan kartu ATM dan PIN ATM</li>
            <li>Pilih menu Bayar/Beli</li>
            <li>Pilih opsi Lainnya ? Multipayment</li>
            <li>Masukkan kode biller perusahaan</li>
            <li>Masukkan nomor Virtual Account ? Benar</li>
            <li>Masukkan angka yang diminta untuk memilih tagihan ? Ya</li>
          </ol>
        </div>
        <div>
          <h4 className="font-semibold">M-Banking</h4>
          <ol className="text-sm list-decimal list-inside space-y-1 text-gray-700">
            <li>Masuk aplikasi Livin by Mandiri</li>
            <li>Klik Menu Bayar/VA pada beranda</li>
            <li>Masukkan merchant atau masukkan VA di kolom pencarian</li>
            <li>Pilih sumber dana</li>
            <li>Klik Lanjutkan</li>
            <li>Masukkan PIN Livin</li>
            <li>Bayar tagihan berhasil</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
