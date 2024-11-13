import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // No pagination needed for single page or less

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-between items-center mt-6 space-x-4 w-full quantico-bold-italic">
      {/* Page Numbers */}
      <div className="flex items-center space-x-2 w-1/2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center border ${
              page === currentPage
                ? "bg-gradient-to-r from-black to-[#0821D2] text-white border-[#0821D2]"
                : "border-gray-400 text-gray-700 hover:bg-gradient-to-r hover:from-black hover:to-[#0821D2] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next and Previous Buttons */}
      <div className="flex items-center justify-end space-x-2 w-1/2">
        <button
          className={`w-12 h-10 flex items-center justify-center border ${
            currentPage === 1
              ? "text-gray-300 border-gray-300 cursor-not-allowed"
              : "border-gray-400 text-gray-700 hover:bg-gradient-to-r hover:from-black hover:to-[#0821D2] hover:text-white"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          className={`w-12 h-10 flex items-center justify-center border ${
            currentPage === totalPages
              ? "text-gray-300 border-gray-300 cursor-not-allowed"
              : "border-gray-400 text-gray-700 hover:bg-gradient-to-r hover:from-black hover:to-[#0821D2] hover:text-white"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
