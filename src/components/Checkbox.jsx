import React, { useState } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";
const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      if (onChange) {
        onChange(!isChecked);
      }
    }
  };
  return (
    <div
      className={clsx(
        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors duration-200 ease-in-out",
        {
          "cursor-pointer": !disabled,
          "cursor-not-allowed opacity-50": disabled,
        }
      )}
      onClick={handleCheckboxChange}
      style={{
        borderColor: isChecked
          ? variant === "secondary"
            ? "#38B2AC"
            : "#000000"
          : (variant === "secondary" ? "#38B2AC" : "#000000") && disabled
          ? "#676C6F"
          : variant === "secondary"
          ? "#38B2AC"
          : "#000000",
        backgroundColor: isChecked ? "transparent" : "transparent",
      }}
    >
      {isChecked && (
        <Icon
          className={clsx({
            "text-gray-700": variant === "primary",
            "text-primary-500": variant === "secondary",
            "opacity-50": disabled,
          })}
          icon="mingcute:check-fill"
        />
      )}
    </div>
  );
};

export default Checkbox;
