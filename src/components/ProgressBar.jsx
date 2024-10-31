import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const ProgressBar = ({ progress, color = "bg-teal-500" }) => {
  const progressStyle = {
    width: `${Math.min(Math.max(progress, 0), 100)}%`,
  };

  return (
    <div className="w-full bg-teal-100 rounded-full h-2 overflow-hidden">
      <div
        className={clsx(
          "h-full rounded-full transition-all duration-300 ease-out",
          color
        )}
        style={progressStyle}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // Angka dari 0 hingga 100 untuk nilai progress
  color: PropTypes.string, // Kelas Tailwind untuk warna progress
};

export default ProgressBar;
