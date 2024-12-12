import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const ProgressBar = ({ progress, color = "bg-teal-500" }) => {
  const progressStyle = {
    width: `${Math.min(Math.max(progress, 0), 100)}%`,
  };

  return (
    <div className="w-full">
      <div className="bg-teal-100 rounded-full h-2 overflow-hidden relative">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-300 ease-out flex items-center justify-center text-white font-bold",
            color
          )}
          style={progressStyle}
        ></div>
      </div>
      <p className="text-start mt-2 text-primary-500 font-bold">{progress}%</p>
    </div>
  );
};


export default ProgressBar;