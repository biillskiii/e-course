import React from "react";
import clsx from "clsx";

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Helper function to render page numbers
  const renderPageNumbers = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={clsx(
            "w-10 h-10 flex items-center justify-center rounded-xl",
            // Kondisi tombol saat diklik
            i === currentPage
              ? "bg-primary-500 text-white" // Kondisi tombol klik (active)
              : "bg-white text-black hover:bg-primary-400 hover:text-white" // Kondisi standby
          )}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Numbered pagination */}
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          className={clsx(
            "w-10 h-10 flex items-center justify-center rounded-xl",
            // Disabled state
            isFirstPage
              ? "bg-gray-200 text-white" // Disabled condition
              : "bg-primary-500 text-white hover:bg-white hover:text-black" // Standby
          )}
          disabled={isFirstPage}
        >
          {"<"}
        </button>
        <button
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          className={clsx(
            "w-10 h-10 flex items-center justify-center rounded-xl",
            // Disabled state
            isLastPage
              ? "bg-gray-200 text-white" // Disabled condition
              : "bg-primary-500 text-white hover:bg-white hover:text-black" // Standby
          )}
          disabled={isLastPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
