import React from "react";
import { v4 as uuidv4 } from "uuid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButton = (page: number | string) => {
    if (typeof page === "number") {
      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
          className={`px-4 py-2 mx-1 rounded-md text-lg transition-colors duration-200 
            ${currentPage === page ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-blue-100"}`}
        >
          {page}
        </button>
      );
    } else {
      return (
        <span key={uuidv4()} className="mx-1 text-gray-500">
          ...
        </span>
      );
    }
  };

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const showEllipsisStart = currentPage > 3;
  const showEllipsisEnd = currentPage < totalPages - 2;

  const renderVisiblePages = () => {
    if (totalPages <= 5) {
      return visiblePages.map(renderPageButton);
    }

    let pagesToDisplay: (number | string)[] = [];

    pagesToDisplay.push(1);

    if (showEllipsisStart) {
      pagesToDisplay.push("ellipsis-start");
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      pagesToDisplay.push(i);
    }

    if (showEllipsisEnd) {
      pagesToDisplay.push("ellipsis-end");
    }

    pagesToDisplay.push(totalPages);

    return pagesToDisplay.map(renderPageButton);
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-3">
      {renderVisiblePages()}
    </div>
  );
};

export default Pagination;
