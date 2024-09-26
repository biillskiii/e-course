import clsx from "clsx";

export default function Button({
  type = "button",
  label,
  onClick,
  size = "full",
  variant = "primary",
  leftIcon,
  rightIcon,
}) {
  const baseStyle = {
    baseButton: [
      "h-11",
      "flex",
      "items-center",
      "gap-2",
      leftIcon ? "justify-start pl-4" : "justify-center",
    ],
    baseText: ["text-body-bold"],
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={` ${clsx(baseStyle.baseButton, baseStyle.baseText, {
        // Size
        "w-full": size === "full",
        "w-[208px]": size === "very-big",
        "w-[194px]": size === "big",
        "w-[136px]": size === "small",
        "w-[55px]": size === "very-small",

        // Variants
        "bg-primary-500 cursor-pointer rounded-3xl hover:bg-primary-400":
          variant === "primary",
        "border-[2px] border-primary-500 hover:border-primary-400 text-primary-500 rounded-3xl cursor-pointer bg-transparent":
          variant === "secondary",
        "bg-transparent rounded-lg cursor-pointer hover:text-brand-base active:bg-brand-base active:text-basic-white font-semibold":
          variant === "tertiary",
        "bg-transparent rounded-lg cursor-pointer hover:text-alert-danger active:bg-alert-danger active:text-basic-white font-semibold":
          variant === "danger",

        // Disabled button styles
        "bg-gray-light rounded-lg cursor-not-allowed": variant === "disable",

        // Button submenu styles
        "cursor-pointer border-b-[2px] border-b-transparent active:border-b-primary-500":
          variant === "submenu",
        "cursor-pointer border-b-[2px] border-b-primary-500":
          variant === "submenu-active",
        "cursor-not-allowed border-b-[2px] border-b-gray-medium-light":
          variant === "submenu-disable",

        //Button Side
        "hover:text-primary-500 rounded-3xl  active:bg-primary-500 active:font-bold active:text-white text-base":
          variant === "side-primary",

        // Text colors
        "text-white font-bold": variant === "primary",
        "text-primary-500 font-bold   ": variant === "secondary",
        "text-black active:text-brand-base": variant === "submenu",
        "text-primary-500": variant === "submenu-active",
        "text-gray-medium-light":
          variant === "disable" || variant === "submenu-disable",
      })}`}
    >
      {/* Icon before text */}
      {leftIcon && <span className="icon-left">{leftIcon}</span>}

      {label}

      {/* Icon after text */}
      {rightIcon && <span className="icon-right">{rightIcon}</span>}
    </button>
  );
}
