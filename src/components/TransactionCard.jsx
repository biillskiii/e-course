import { Monitor } from "iconsax-react";
import React from "react";
import Label from "./Label";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const TransactionCard = ({ course }) => {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke halaman detail
  const handleNavigation = (billNumber) => {
    navigate(`/detail/${billNumber}`);
  };

  return (
    <div className="flex flex-col p-6 rounded-3xl bg-primary-500 bg-opacity-5 gap-6 mt">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Monitor size={24} />
          <p>Kelas</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-sm text-gray-500">{course.date}</p>
          <p className="font-bold text-sm text-gray-500">·</p>
          <p className="font-bold text-sm text-gray-500">{course.time}</p>
        </div>
      </div>
      <div className="flex ">
        {/* Course Image */}
        <div className="flex w-80 h-[180px]">
          <img
            src={course.img}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Course Info */}
        <div className="flex flex-col px-4 justify-between">
          <div className="text-sm font-medium">
            No. Tagihan{" "}
            <span className="text-sm font-bold">{course.billNumber}</span>
            <h1 className="text-xl font-bold">{course.title}</h1>
          </div>
          <h1 className="text-2xl font-bold">{course.price}</h1>
          <div className="w-[240px]">
            <Label
              label={course.status}
              variant={
                course.status === "Menunggu Pembayaran" ? "pending" : "success"
              }
            />
          </div>
        </div>

        {/* Details Link */}
        <div className=" ml-auto mt-auto">
          <Button
            label={"Lihat Detail"}
            size="small"
            variant="submenu"
            onClick={() => handleNavigation(course.billNumber)}
          />
        </div>
      </div>
    </div>
  );
};

// Sample data to render the component

export default TransactionCard;
