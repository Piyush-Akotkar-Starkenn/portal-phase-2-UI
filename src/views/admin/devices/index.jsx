import React, { useState } from "react";
import DevicesList from "./components/DevicesList";
import DevicesGrid from "./components/DevicesGrid";
import { BsGrid, BsListUl } from "react-icons/bs";
import { Button } from "primereact/button";

const DevicesAdmin = () => {
  const [isListView, setIsListView] = useState(true);

  const handleListView = () => {
    setIsListView(true);
  };

  const handleGridView = () => {
    setIsListView(false);
  };
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-dark text-xl font-bold dark:text-white">Devices</h4>
        <div>
          <button
            className={`${
              isListView === true
                ? "list-btn bg-gray-150 px-3 py-2  dark:bg-gray-700  "
                : "list-btn bg-white px-3 py-2  dark:bg-gray-150 "
            }`}
            onClick={handleListView}
          >
            <BsListUl />
          </button>
          <button
            className={`${
              isListView === false
                ? "grid-btn bg-gray-150 px-3 py-2  dark:bg-gray-700  "
                : "grid-btn bg-white px-3 py-2  dark:bg-gray-150 "
            }`}
            onClick={handleGridView}
          >
            <BsGrid />
          </button>
        </div>
      </div>
      <Button
        label="New Device"
        icon="pi pi-plus"
        severity="Primary"
        className="mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
        // onClick={openNew}
      />
      {!isListView && <DevicesGrid />}
      {isListView && (
        <div className="opacity-100 transition-opacity duration-500">
          <DevicesList />
        </div>
      )}
    </>
  );
};

export default DevicesAdmin;
