import clsx from "clsx";

export default function Button({
  type = "button",
  label,
  onClick,
  size = "full",
  variant = "primary",
  leftIcon,
  rightIcon,
  active = false,
}) {
  const baseStyle = {
    baseButton: [
      "h-11",
      "flex",
      "items-center",
      "gap-2",
      "transition-colors",
      "duration-200",
    ],
    baseText: ["font-bold"],
  };

  const sizeStyles = {
    full: "w-full",
    "very-big": "w-[208px]",
    big: "w-[194px]",
    small: "w-[136px]",
    "very-small": "w-[55px]",
  };

  const variantStyles = {
    primary: `bg-primary-500 hover:bg-primary-400 text-white rounded-3xl ${
      active ? "bg-primary-400 hover:text-white" : ""
    }`,
    secondary: `border-2 border-primary-500 hover:border-primary-400 text-primary-500 rounded-3xl bg-transparent ${
      active ? "border-primary-400 hover:text-white" : ""
    }`,
    tertiary: `bg-transparent rounded-lg hover:text-brand-base ${
      active ? "bg-brand-base text-basic-white" : ""
    }`,
    danger: `bg-transparent rounded-lg hover:text-alert-danger ${
      active ? "bg-alert-danger text-basic-white" : ""
    }`,
    disable: "bg-gray-100 rounded-lg text-gray-200 cursor-not-allowed",
    submenu: `cursor-pointer  border-transparent hover:text-primary-500 ${
      active ? "text-primary-500" : ""
    }`,
    "submenu-active": "cursor-pointer  border-primary-500 text-primary-500",
    "submenu-disable":
      "cursor-not-allowed border-b-2 border-gray-medium-light text-gray-200",
    "side-primary": `hover:text-primary-500 rounded-2xl active:bg-primary-500 active:font-bold active:text-white text-base ${
      active
        ? "bg-primary-500 rounded-2xl font-bold text-white hover:text-white text-base"
        : ""
    }`,
    "side-primary-active":
      "bg-primary-500 rounded-2xl font-bold text-white text-base",
    "side-danger":
      "text-alert-danger rounded-2xl active:bg-alert-danger active:font-bold active:text-white text-base",
  };

  const alignmentStyles = {
    side:
      variant === "disable" ||
      ((variant === "side-primary" ||
        variant === "side-primary-active" ||
        variant === "side-danger") &&
        (variant === "side-primary" ||
          variant === "side-primary-active" ||
          variant === "side-danger") &&
        (leftIcon || rightIcon))
        ? "justify-start pl-4"
        : "justify-center",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={variant === "disable" || variant === "submenu-disable"}
      className={clsx(
        baseStyle.baseButton,
        baseStyle.baseText,
        sizeStyles[size],
        variantStyles[variant],
        alignmentStyles.side
      )}
    >
      {leftIcon && <span className="icon-left">{leftIcon}</span>}
      {label}
      {rightIcon && <span className="icon-right">{rightIcon}</span>}
    </button>
  );
}
