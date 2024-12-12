import React, { useEffect } from "react";
import { Level, DiscountCircle, Calendar, Clock } from "iconsax-react";
import { Icon } from "@iconify/react";
import ProgressBar from "./ProgressBar";

// Fetch token and initiate Snap payment
const fetchOrder = async (order_code, user_id, course_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API_KEY}/api/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_code: "AAA12",
          user_id: 1,
          course_id: 1,
        }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text(); // Dapatkan detail error jika ada
      throw new Error(
        `HTTP error! Status: ${response.status}. Details: ${errorDetails}`
      );
    }

    const data = await response.json();
    console.log("Order fetched successfully:", data);
    console.log("Token received:", data.data.snapToken);

    // Trigger Midtrans Snap payment
    if (window.snap) {
      window.snap.pay(data.data.snapToken);
    } else {
      console.error("Midtrans Snap is not loaded.");
    }
  } catch (error) {
    console.error("Error fetching order:", error);
  } finally {
    console.log("Fetch attempt completed.");
  }
};

// Dynamically load Midtrans Snap script
const useMidtransScript = () => {
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.VITE_API_KEY; // Gunakan environment variable

    // Cek apakah skrip sudah dimuat
    if (!document.querySelector(`script[src="${snapScript}"]`)) {
      const script = document.createElement("script");
      script.src = snapScript;
      script.setAttribute("data-client-key", clientKey);
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);
};

// Utility to calculate font size
const calculateFontSize = (text) => {
  if (!text) return "16px";
  if (text.length <= 30) return "24px";
  else if (text.length <= 50) return "20px";
  return "16px";
};

// Price display component
const PriceDisplay = ({ price, hasDiscount }) => {
  if (price === null) {
    return (
      <div className="bg-primary-100 flex justify-center items-center rounded-lg w-20 h-6">
        <p className="text-primary-500 font-bold text-base">GRATIS</p>
      </div>
    );
  }

  if (hasDiscount) {
    const discountPrice = price * (1 - hasDiscount / 100);
    return (
      <div className="flex items-center gap-x-2">
        <span className="w-16 h-6 rounded-lg text-sm bg-primary-100 text-primary-500 flex justify-center items-center gap-x-1">
          <DiscountCircle size="16" color="#00a589" />
          {hasDiscount}%
        </span>
        <span className="line-through font-bold text-sm">
          Rp. {price?.toLocaleString() || "Rp.0"}
        </span>
        <span className="text-primary-500 font-bold text-xl">
          Rp. {discountPrice.toLocaleString()}
        </span>
      </div>
    );
  }

  return (
    <span className="text-primary-500 font-bold text-xl">
      Rp. {price?.toLocaleString() || "Rp.0"}
    </span>
  );
};

// Main Card component
const Card = ({
  img,
  mentorImg,
  courseCode,
  title,
  description,
  name,
  job,
  level,
  rating,
  ratingNum,
  price,
  premium,
  hasDiscount,
  variant = "default",
  schedule,
  label,
  progress,
  onClick,
}) => {
  useMidtransScript(); // Load Midtrans script

  const variantContent = {
    default: (
      <>
        <div className="flex items-center gap-x-5 mt-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Icon
                icon="material-symbols:star"
                key={index}
                width={24}
                color={index < rating ? "#F1C644" : "#e4e5e9"}
              />
            ))}
            <p className="ml-2">{ratingNum}</p>
          </div>
          <p className="flex font-bold capitalize items-center gap-x-2">
            <Level size={24} color="#0A181F" />
            {level}
          </p>
        </div>
        <div className="flex-grow flex items-end mt-4">
          <div className="w-full">
            <p className="text-xl font-bold text-primary-500 mb-4">
              <PriceDisplay price={price} hasDiscount={hasDiscount} />
            </p>
            <ProgressBar progress={progress} variant="below" color="bg-primary-500" />
          </div>
        </div>
      </>
    ),
  };

  return (
    <div
      onClick={onClick}
      className="w-[382px] cursor-pointer h-full flex flex-col rounded-3xl border border-gray-200/50 p-4"
    >
      <div className="w-full flex justify-between h-[180px] rounded-xl">
        <img src={img} alt={title} className="bg-cover flex justify-center" />
      </div>
      <div className="flex flex-col flex-grow mt-5">
        <h1
          style={{ fontSize: calculateFontSize(title) }}
          className="capitalize font-bold text-xl line-clamp-2 h-[60px]"
        >
          {title}
        </h1>
        <div className="flex gap-x-5">
          <div className="flex gap-x-2 items-center">
            <div className="rounded-full w-12 h-12 bg-primary-500 overflow-hidden">
              <img
                src={mentorImg}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <p className="font-bold text-base">{name}</p>
              <p className="text-sm">{job}</p>
            </div>
          </div>
        </div>
        {variantContent[variant]}
      </div>
    </div>
  );
};

export default Card;
