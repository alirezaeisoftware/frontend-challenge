import React from "react";
import { IPaginationProps } from "../../interfaces/interface";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: IPaginationProps) => {
  const pageNumbers: (number | string)[] = [];
  const delta = 2;
  const range = {
    start: Math.max(2, currentPage - delta),
    end: Math.min(totalPages - 1, currentPage + delta),
  };

  for (let i = range.start; i <= range.end; i++) {
    pageNumbers.push(i);
  }

  if (range.start > 2) {
    pageNumbers.unshift("...");
  }
  if (range.end < totalPages - 1) {
    pageNumbers.push("...");
  }

  pageNumbers.unshift(1);
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <div className={`mt-6 flex align-middle justify-center flex-wrap ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 bg-gray-800 rounded-md mx-1 size-8 flex items-center justify-center cursor-pointer"
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pageNumbers.map((number, id) =>
        number === "..." ? (
          <span key={id} className="p-2 mx-1 size-8 flex items-center justify-center">
            {number}
          </span>
        ) : (
          <button
            key={id}
            onClick={() => onPageChange(number as number)}
            className={`p-2 mx-1 size-8 flex items-center justify-center cursor-pointer rounded-md ${
              currentPage === number ? "bg-red-500 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            {number}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 bg-gray-800 rounded-md mx-1 size-8 flex items-center justify-center cursor-pointer"
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
