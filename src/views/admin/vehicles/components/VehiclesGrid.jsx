import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FilterMatchMode } from "primereact/api";
import { DataView } from "primereact/dataview";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { GiMineTruck } from "react-icons/gi";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import VehicleTrips from "./VehicleTrips";
import FeatureSet from "./FeatureSet";

export default function VehiclesGrid() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const totalItems = data.length;
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const toast = useRef(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  let emptyProduct = {
    id: null,
    vehicle_name: "",
    vehicle_registration: "",
    dms: "",
    iot: "",
    ecu: "",
    status: "",
  };
  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState(null);
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
      .get(`${process.env.REACT_APP_API_URL}/Customers/Vehicles/getAllVehicle`)
      .then((res) => {
        setAllData(res.data.data);

        const formattedData = res.data.data.map((item, index) => ({
          ...item,
          serialNo: index + 1,
        }));
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
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
      <div className="p-col-12 vehicle-card mb-6 rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-150">
        <div className="card">
          <div className="card-header">
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
          </div>
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <div className="mt-4 flex justify-between font-semibold">
                  <div className="mr-auto">
                    <span>Vehicle Name</span>
                  </div>
                  <div>
                    <span className="px-2 font-normal">
                      {item.vehicle_name}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold ">
                  <div className="mr-auto">
                    <span>Registration No.</span>
                  </div>
                  <div className=" text-end">
                    <span className="px-2 font-normal">
                      {item.vehicle_registration}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold ">
                  <div className="mr-auto">
                    <span>DMS</span>
                  </div>
                  <div>
                    <span className="px-2 font-normal">{item.dms}</span>
                  </div>
                </div>
                <div className="text-bold flex justify-between font-semibold ">
                  <div className="mr-auto">
                    <span>IoT</span>
                  </div>
                  <div>
                    <span className="px-2 font-normal">{item.iot}</span>
                  </div>
                </div>
                <div className="text-bold flex justify-between font-semibold ">
                  <div className="mr-auto">
                    <span>ECU</span>
                  </div>
                  <div>
                    <span className="px-2 font-normal">{item.ecu}</span>
                  </div>
                </div>
              </div>
              <div>
                <GiMineTruck
                  className="text-red-450 dark:text-red-550"
                  style={{
                    fontSize: "4rem",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-actions">
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
                onClick={() => confirmDeleteProduct()}
                className="p-button-rounded p-button-text p-button-danger"
              />
              <Button
                icon="pi pi-eye"
                rounded
                outlined
                className="text-red-500 dark:text-blue-500"
                style={{ width: "2rem", height: "2rem" }}
                onClick={() => setVisible(true)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        outlined
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
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
        emptyMessage="No vehicles found."
      />
      <p className="text-center text-gray-700">Total Items : {totalItems}</p>
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            <b>Are you sure you want to delete?</b>?
          </span>
        </div>
      </Dialog>
      <Dialog
        header="Vehicle Details"
        visible={visible}
        style={{ width: "70vw" }}
        onHide={() => setVisible(false)}
      >
        <TabView>
          <TabPanel header="Vehicle's Trips" leftIcon="pi pi-truck mr-2">
            <VehicleTrips />
          </TabPanel>
          <TabPanel header="Feature Set" leftIcon="pi pi-cog mr-2">
            <FeatureSet />
          </TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
}
