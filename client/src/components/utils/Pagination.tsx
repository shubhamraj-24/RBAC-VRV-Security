import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { allUserService } from "../services/userServices";

const Pagination = ({
  nextPage,
  nextPageNumber,
  totalPage,
  currentPage,
  requestPageNum,
  userType,
}) => {
  const maxPageButtons = 5;
  let startPage = Math.max(
    Math.min(
      currentPage - Math.floor(maxPageButtons / 2),
      totalPage - maxPageButtons + 1
    ),
    1
  );
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPage);

  console.log("currentPage", currentPage);
  const previousPage = () => {
    if (currentPage > 1) {
      requestPageNum(currentPage - 1, userType);
    } else {
      toast.warning("There is no previous page");
    }
  };

  const nextPageFunc = () => {
    if (nextPage) {
      requestPageNum(currentPage + 1, userType);
    } else {
      toast.warning("There is no next page");
    }
  };

  const renderPageButtons = () => {
    return (
      <li key={currentPage}>
        <button
          className={`px-4 py-2  text-black-600 transition-colors duration-150  border border-r-0 border-indigo-600 focus:shadow-outline hover:bg-indigo-200 bg-indigo-600 text-white`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            console.log(`Page ${currentPage} clicked`);
          }}
        >
          {currentPage}
        </button>
      </li>
    );
  };

  return (
    <div className="bg-white p-4 flex items-center justify-center flex-wrap">
      <nav aria-label="Page navigation">
        <ul className="inline-flex">
          <li>
            <button
              className={`px-4 py-2 text-black-600 transition-colors duration-150 bg-white border border-r-0 border-indigo-600 rounded-l-lg focus:shadow-outline hover:bg-indigo-200 ${
                currentPage === 1 ? "cursor-not-allowed text-gray-200" : ""
              }`}
              onClick={previousPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {renderPageButtons()}
          <li>
            <button
              onClick={nextPageFunc}
              className={`px-4 py-2 text-black-600 transition-colors duration-150 bg-white border border-r border-indigo-600 rounded-r-lg focus:shadow-outline hover:bg-indigo-200 ${
                !nextPage ? "cursor-not-allowed text-gray-200" : ""
              }`}
              disabled={!nextPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
