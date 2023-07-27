import React, { useState, useEffect } from "react";
import DevicesList from "./components/DevicesList";
import DevicesGrid from "./components/DevicesGrid";
import { BsGrid, BsListUl } from "react-icons/bs";
import { Button } from "primereact/button";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

const DevicesAdmin = () => {
  const [data, setData] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [addData, setAddData] = useState();
  const [listCustomers, setListCustomers] = useState([]);
  const { updateData, resetState } = useContext(AppContext);

  useEffect(() => {
    fetchDevicesData();
  }, []);

  useEffect(() => {
    if (updateData === true) {
      fetchDevicesData();
    }
  }, [updateData]);

  //Fetching all data
  const fetchDevicesData = () => {
    axios
      .get("http://localhost:3001/api/Admin/Devices/get-all-devices")
      .then((res) => {
        const formattedData = res.data.data.device.map((item, index) => ({
          ...item,
          serialNo: index + 1,
        }));
        setData(formattedData);
        resetState();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleListView = () => {
    setIsListView(true);
  };

  const handleGridView = () => {
    setIsListView(false);
  };

  const openDialog = () => {
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  ///Device Add Page

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
    console.log(Object.keys(addData).length);
    if (Object.keys(addData).length == 5) {
      axios
        .post("http://localhost:3001/api/Admin/Devices/add-Device", addData)
        .then((res) => {
          console.log(res);
          fetchDevicesData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Fill all input fields");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value });
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
  }, []);

  const Customersoptions = () => {
    return listCustomers?.map((el) => ({
      label: el.first_name,
      value: el.userId,
    }));
  };

  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-dark text-xl font-bold dark:text-white">Devices</h4>
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
                Add Device
              </button>
            </div>
          </form>
        </Dialog>
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
        onClick={openDialog}
      />
      {!isListView && <DevicesGrid data={data} />}
      {isListView && (
        <div className="opacity-100 transition-opacity duration-500">
          <DevicesList data={data} />
        </div>
      )}
    </>
  );
};

export default DevicesAdmin;
