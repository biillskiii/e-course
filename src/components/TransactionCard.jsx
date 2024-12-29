import { Monitor } from "iconsax-react";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Label from "./Label";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

const TransactionCard = ({
  date,
  img,
  title,
  transaction_id,
  price,
  status,
  course,
}) => {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke detail transaksi
  const handleNavigation = (transactionId) => {
    navigate(`/transaction/${transactionId}`);
  };

  return (
    <div className="flex flex-col p-6 rounded-3xl bg-primary-500 bg-opacity-5 gap-6 mt">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Monitor size={24} /> <p>Kelas</p>
        </div>
        <p className="font-bold text-sm text-gray-500">
          {formatTimestamp(date)}
        </p>
      </div>
      <div className="flex">
        {/* Course Image */}
        <div className="flex w-80 h-[180px]">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
        {/* Course Info */}
        <div className="flex flex-col px-4 justify-between">
          <div className="text-sm font-medium">
            No. Tagihan {""}
            <span className="text-sm font-bold">{transaction_id}</span>
            <h1 className="capitalize text-xl font-bold">{title}</h1>
          </div>
          <h1 className="text-2xl font-bold"> Rp. {price}</h1>
          <div className="w-[240px]">
            <Label
              label={status === "pending" ? "Pending" : "Completed"}
              variant={status === "pending" ? "pending" : "success"}
            />
          </div>
        </div>
        {/* Details Button */}
        <div className="ml-auto mt-auto">
          <Button
            label={"Lihat Detail"}
            size="small"
            variant="submenu"
            onClick={() => handleNavigation(transaction_id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
