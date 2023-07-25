import React, { useState, useEffect } from "react";
import axios from "axios";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";

export default function DevicesList() {
  // eslint-disable-next-line
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
      .get("http://localhost:3001/api/Admin/Devices/get-all-devices")
      .then((res) => {
        const formattedData = res.data.data.device.map((item, index) => ({
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
  };

  const clearSearch = () => {
    setGlobalFilterValue(""); // Clear the search input value
    const _filters = { ...filters };
    _filters["global"].value = null; // Clear the global filter value
    setFilters(_filters);
  };

  const renderHeader = () => {
    return (
      <div className="my-4 flex justify-end">
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
    );
  };

  const deviceTypeOptions = [
    ...new Set(data.map((item) => item.device_type)),
  ].map((deviceType) => ({
    label: deviceType,
    value: deviceType,
  }));

  console.log(deviceTypeOptions);
  const representativeFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <div className="mb-3 font-bold dark:text-white">Device Type</div>
        <MultiSelect
          value={options.value}
          options={deviceTypeOptions}
          onChange={(e) => options.filterCallback(e.value)}
          optionLabel="label"
          placeholder="Any"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="align-items-center flex gap-2">
        <p>hii</p>
        <span>{option}</span>
        <p>{option.device_type}</p>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        className="px-3"
        value={
          parseInt(rowData.status) === 1
            ? "Active"
            : parseInt(rowData.status) === 0
            ? "Deactive"
            : undefined
        }
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          style={{ width: "2rem", height: "2rem" }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem" }}
          severity="danger"
        />
      </React.Fragment>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={data}
        removableSort
        paginator
        header={header}
        rows={5}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 25]}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={[
          "vehicle_name",
          "vehicle_id",
          "device_type",
          "sim_number",
          "customer_id",
        ]}
        emptyMessage="No devices found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column
          field="serialNo"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "4rem", textAlign: "center" }}
        ></Column>
        <Column
          field="device_id"
          header="Device ID"
          sortable
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="device_type"
          header="Device Type"
          sortField="device_type"
          filterField="device_type"
          showFilterMatchModes={false}
          filterMenuStyle={{ width: "14rem" }}
          filter
          filterElement={representativeFilterTemplate}
          filterHeaderClassName="p-text-center"
          filterMatchMode="in"
          filterOptions={deviceTypeOptions}
          filterItemTemplate={representativesItemTemplate}
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="customer_id"
          header="Customer ID"
          sortable
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="sim_number"
          header="Sim Number"
          sortable
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          body={actionBodyTemplate}
          header="Action"
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "6rem" }}
        ></Column>
      </DataTable>
    </div>
  );
}
