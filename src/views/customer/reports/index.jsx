import React, { useState } from "react";
import Schedule from "./components/Schedule";
import Generate from "./components/Generate";

const Reports = () => {
  const [isGenerate, setIsGenerate] = useState(true);

  const handleGenerate = () => {
    setIsGenerate(true);
  };

  const handleSchedule = () => {
    setIsGenerate(false);
  };
  return (
    <div>
      <h4 className="text-dark text-xl font-bold dark:text-white">Customers</h4>

      <div className="mt-20 text-center">
        <button
          className={`${
            isGenerate === true
              ? "list-btn  bg-white px-5 py-2  dark:bg-gray-150  "
              : "list-btn bg-gray-150 px-5 py-2  dark:bg-gray-700"
          }`}
          onClick={handleGenerate}
        >
          Generate
        </button>
        <button
          className={`${
            isGenerate === false
              ? "grid-btn bg-white px-5 py-2  dark:bg-gray-150 "
              : "grid-btn bg-gray-150 px-5 py-2  dark:bg-gray-700 "
          }`}
          onClick={handleSchedule}
        >
          Schedule
        </button>
      </div>
      {!isGenerate && <Schedule />}
      {isGenerate && (
        <div className="opacity-100 transition-opacity duration-500">
          <Generate />
        </div>
      )}
    </div>
  );
};

export default Reports;
