import React, { useState, useEffect } from "react";
import axios from "axios";
import { FilterMatchMode } from "primereact/api";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { MdOnDeviceTraining } from "react-icons/md";

export default function DevicesGrid(onEditDevice, onDeleteDevice) {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [listCustomers, setListCustomers] = useState([]);
  const devicesOptions = [
    { label: "ECU", value: "ECU" },
    { label: "IoT", value: "IoT" },
    { label: "DMS", value: "DMS" },
  ];

  const stateOptions = [
    { label: "Active", value: "true" },
    { label: "Deactive", value: "false" },
  ];
  // const toastRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Admin/Devices/get-all-devices")
      .then((res) => {
        console.log(res.data.data.device);
        setAllData(res.data.data.device);

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Admin/Devices/get-customers")
      .then((res) => {
        setListCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Customersoptions = () => {
    return listCustomers?.map((el) => ({
      label: el.first_name,
      value: el.userId,
    }));
  };

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
                  onClick={() => openEditDialog(item)}
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
                  onClick={() => openDeleteDialog(item)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete Dialog
  const openDeleteDialog = (item) => {
    setSelectedDevice(item);
    setDeleteDialogVisible(true);
  };

  const DeleteDeviceDialog = ({ visible, onHide }) => {
    const handleConfirmDelete = async () => {
      try {
        // Call the onDeleteDevice prop to handle delete logic in the parent component
        await onDeleteDevice(selectedDevice.device_id);
        setDeleteDialogVisible(false);
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <Dialog
        visible={visible}
        onHide={onHide}
        header="Confirm Delete"
        modal
        footer={
          <div>
            <Button
              label="Delete"
              icon="pi pi-times"
              className="p-button-danger px-3 py-2 hover:bg-none dark:hover:bg-gray-50"
              onClick={handleConfirmDelete}
            />
            <Button
              label="Cancel"
              icon="pi pi-check"
              className="p-button-secondary px-3 py-2 hover:bg-none dark:hover:bg-gray-50"
              onClick={() => setDeleteDialogVisible(false)}
            />
          </div>
        }
      >
        Are you sure you want to delete {selectedDevice?.device_id}??
      </Dialog>
    );
  };

  // Edit Dialog
  const openEditDialog = (rowData) => {
    setSelectedDevice(rowData);
    setEditData(rowData);
    setEditDialogVisible(true);
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      // Call the onEditDevice prop to handle edit logic in the parent component
      await onEditDevice(editData.device_id, editData);
      setEditDialogVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const EditDeviceDialog = ({ visible, onHide }) => {
    return (
      <Dialog
        visible={visible}
        onHide={onHide}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit the Device"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <form onSubmit={handleEditSubmit} className="mx-auto">
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="device_id"
                name="device_id"
                onChange={(e) => handleChange(e, "device_id")}
                value={editData?.device_id || ""}
              />
              <label htmlFor="device_id">DeviceId</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <Dropdown
                id="device_type"
                name="device_type"
                options={devicesOptions}
                optionLabel="label"
                optionValue="value"
                value={editData?.device_type || ""}
                placeholder={selectedDevice?.device_type}
                className="p-dropdown"
                onChange={(e) => handleChange(e, "device_type")}
              />
              <label htmlFor="device_type">Device_type</label>
            </span>
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
                value={editData?.customer_id || ""}
                onChange={(e) => handleChange(e, "customer_id")}
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
                value={editData?.status || ""}
                placeholder={selectedDevice?.status}
                onChange={(e) => handleChange(e, "status")}
              />
              <label htmlFor="status">Status</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="sim_number"
                name="sim_number"
                keyfilter="pint"
                value={editData?.sim_number || ""}
                placeholder={selectedDevice?.sim_number}
                onChange={(e) => handleChange(e, "sim_number")}
              />
              <label htmlFor="sim_number">Sim Number</label>
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Edit Device
            </button>
          </div>
        </form>
      </Dialog>
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

      {/* Add the delete dialog component */}
      <DeleteDeviceDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
      />

      {/* Add the edit dialog component */}
      <EditDeviceDialog
        visible={editDialogVisible}
        onHide={() => setEditDialogVisible(false)}
      />
    </div>
  );
}
