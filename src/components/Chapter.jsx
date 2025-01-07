import React, { useEffect } from "react";
import { DiscountCircle } from "iconsax-react";
import Button from "./Button";
import useSnap from "../hooks/useSnap";

const PriceDisplay = ({ price, hasDiscount }) => {
  if (price === null) {
    return (
      <div className="bg-primary-100 flex justify-center items-center rounded-lg w-20 h-6">
        <p className="text-primary-500 font-bold text-base">GRATIS</p>
      </div>
    );
  }

  if (hasDiscount) {
    const discountValue = Number(hasDiscount);
    const priceValue = Number(price);
    const formattedDiscount = Math.round(discountValue * 10) / 10;
    const discountPrice = price * (1 - hasDiscount / 100);
    return (
      <div className="flex items-center gap-x-2">
        <span className="w-16 h-6 rounded-lg text-sm bg-primary-100 text-primary-500 flex justify-center items-center gap-x-1">
          <DiscountCircle size="16" color="#00a589" />
          {formattedDiscount.toLocaleString()}%
        </span>
        <span className="line-through font-bold text-xs">
          Rp. {priceValue.toLocaleString("id-ID")}
        </span>
        <span className="text-primary-500 font-bold text-2xl">
          Rp. {discountPrice.toLocaleString("id-ID")}
        </span>
      </div>
    );
  }

  return (
    <span className="text-primary-500 font-bold text-5xl">
      Rp. {price?.toLocaleString() || "Rp.0"}
    </span>
  );
};

const Chapter = ({
  price,
  isDisabled,
  accordionItems,
  onClick,
  hasDiscount,
  courseId,
  label,
  variant,
  size
}) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-xl font-bold text-primary-500 mb-4">
            <PriceDisplay price={price} hasDiscount={hasDiscount} />
          </p>
          <Button
            type="button"
            size={size}
            variant={variant}
            label={label}
            onClick={onClick}
            isDisabled={isDisabled}
          />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold mb-4 mt-4">Modul</h1>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
