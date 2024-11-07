import React, { useState } from "react";
import Label from "./Label";
import Card from "./Card";
import Avatar from "../assets/avatar1.png";
import { Copy } from "iconsax-react";

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
  codePayment: "01826767629",
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  // Optionally add a toast/notification here
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
        <div className="h-[180px] justify-evenly flex flex-col">
          <div>
            <p className="text-sm">
              No Tagihan{" "}
              <span className="font-bold">{transactionData.invoiceNumber}</span>
            </p>
            <p className="text-gray-500 text-sm font-bold">
              {transactionData.date}
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{transactionData.title}</h1>
            <p className="text-[28px] font-bold">{transactionData.amount}</p>
          </div>
        </div>
      </div>

      <div className="border-2 flex p-6 rounded-3xl border-primary-500 border-opacity-20 gap-20">
        <div className="flex flex-col gap-2">
          <p>Status Pembayaran</p>
          <Label
            label={transactionData.status}
            variant={"pending"}
            size="w-[233px] h-[44px]"
          />
        </div>
        <div>
          <p>Metode Pembayarn</p>
          <img src="src/assets/mandiri.png" className="w-[90px]"></img>
        </div>
        <div>
          <p>Total Tagihan</p>
          <p className="text-2xl font-bold text-primary-500">
            {transactionData.amount}
          </p>
        </div>
        <div className="flex flex-col">
          <p>Kode Pembayaran</p>
          <div className="flex gap-4">
            <p className="text-2xl font-bold">{transactionData.codePayment}</p>
            <button onClick={() => copyToClipboard(codePayment)}>
              <Copy size={24} />
            </button>
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
