import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

const AnalyticsThreshold = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const toastRef = useRef(null);
  const toastErr = useRef(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Admin/AnalyticsThreshold/GetCustomers-AT")
      .then((response) => {
        // Assuming the API returns an object with 'data' property containing the array of customers
        if (response.data && Array.isArray(response.data.data)) {
          setCustomers(response.data.data);
        } else {
          console.error("Invalid API response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const customerOptions = customers.map((customer) => ({
    label: `${customer.first_name} ${customer.last_name}`,
    value: customer.userId,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      title: event.target.elements["username"]?.value,
      customer_id: selectedCustomer,
      brake: event.target.elements["brake-input"]?.value,
      tailgating: event.target.elements["tailgating-input"]?.value,
      rash_driving: event.target.elements["rash-driving-input"]?.value,
      sleep_alert: event.target.elements["sleep-alert-input"]?.value,
      over_speed: event.target.elements["over-speed-input"]?.value,
      green_zone: event.target.elements["green-zone-input"]?.value,
      minimum_distance: event.target.elements["minimum-distance-input"]?.value,
      minimum_driver_rating:
        event.target.elements["minimum-driver-rating-input"]?.value,
      ttc_difference_percentage:
        event.target.elements["ttc-difference-percentage-input"]?.value,
      total_distance: event.target.elements["total-distance-input"]?.value,
      duration: event.target.elements["halt-duration-input"]?.value,
    };

    // Send the data to the API endpoint using axios
    axios
      .post(
        "http://localhost:3001/api/Admin/AnalyticsThreshold/AddAnalytics",
        formData
      )
      .then((response) => {
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "User Added successfully",
          life: 3000,
        });
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail:
            error.response?.data?.message ||
            "An error occurred. Please try again later.",
          life: 3000,
        });
        console.error("Error saving data:", error);
      });
  };

  return (
    <>
      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      <Toast ref={toastErr} className="bg-red-400" />
      <h4 className="text-dark text-xl font-bold dark:text-white">
        Analytics Threshold
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="mt-12 flex justify-between">
          <div className="mb-6 w-[42vw]">
            <span className="p-float-label">
              <InputText
                name="username"
                className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 py-3.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-50 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <label
                htmlFor="username"
                className="text-gray-150 dark:text-gray-150"
              >
                Title
              </label>
            </span>
          </div>
          <div className="mb-6">
            <span className="p-float-label">
              <Dropdown
                value={selectedCustomer}
                options={customerOptions}
                onChange={(e) => setSelectedCustomer(e.value)}
                className="w-[42vw] rounded-lg border border-gray-300 bg-gray-50 py-0 shadow-sm"
                optionLabel="label"
              />
              <label htmlFor="dd-city">Select a customer</label>
            </span>
          </div>
        </div>
        <div className="mb-6">
          <p className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
            Weightage
          </p>
          <div className="card p-fluid mt-6 flex flex-wrap gap-3">
            <div className="flex-auto">
              <span className="p-float-label">
                <InputText
                  name="brake-input"
                  keyfilter="pint"
                  title="(1-1000)"
                />
                <label
                  htmlFor="brake-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Brake
                </label>
              </span>
            </div>
            <div className="flex-auto">
              <span className="p-float-label">
                <InputText
                  name="tailgating-input"
                  keyfilter="pint"
                  title="(1-1000)"
                />
                <label
                  htmlFor="tailgating-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Tailgating
                </label>
              </span>
            </div>
            <div className="flex-auto">
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="rash-driving-input"
                  title="(1-1000)"
                />
                <label
                  htmlFor="rash-driving-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Rash Driving
                </label>
              </span>
            </div>
          </div>
          <div className="card p-fluid mt-6 flex flex-wrap gap-3">
            <div className="flex-auto">
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="sleep-alert-input"
                  title="(1-1000)"
                />
                <label
                  htmlFor="sleep-alert-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Sleep Alert
                </label>
              </span>
            </div>
            <div className="flex-auto">
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="over-speed-input"
                  title="(1-1000)"
                />
                <label
                  htmlFor="over-speed-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Over Speed
                </label>
              </span>
            </div>
            <div className="flex-auto">
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="green-zone-input"
                  title="(1-1000)"
                />
                <label
                  htmlFor="green-zone-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Green Zone
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <p className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
            Incentive
          </p>
          <div className="card p-fluid mt-6 flex flex-wrap gap-3">
            <div className="w-[390px]">
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="minimum-distance-input"
                  title="(1-1000)"
                />
                <label
                  htmlFor="minimum-distance-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Minimum Distance
                </label>
              </span>
            </div>
            <div className="w-[390px]">
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="minimum-driver-rating-input"
                  title="(0-5)"
                />
                <label
                  htmlFor="minimum-driver-rating-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Minimum Driver Rating
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <p className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
            Accident
          </p>
          <div className="card p-fluid mt-6 flex flex-wrap gap-3">
            <div className="w-[390px]">
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="ttc-difference-percentage-input"
                  title="(0-100)"
                />
                <label
                  htmlFor="ttc-difference-percentage-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  TTC Difference Percentage
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <p className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
            Leadership Board
          </p>
          <div className="card p-fluid mt-6 flex flex-wrap gap-3">
            <div className="w-[390px]">
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="total-distance-input"
                  title="(0-10000)"
                />
                <label
                  htmlFor="total-distance-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Total Distance
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <p className="mb-2 block text-sm font-medium text-gray-600 dark:text-white">
            Halt
          </p>
          <div className="card p-fluid mt-6 flex flex-wrap gap-3">
            <div>
              <span className="p-float-label">
                <InputText
                  keyfilter="pint"
                  name="halt-duration-input"
                  title="(1-1000)"
                />
                <label
                  htmlFor="halt-duration-input"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Duration
                </label>
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AnalyticsThreshold;
