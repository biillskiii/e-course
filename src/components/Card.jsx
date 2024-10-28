import React from "react";
import { Level } from "iconsax-react";
import { Icon } from "@iconify/react";
import BgCard from "../assets/bg-class.png";
import Button from "./Button";
import { DiscountCircle } from "iconsax-react";

const Card = ({
  img,
  class_name,
  avatar,
  name,
  job,
  level,
  rating,
  ratingNum,
  price,
  premium,
  hasDiscount,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          icon="material-symbols:star"
          key={i}
          width={24}
          color={i <= rating ? "#F1C644" : "#e4e5e9"}
        />
      );
    }
    return stars;
  };

  const calculateDiscountPrice = (price, discountPercentage) => {
    return price * (discountPercentage / 100);
  };

  const renderPrice = () => {
    if (premium === 0) {
      return (
        <div className="bg-primary-100 flex justify-center items-center rounded-lg w-20 h-6">
          <p className=" text-primary-500 font-bold text-base">GRATIS</p>
        </div>
      );
    } else if (hasDiscount) {
      const discountPrice = calculateDiscountPrice(price, hasDiscount);
      return (
        <div className="flex items-center gap-x-2">
          <span className="w-16 h-6 rounded-lg text-sm   bg-primary-100 text-primary-500 flex justify-center items-center gap-x-1">
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
    } else {
      return (
        <span className="text-primary-500 font-bold text-xl">
          Rp. {price?.toLocaleString() || "Rp.0"}
        </span>
      );
    }
  };

  const calculateFontSize = (class_name) => {
    if (class_name.length <= 30) return "24px";
    else if (class_name.length <= 50) return "20px";
    else return "16px";
  };

  return (
    <div className="w-[392px] h-full flex flex-col rounded-3xl border border-gray-200/50 p-4">
      <div
        className="w-full flex justify-center h-[203px] mb-5 rounded-xl pl-4"
        style={{
          backgroundImage: `url(${BgCard})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-between h-full py-5">
          <h1
            className="text-primary-800 font-bold h-full"
            style={{
              fontSize: calculateFontSize(class_name),
              lineHeight: "1.2em",
            }}
          >
            {class_name.length > 50
              ? `${class_name.substring(0, 50)}...`
              : class_name}
          </h1>
          <div>
            <p className="text-sm font-bold text-primary-800">{name}</p>
            <p className="text-[10px] font-bold text-primary-800">{job}</p>
          </div>
        </div>
        <img className="w-[153px] h-full" src={img} alt={class_name} />
      </div>

      <div className="flex flex-col gap-y-4 flex-grow">
        <h1
          style={{ fontSize: calculateFontSize(class_name) }}
          className="font-bold text-xl line-clamp-2 h-[60px]"
        >
          {class_name}
        </h1>
        <div className="flex gap-x-2 items-center">
          <div className="rounded-full w-12 h-12 bg-primary-500 overflow-hidden">
            <img
              src={img}
              alt={class_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <p className="font-bold text-base">{name}</p>
            <p>{job}</p>
          </div>
        </div>

        <div className="flex items-center gap-x-5">
          <div className="flex items-center">
            {renderStars()}
            <p className="ml-2">{ratingNum}</p>
          </div>
          <p className="flex font-bold  items-center gap-x-2">
            <Level size={24} color="#0A181F" />
            {level}
          </p>
        </div>

        <div className="flex-grow flex items-end">
          <p className="text-xl font-bold text-primary-500">{renderPrice()}</p>
        </div>
        <Button label={"Daftar Kelas"} size="full" />
      </div>
    </div>
  );
};

export default Card;
