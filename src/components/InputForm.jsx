import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeSlash } from "iconsax-react";
const InputBase = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  className,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={clsx(
            "w-full px-3 py-2 border rounded-3xl shadow-sm focus:outline-none",
            {
              "border-gray-300 focus:ring-primary-500 focus:border-primary-500":
                !error,
              "border-alert-error focus:ring-alert-error focus:border-alert-error":
                error,
            },
            className
          )}
          required={type === "email"}
          pattern={type === "email" ? ".+@.+" : undefined}
        />
        {type === "password" && (
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
  );
};
export default InputBase;
