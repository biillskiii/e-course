import { Monitor, Copy } from "iconsax-react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Label from "./Label";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

// Fungsi untuk memformat timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  // Format tanggal dalam bahasa Indonesia
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format waktu
  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Gabungkan tanpa kata "pukul"
  return `${formattedDate} ${formattedTime}`;
};

const TransactionDetailCard = ({
  date,
  img,
  title,
  transaction_id,
  price,
  status,
  payment_method,
}) => {
  const navigate = useNavigate();
  const [tooltipMessage, setTooltipMessage] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTooltipMessage("Teks berhasil disalin!");
        setTimeout(() => setTooltipMessage(null), 2000);
      })
      .catch((error) => {
        console.error("Gagal menyalin teks:", error);
        setTooltipMessage("Gagal menyalin teks.");
        setTimeout(() => setTooltipMessage(null), 2000);
      });
  };

  // Fungsi untuk navigasi ke detail transaksi
  const handleNavigation = (transactionId) => {
    navigate(`/transaction/${transactionId}`);
  };

  return (
    <div className="flex justify-between p-10 space-y-8">
      {/* Transaction Info */}
      <div className="flex items-center space-x-4">
        {/* Course Image */}
        <div className="flex w-80 h-[180px]">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="h-[180px] justify-evenly flex flex-col">
          <div>
            <p className="text-sm">
              No. Tagihan <span className="font-bold">{transaction_id}</span>
            </p>
            <p className="text-gray-500 text-sm font-bold">
              {formatTimestamp(date)}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="capitalize text-2xl font-bold"> {title} </h1>
            <p className="text-[28px] font-bold">Rp. {price}</p>
          </div>
        </div>
      </div>
      <div className="border-2 flex p-6 rounded-3xl border-primary-500 border-opacity-20 gap-x-14">
        <div className="flex flex-col gap-2">
          <p>Status Pembayaran</p>
          <Label
            label={status === "pending" ? "Pending" : "Completed"}
            variant={status === "pending" ? "pending" : "success"}
          />
        </div>
        <div>
          <p>Total Tagihan</p>
          <p className="text-2xl font-bold text-primary-500">Rp. {price} </p>
        </div>
        {/* Conditional Rendering for Payment Code or QR Code */}
        <div className="flex flex-col relative">
          <p>Metode Pembayaran</p>
          <div className="flex gap-4">
            <p className="text-2xl font-bold">{payment_method}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailCard;
