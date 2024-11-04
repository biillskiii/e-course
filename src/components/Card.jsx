import React from "react";
import { Level, DiscountCircle } from "iconsax-react";
import { Icon } from "@iconify/react";
import BgCard from "../assets/bg-class.png";
import Button from "./Button";
import ProgressBar from "./ProgressBar";

const calculateFontSize = (text) => {
  if (text.length <= 30) return "24px";
  else if (text.length <= 50) return "20px";
  return "16px";
};

const truncateText = (text, limit) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

const PriceDisplay = ({ price, premium, hasDiscount }) => {
  if (premium === 0) {
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

const RatingStars = ({ rating }) => {
  return [...Array(5)].map((_, index) => (
    <Icon
      icon="material-symbols:star"
      key={index}
      width={24}
      color={index < rating ? "#F1C644" : "#e4e5e9"}
    />
  ));
};

const ProfileSection = ({ img, name, job, size = "large" }) => {
  const imageSize = size === "large" ? "w-12 h-12" : "w-8 h-8";

  return (
    <div className="flex gap-x-2 items-center">
      <div
        className={`rounded-full ${imageSize} bg-primary-500 overflow-hidden`}
      >
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between">
        <p className="font-bold text-base">{name}</p>
        <p className="text-sm">{job}</p>
      </div>
    </div>
  );
};

const BaseCard = ({
  img,
  className,
  name,
  job,
  variant = "default",
  children,
}) => {
  const Header = () => (
    <div
      className="w-full flex justify-between h-[180px] rounded-xl pl-4"
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
            fontSize: calculateFontSize(className),
            lineHeight: "1.2em",
          }}
        >
          {truncateText(className, 50)}
        </h1>
        <ProfileSection img={img} name={name} job={job} size="small" />
      </div>
      <img className="w-[153px] h-full" src={img} alt={className} />
    </div>
  );

  if (variant === "header-only") {
    return (
      <div className="w-[320px] rounded-xl">
        <Header />
      </div>
    );
  }

  return (
    <div className="w-[382px] h-full flex flex-col rounded-3xl border border-gray-200/50 p-4">
      <Header />
      <div className="flex flex-col flex-grow mt-5">
        <h1
          style={{ fontSize: calculateFontSize(className) }}
          className="font-bold text-xl line-clamp-2 h-[60px]"
        >
          {className}
        </h1>
        <ProfileSection img={img} name={name} job={job} />
        {children}
      </div>
    </div>
  );
};

const Card = ({
  img,
  courseCode,
  className,
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
}) => {
  const variantContent = {
    progress: (
      <div className="flex flex-col mt-4">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-primary-400 text-sm">Progress Kamu</span>
          </div>
          <ProgressBar progress={80} />
          <span className="text-sm font-bold text-primary-400">80%</span>
        </div>
      </div>
    ),
    certificate: (
      <div className="flex-grow flex items-end mt-4">
        <Button
          label="Unduh Sertifikat"
          size="full"
          variant="primary"
          className="gap-x-2"
        />
      </div>
    ),
    default: (
      <>
        <div className="flex items-center gap-x-5 mt-4">
          <div className="flex items-center">
            <RatingStars rating={rating} />
            <p className="ml-2">{ratingNum}</p>
          </div>
          <p className="flex font-bold items-center gap-x-2">
            <Level size={24} color="#0A181F" />
            {level}
          </p>
        </div>
        <div className="flex-grow flex items-end mt-4">
          <div className="w-full">
            <p className="text-xl font-bold text-primary-500 mb-4">
              <PriceDisplay
                price={price}
                premium={premium}
                hasDiscount={hasDiscount}
              />
            </p>
            <Button
              label="Daftar Kelas"
              size="full"
              variant="primary"
              className="mt-4"
            />
          </div>
        </div>
      </>
    ),
  };

  return (
    <BaseCard
      img={img}
      className={className}
      name={name}
      job={job}
      variant={variant}
    >
      {variant === "header-only"
        ? null
        : variantContent[variant] || variantContent.default}
    </BaseCard>
  );
};

export default Card;
