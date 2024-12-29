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
  name,
  className,
  error,
  disabled = false,
  rows = 4, // Default rows for textarea
  variant = "primary", // New prop for color variant
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

  const inputClasses = clsx(
    "w-full px-3 py-2 border rounded-3xl shadow-sm focus:outline-none",
    {
      "border-gray-200 focus:ring-gray-500 focus:border-primary-500":
        variant === "primary" && !error && !disabled,
      "border-primary-500 focus:ring-primary-500 focus:border-primary-500 text-primary-500":
        variant === "secondary" && !error && !disabled,
      "border-alert-error focus:ring-alert-error focus:border-alert-error":
        error && !disabled,
      "border-gray-500 bg-gray-100 text-gray-400 cursor-not-allowed": disabled,
    },
    className
  );

  const labelClasses = clsx("block text-sm font-semibold mb-4", {
    "text-gray-700": variant === "primary" && !disabled,
    "text-primary-500": variant === "secondary" && !disabled,
    "text-gray-400": disabled,
  });

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <div className="relative">
          {type === "textarea" ? (
            <textarea
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              rows={rows}
              className={inputClasses}
            />
          ) : type === "date" ? (
            <input
              type="date"
              id={id}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={inputClasses}
            />
          ) : type !== "checkbox" ? (
            <input
              type={inputType}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={inputClasses}
              required={type === "email"}
              pattern={type === "email" ? ".+@.+" : undefined}
            />
          ) : (
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
                  : (variant === "secondary" ? "#38B2AC" : "#000000") &&
                    disabled
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
          )}
          {type === "password" && !disabled && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className={clsx(
                "absolute inset-y-0 right-0 flex items-center px-4 text-sm font-medium focus:outline-none",
                {
                  "text-gray-500": variant === "primary",
                  "text-primary-500": variant === "secondary",
                }
              )}
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
