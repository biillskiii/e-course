import React from "react";

const Popup = ({
  variant = "default", // Variants: default, success, error, paymentSuccess
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
  show = false, // Control whether the popup is visible or not
}) => {
  if (!show) return null;

  // Define variant-specific content and styles
  const variants = {
    success: {
      title: "Akun Berhasil Dibuat!",
      message: "Selamat, akun Kamu telah berhasil dibuat!",
      primaryButtonText: "Masuk Akun",
      singleButton: true,
      variantStyles: "bg-white text-gray-300 text-base",
      titleStyles: "text-alert-success font-bold text-2xl",
    },
    error: {
      title: "Pembayaran Gagal!",
      message: "Maaf, pembayaran gagal. Coba beberapa saat lagi.",
      primaryButtonText: "Coba Lagi",
      singleButton: true,
      variantStyles: "bg-white text-gray-300 text-base",
      titleStyles: "text-alert-danger font-bold text-2xl",
    },
    paymentSuccess: {
      title: "Pembayaran Berhasil!",
      message: "Kamu sekarang bisa mengakses kelas UI/UX Fundamental.",
      primaryButtonText: "Ikuti Kelas",
      secondaryButtonText: "Kembali",
      singleButton: false,
      variantStyles: "bg-white text-gray-300 text-base",
      titleStyles: "text-alert-success font-bold text-2xl",
    },
  };

  const currentVariant = variants[variant] || variants["default"];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div
        className={`rounded-3xl shadow-lg px-10 py-12 w-[552px] ${currentVariant.variantStyles}`}
      >
        <h2
          className={` flex justify-center text-2xl font-bold mb-2 ${currentVariant.titleStyles}`}
        >
          {currentVariant.title}
        </h2>
        <p className="text-center mb-8">{currentVariant.message}</p>
        <div className="flex justify-evenly">
          {currentVariant.singleButton ? (
            <button
              onClick={onPrimaryClick}
              className="w-[456px] font-bold text-base bg-primary-500 text-white px-6 py-2 rounded-3xl hover:bg-primary-600 transition"
            >
              {currentVariant.primaryButtonText}
            </button>
          ) : (
            <>
              <button
                onClick={onSecondaryClick}
                className="w-[224px] border-2 border-primary-500 text-primary-500 px-6 py-2 hover:bg-primary-50 rounded-3xl transition"
              >
                {currentVariant.secondaryButtonText}
              </button>
              <button
                onClick={onPrimaryClick}
                className="w-[224px] bg-primary-500 text-white px-6 py-2 rounded-3xl hover:bg-primary-600 transition"
              >
                {currentVariant.primaryButtonText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
