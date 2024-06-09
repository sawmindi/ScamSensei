"use client";
import React, { useEffect,useState } from 'react';
import { useAuth } from "../context/AuthContext";
import {getScamCount} from "../helpers/api-communicator";
// import from react icons arrows
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
function PaginationButtons() {
  const auth = useAuth();
  const [maxCount, setMaxCount] = useState(0);

  const isPreviousDisabled = auth.page === 1;
  const isNextDisabled = auth.page >= maxCount / auth.limit;
  useEffect(() => {
    async function fetchData() {
      const data = await getScamCount();

      setMaxCount(data.postCount);
      console.log(data.postCount);
      console.log(auth.limit);
    }
    fetchData();
  }, [auth.page]);

  // Helper function to disable buttons
  const disableButton = (disabled) => (disabled ? "cursor-not-allowed opacity-50" : "");
  return (
    <div className="flex">
      {/* Previous Button */}
      <button
        onClick={() => auth.setPage(auth.page - 1)}
        disabled={isPreviousDisabled}
        className={`flex flex-row items-center min-w-[8vw] justify-center px-3 h-[4vh] me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${disableButton(
          isPreviousDisabled
        )}`}
      >
        <IoIosArrowBack className="text-xl" />
        <p className="md:inline hidden">Previous</p>
      </button>
      {/* Next Button */}
      <button
        onClick={() => auth.setPage(auth.page + 1)}
        disabled={isNextDisabled}
        className={`flex items-center h-[4vh] min-w-[8vw] justify-center px-3  text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${disableButton(
          isNextDisabled
        )}`}
      >
        <p className="md:inline hidden">Next</p>
        <IoIosArrowForward className="text-xl" />
      </button>
    </div>
  );
}

export default PaginationButtons;
