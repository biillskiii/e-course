import React from "react";

const Testi = ({ testimonial }) => {
  return (
    <div className=" w-[476px]  bg-white p-6 rounded-2xl">
      <p className="h-[120px]">{testimonial.testimonial}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          <img
            src={testimonial.img}
            alt={testimonial.name}
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-base">{testimonial.name}</h1>
            <p className="text-sm text-[#676C6F]">{testimonial.job}</p>
          </div>
        </div>
        <svg
          width="95"
          height="76"
          viewBox="0 0 95 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M54.0563 58.993C59.9437 57.5758 64.7606 54.9184 68.507 51.021C72.4319 47.1235 74.8404 42.5175 75.7324 37.2028H59.4084V0H95V22.8531C95 37.2028 91.5211 48.9837 84.5634 58.1958C77.6056 67.2308 67.4366 73.1655 54.0563 76V58.993ZM0 58.993C5.88732 57.5758 10.7042 55.007 14.4507 51.2867C18.1972 47.3893 20.6056 42.6946 21.6761 37.2028H5.35211V0H40.6761V22.8531C40.6761 37.2028 37.1972 48.9837 30.2394 58.1958C23.2817 67.2308 13.2019 73.1655 0 76V58.993Z"
            fill="#FFF4DA"
          />
        </svg>
      </div>
    </div>
  );
};

export default Testi;
