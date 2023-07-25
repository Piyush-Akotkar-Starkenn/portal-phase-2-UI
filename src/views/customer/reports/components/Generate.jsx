import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { Toast } from "primereact/toast";

const Generate = () => {
  const [currentOperation, setCurrentOperation] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [operationsStatus, setOperationsStatus] = useState({
    1: false, // Start Date operation completion status
    2: false, // End Date operation completion status
    3: false, // Options operation completion status
  });
  const [optionsCompleted, setOptionsCompleted] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      setOperationsStatus((prevState) => ({
        ...prevState,
        1: true,
      }));
    } else {
      setOperationsStatus((prevState) => ({
        ...prevState,
        1: false,
      }));
    }
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (currentOperation === 3) {
      if (operationsStatus[1] && operationsStatus[2]) {
        setOptionsCompleted(true);
      } else {
        setOptionsCompleted(false);
      }
    }
  }, [currentOperation, operationsStatus]);

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.value);
  };

  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.value);
  };

  const showToastError = () => {
    toast.current.show({
      severity: "error",
      summary: "Operation incomplete",
      detail: "Please complete the current operation before proceeding.",
      life: 3000,
    });
  };

  const renderOperation = () => {
    // const currentStatus = operationsStatus[currentOperation];
    switch (currentOperation) {
      case 1:
        return (
          <div className="flex justify-evenly">
            <div className="text-center font-semibold">
              <label>Select Start Date</label>
              <div className="custom-datepicker mt-2">
                <Calendar
                  value={selectedStartDate}
                  onChange={handleStartDateChange}
                  showIcon
                  dateFormat="dd/mm/yy"
                  placeholder="Tap to select"
                  maxDate={new Date()}
                />
              </div>
            </div>
            <div className="text-center font-semibold">
              <label>Select End Date</label>
              <div className="custom-datepicker mt-2">
                <Calendar
                  value={selectedEndDate}
                  onChange={handleEndDateChange}
                  showIcon
                  dateFormat="dd/mm/yy"
                  placeholder="Tap to select"
                  maxDate={new Date()}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h1>Select End Date</h1>
            {/* Implement your End Date selection component here */}
          </div>
        );
      case 3:
        return (
          <div>
            <h1>Select Options</h1>
            {/* Implement your Options selection component here */}
          </div>
        );
      default:
        return null;
    }
  };

  const handleNextOperation = () => {
    if (currentOperation === 3) {
      if (optionsCompleted) {
        setCurrentOperation(1);
        showToast();
      } else {
        showToastError();
      }
    } else {
      setCurrentOperation(currentOperation + 1);
    }
  };

  const showToast = () => {
    toast.current.show({
      severity: "success",
      summary: "Process completed",
      detail: "You have finished the operations!",
      life: 3000,
    });
  };

  return (
    <>
      <div className="mt-8 flex flex-col items-center">
        <Toast ref={toast} />
        <div className="w-100 h-64 rounded-lg bg-gray-200 p-4 shadow-lg">
          <div className="mb-4 flex justify-center">{renderOperation()}</div>
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-opacity duration-500 hover:bg-blue-700"
            onClick={handleNextOperation}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Generate;
