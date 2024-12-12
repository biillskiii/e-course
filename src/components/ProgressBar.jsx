import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const ProgressBar = ({
  progress,
  color = "bg-teal-500",
  variant = "below",
}) => {
  const progressStyle = {
    width: `${Math.min(Math.max(progress, 0), 100)}%`,
  };

  return (
    <div className="w-full relative">
      {variant === "above" && (
        <div>
          <p className="">Progress Kamu</p>
          <span className="-mt-5 flex justify-end mb-2 text-primary-500 text-sm font-bold">
            {progress}%
          </span>
        </div>
      )}
      <div className="bg-teal-100 rounded-full h-2 overflow-hidden relative">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-300 ease-out flex items-center justify-center text-white font-bold",
            color
          )}
          style={progressStyle}
        ></div>
      </div>
      {variant === "below" && (
        <p className="text-start mt-2 text-primary-500 font-bold">
          {progress}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
