import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeSlash } from "iconsax-react";
import { Icon } from "@iconify/react";

const InputBase = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  className,
  error,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      if (onChange) {
        onChange(!isChecked);
      }
    }
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <div className="">
        <label
          htmlFor={id}
          className={clsx("block text-sm font-semibold mb-1", {
            "text-gray-700": !disabled,
            "text-gray-400": disabled,
          })}
        >
          {label}
        </label>
        <div className="relative">
          {type !== "checkbox" ? (
            <input
              type={inputType}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={clsx(
                "w-full px-3 py-2 border rounded-3xl shadow-sm focus:outline-none",
                {
                  "border-primary-500 focus:ring-primary-500 focus:border-primary-500":
                    !error && !disabled,
                  "border-alert-error focus:ring-alert-error focus:border-alert-error":
                    error && !disabled,
                  "border-gray-500 bg-gray-100 text-gray-400 cursor-not-allowed":
                    disabled,
                },
                className
              )}
              required={type === "email"}
              pattern={type === "email" ? ".+@.+" : undefined}
            />
          ) : (
            <div
              className={clsx(
                "w-6 h-6 rounded-lg border-2 flex items-center  justify-center transition-colors duration-200 ease-in-out",
                {
                  "cursor-pointer": !disabled,
                  "cursor-not-allowed opacity-50": disabled,
                }
              )}
              onClick={handleCheckboxChange}
              style={{
                borderColor: isChecked
                  ? "#38B2AC"
                  : "#38B2AC" && disabled
                  ? "#676C6F"
                  : "#38B2AC",
                backgroundColor: isChecked ? "transparent" : "transparent",
              }}
            >
              {isChecked && (
                <Icon
                  className={clsx("text-primary-500", {
                    "opacity-50": disabled,
                  })}
                  icon="mingcute:check-fill"
                />
              )}
            </div>
          )}
          {type === "password" && !disabled && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-sm font-medium text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-alert-error">{error}</p>}
      </div>
    </div>
  );
};

export default InputBase;
