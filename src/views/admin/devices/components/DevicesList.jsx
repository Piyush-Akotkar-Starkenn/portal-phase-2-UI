import React, { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

export default function DevicesList({ data }) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [editData, setEditData] = useState();
  const [listCustomers, setListCustomers] = useState([]);
  const [deviceData, setDeviceData] = useState();
  const [rowId, setRowId] = useState();
  const { updateData, updateFunc, resetState } = useContext(AppContext);

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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          style={{ width: "2rem", height: "2rem" }}
          onClick={() => openDialog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem" }}
          severity="danger"
          onClick={() => handleDelete(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = renderHeader();
  //handle Delete
  const handleDelete = (rowData) => {
    axios
      .put(
        `http://localhost:3001/api/Admin/Devices/delete-Device/${rowData?.device_id}`
      )
      .then((res) => {
        console.log(res);
        updateFunc();
        alert("Deleted successfully");
      })
      .catch((err) => {
        if (err.response.request.status === 404) {
          console.log(err.response.data.error);
        }
        if (err.response.request.status === 500) {
          console.log(err.response.data.error);
        }
      });
  };

  //edit device

  const openDialog = (rowData) => {
    setIsDialogVisible(true);
    getDeviceData(rowData);
    setRowId(rowData);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  const devicesOptions = [
    { label: "ECU", value: "ECU" },
    { label: "IoT", value: "IoT" },
    { label: "DMS", value: "DMS" },
  ];

  const stateOptions = [
    { label: "Active", value: "true" },
    { label: "Deactive", value: "false" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/api/Admin/Devices/update-Device/${rowId?.device_id}`,
        editData
      )
      .then((res) => {
        console.log(res.data.message);
        updateFunc();
        alert("Updated successfully");
        closeDialog();
      })
      .catch((err) => {
        if (err.response.data === 404) {
          console.log(err.response.data.error);
        }
        if (err.response.data === 500) {
          console.log(err.response.data.error);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Admin/Devices/get-customers")
      .then((res) => {
        console.log(res);
        setListCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deviceData]);

  const getDeviceData = (rowData) => {
    axios
      .get(
        `http://localhost:3001/api/Admin/Devices/get-Device/${rowData.device_id}`
      )
      .then((res) => {
        setDeviceData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Customersoptions = () => {
    return listCustomers?.map((el) => ({
      label: el.first_name,
      value: el.userId,
    }));
  };

  return (
    <div className="card">
      <Dialog
        visible={isDialogVisible}
        onHide={closeDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add the Device"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="flex justify-around">
            <div className="card justify-content-center mt-5 flex">
              <span className="p-float-label">
                <InputText
                  id="device_id"
                  name="device_id"
                  onChange={handleChange}
                  placeholder={deviceData?.device.device_id}
                />
                <label htmlFor="device_id">DeviceId</label>
              </span>
            </div>
            <div className="card justify-content-center mt-5 flex">
              <span className="p-float-label">
                <Dropdown
                  id="device_type"
                  name="device_type"
                  options={devicesOptions}
                  optionLabel="label"
                  optionValue="value"
                  placeholder={deviceData?.device.device_type}
                  className="p-dropdown"
                  onChange={handleChange}
                />
                <label htmlFor="device_type">Device_type</label>
              </span>
            </div>
          </div>

          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <Dropdown
                id="customer_id"
                name="customer_id"
                options={Customersoptions()}
                optionLabel="label"
                optionValue="value"
                className="p-dropdown"
                onChange={handleChange}
              />
              <label htmlFor="customer_id">Customer List</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <Dropdown
                id="status"
                name="status"
                options={stateOptions}
                optionLabel="label"
                optionValue="value"
                className="p-dropdown"
                placeholder={
                  deviceData?.device.status !== true ? "Active" : "Deactive"
                }
                onChange={handleChange}
              />{" "}
              <label htmlFor="status">Status</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="sim_number"
                name="sim_number"
                type="number"
                placeholder={deviceData?.device.sim_number}
                onChange={handleChange}
              />
              <label htmlFor="device_id">Sim Number</label>
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-[34.5vw] rounded bg-blue-600 px-4 py-2 font-semibold text-white  hover:bg-blue-600"
            >
              Edit Device
            </button>
          </div>
        </form>
      </Dialog>
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
          body={actionBodyTemplate}
          header="Action"
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "6rem" }}
        ></Column>
      </DataTable>
    </div>
  );
}
