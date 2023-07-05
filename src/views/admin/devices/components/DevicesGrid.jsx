import React, { useState, useEffect } from "react";
import axios from "axios";
import { FilterMatchMode } from "primereact/api";
import { DataView } from "primereact/dataview";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MdOnDeviceTraining } from "react-icons/md";

export default function DevicesGrid() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const getSeverity = (data) => {
    switch (data.status) {
      case "1":
        return "success";
      case "0":
        return "danger";
      default:
        return null;
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Devices/get-all-devices")
      .then((res) => {
        console.log(res.data.data.devices);
        setAllData(res.data.data.devices);

        const formattedData = res.data.data.devices.map((item, index) => ({
          ...item,
          serialNo: index + 1,
        }));
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
    applyFilters(_filters); // Apply filters after global search value changes
  };

  const clearSearch = () => {
    setGlobalFilterValue("");
    const _filters = { ...filters };
    _filters["global"].value = null;
    setFilters(_filters);
    applyFilters(_filters); // Apply filters after clearing search
  };

  const applyFilters = (filters) => {
    let filteredData = allData;
    if (filters.global.value) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((value) =>
          String(value)
            .toLowerCase()
            .includes(filters.global.value.toLowerCase())
        )
      );
    }
    if (filters.device_type.value) {
      filteredData = filteredData.filter((item) =>
        filters.device_type.value.includes(item.device_type)
      );
    }
    setData(filteredData);
  };

  const itemTemplate = (item) => {
    return (
      <div className="p-col-11 mb-6 rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-150">
        <div className="card">
          <div className="card-body px-6 py-3">
            <div className="flex items-center justify-end">
              <div>
                <Tag
                  value={
                    parseInt(item.status) === 1
                      ? "Active"
                      : parseInt(item.status) === 0
                      ? "Deactive"
                      : undefined
                  }
                  severity={getSeverity(item)}
                ></Tag>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="mt-4 flex justify-between font-semibold">
                  <div className="mr-16">
                    <span>Device ID</span>
                  </div>
                  <div>
                    <span>{item.device_id}</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold ">
                  <div className="mr-16">
                    <span>Device Type</span>
                  </div>
                  <div>
                    <span>{item.device_type}</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold ">
                  <div className="mr-16">
                    <span>Customer ID</span>
                  </div>
                  <div>
                    <span>{item.customer_id}</span>
                  </div>
                </div>
                <div className="text-bold flex justify-between font-semibold ">
                  <div className="mr-16">
                    <span>Sim Number</span>
                  </div>
                  <div>
                    <span>{item.sim_number}</span>
                  </div>
                </div>
              </div>
              <div>
                <MdOnDeviceTraining className="text-6xl text-gray-500" />
              </div>
            </div>
            <div className="mt-4 flex justify-end rounded">
              <div>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-text mr-2"
                  style={{
                    borderColor: "#6E70F2",
                    width: "2.2rem",
                    height: "2.2rem",
                  }}
                />
                <Button
                  icon="pi pi-trash"
                  rounded
                  outlined
                  style={{
                    borderColor: "#F18080",
                    width: "2.2rem",
                    height: "2.2rem",
                  }}
                  className="p-button-rounded p-button-text p-button-danger"
                />
              </div>
            </div>
            {/* <div className="p-mt-2">
              <span className="font-bold">Device Type:</span> {item.device_type}
            </div>
            <div>
              <span className="font-bold">Customer ID:</span> {item.customer_id}
            </div>
            <div>
              <span className="font-bold">Sim Number:</span> {item.sim_number}
            </div>
            <div>
              <span className="font-bold">Status:</span>{" "}
              <Tag
                value={
                  parseInt(item.status) === 1
                    ? "Active"
                    : parseInt(item.status) === 0
                    ? "Deactive"
                    : undefined
                }
                severity={getSeverity(item)}
              ></Tag>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="my-4 mr-7  flex justify-end">
        <div className="justify-content-between align-items-center flex flex-wrap gap-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
              className="searchbox w-[25vw] cursor-pointer rounded-full dark:bg-gray-950 dark:text-gray-50"
            />
            {globalFilterValue && (
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-text"
                onClick={clearSearch}
              />
            )}
          </span>
        </div>
      </div>

      <DataView
        value={data}
        layout="grid"
        itemTemplate={itemTemplate}
        paginator
        rows={6}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        emptyMessage="No devices found."
      />
    </div>
  );
}
