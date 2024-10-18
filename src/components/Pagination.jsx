import React from "react";
import clsx from "clsx";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const renderPageNumbers = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={clsx(
            "w-10 h-10 flex items-center justify-center rounded-xl",
            i === currentPage
              ? "bg-primary-500 text-white"
              : "bg-white text-black hover:bg-primary-400 hover:text-white"
          )}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="w-full mx-auto flex justify-center mt-5 gap-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          className={clsx(
            "w-10 h-10 flex items-center justify-center rounded-xl",
            isFirstPage
              ? "bg-gray-200 text-white" 
              : "bg-primary-500 text-white hover:bg-primary-600 " 
          )}
          disabled={isFirstPage}
        >
          <ArrowLeft2 size={16}/>
        </button>
        {/* <div className="flex items-center gap-2">{renderPageNumbers()}</div> */}
        <button
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          className={clsx(
            "w-10 h-10 flex items-center justify-center rounded-xl",
            isLastPage
              ? "bg-gray-200 text-white" 
              : "bg-primary-500 text-white hover:bg-primary-600 "
          )}
          disabled={isLastPage}
        >
            <ArrowRight2 size={16}/>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
