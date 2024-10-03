import clsx from "clsx";

export default function Label({
  type = "text",
  label,
  size = "full",
  variant,
}) {
  const baseStyle = {
    baseLabel: [
      "px-6",
      "py-3",
      "rounded-full",
      "flex",
      "justify-center",
      "items-center",
      "font-bold",
    ],
  };

  return (
    <div
      className={clsx(baseStyle.baseLabel, {
        // Size
        "w-full": size === "full",
        "w-[208px]": size === "very-big",
        "w-[194px]": size === "big",
        "w-[136px]": size === "small",
        "w-[55px]": size === "very-small",

        // Variants
        "text-alert-warning bg-alert-warningLight": variant === "pending",
        "text-alert-success bg-alert-successLight": variant === "success",
        "text-alert-danger bg-alert-dangerLight": variant === "failed",

        // Custom logic for type prop
        "custom-class-based-on-type": type === "Text", // Example usage
      })}
    >
      {label} {/* Render the label */}
    </div>
  );
}
