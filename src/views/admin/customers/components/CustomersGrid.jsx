import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
const applyFilters = (filters, allData) => {
  let filteredData = allData;

  if (filters.global.value) {
    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filters.global.value.toLowerCase())
      )
    );
  }

  return filteredData;
};
export default function CustomersGrid({ data }) {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    setAllData(data);
    const filteredData = applyFilters(filters, data);
    setFilteredData(filteredData);
  }, [data, filters]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    const updatedFilters = {
      ...filters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    };
    const filteredData = applyFilters(updatedFilters, allData);
    setFilters(updatedFilters);
    setFilteredData(filteredData);
  };

  const clearSearch = () => {
    setGlobalFilterValue("");
    const updatedFilters = {
      ...filters,
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
    const filteredData = applyFilters(updatedFilters, allData);
    setFilters(updatedFilters);
    setFilteredData(filteredData);
  };

  const itemTemplate = (item) => {
    return (
      <div className="p-col-11 w-95 mb-6 rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-150">
        <div className="card flex h-full flex-col">
          <div className="card-body px-6 py-3">
            <div className="mt-4 flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Full Name</span>
              </div>
              <div>
                <span>{item.full_name}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Email</span>
              </div>
              <div>
                <span>{item.email}</span>
              </div>
            </div>
            <div className="flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Address</span>
              </div>
              <div className="text-end">
                <span>{item.address}</span>
              </div>
            </div>
            <div className="flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Company Name</span>
              </div>
              <div>
                <span>{item.company_name}</span>
              </div>
            </div>
            <div className="text-bold flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Contact No.</span>
              </div>
              <div>
                <span>{item.phone}</span>
              </div>
            </div>
          </div>
          <div className="mt-auto px-6 py-3">
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
        value={filteredData}
        layout="grid"
        itemTemplate={itemTemplate}
        paginator
        rows={6}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        emptyMessage="No customers found."
      />
    </div>
  );
}
