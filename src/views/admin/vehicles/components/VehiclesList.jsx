import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import { TabView, TabPanel } from "primereact/tabview";
import axios from "axios";

export default function VehiclesList() {
  let emptyProduct = {
    vehicle_name: "",
    vehicle_registration: "",
    dms: "",
    iot: "",
    ecu: "",
    status: "",
  };

  const [products, setProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [editingEnabled, setEditingEnabled] = useState(false);

  // Function to toggle editing mode
  const toggleEditingMode = () => {
    setEditingEnabled((prevEditingEnabled) => !prevEditingEnabled);
  };
  useEffect(() => {
    if (!visible) {
      setEditingEnabled(false);
    }
  }, [visible]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Vehicles/getAllVehicle")
      .then((res) => {
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

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearSearch = () => {
    setGlobalFilterValue("");
    const _filters = { ...filters };
    _filters["global"].value = null;
    setFilters(_filters);
  };

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
          className="mr-2 dark:text-gray-100"
          style={{ width: "2rem", height: "2rem" }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="mr-2 text-red-500 dark:text-red-500"
          style={{ width: "2rem", height: "2rem" }}
          onClick={() => confirmDeleteProduct(rowData)}
        />
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          className="text-red-500 dark:text-blue-500"
          style={{ width: "2rem", height: "2rem" }}
          onClick={() => setVisible(true)}
        />
      </React.Fragment>
    );
  };

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

  const header = (
    <div className="align-items-center flex flex-wrap justify-end gap-2 py-3 dark:bg-gray-950">
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
  );

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
      <Toast ref={toast} />
      <div className="card mt-4 rounded-lg bg-none dark:bg-gray-950">
        <DataTable
          removableSort
          value={data}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          filterDisplay="menu"
          filters={filters}
          globalFilterFields={[
            "vehicle_name",
            "vehicle_registration",
            "dms",
            "iot",
            "ecu",
          ]}
          emptyMessage="No vehicles found."
          header={header}
        >
          <Column
            field="serialNo"
            className="border-none dark:bg-gray-900 dark:text-gray-200"
            style={{ minWidth: "4rem", textAlign: "center" }}
          ></Column>
          <Column
            field="vehicle_name"
            header="Vehicle Name"
            sortable
            className="border-none dark:bg-gray-900 dark:text-gray-200"
            style={{ minWidth: "10rem", border: "none !important" }}
          ></Column>

          <Column
            field="vehicle_registration"
            header="Registration No."
            sortable
            className="border-none dark:bg-gray-900 dark:text-gray-200"
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="dms"
            header="DMS"
            sortable
            className="border-none dark:bg-gray-900 dark:text-gray-200"
            style={{ minWidth: "9rem" }}
          ></Column>
          <Column
            field="iot"
            header="IoT"
            sortable
            className="border-none dark:bg-gray-900 dark:text-gray-200"
            style={{ minWidth: "9rem" }}
          ></Column>
          <Column
            field="ecu"
            header="ECU"
            sortable
            className="border-none dark:bg-gray-900 dark:text-gray-200"
            style={{ minWidth: "9rem" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            className="border-none dark:bg-gray-900 dark:text-gray-200"
            style={{ minWidth: "7rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            header="Action"
            exportable={false}
            className="border-none dark:bg-gray-900"
            style={{ minWidth: "6rem" }}
          ></Column>
        </DataTable>
      </div>

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
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
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
            <DataTable
              removableSort
              value={data}
              selection={selectedProducts}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="id"
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              filterDisplay="menu"
              filters={filters}
              globalFilterFields={[
                "vehicle_name",
                "vehicle_registration",
                "dms",
                "iot",
                "ecu",
              ]}
              emptyMessage="No vehicles found."
              header={header}
            >
              <Column
                field="serialNo"
                className="border-none dark:bg-gray-900 dark:text-gray-200"
                style={{ minWidth: "4rem", textAlign: "center" }}
              ></Column>
              <Column
                field="vehicle_name"
                header="Vehicle Name"
                sortable
                className="border-none dark:bg-gray-900 dark:text-gray-200"
                style={{ minWidth: "10rem", border: "none !important" }}
              ></Column>

              <Column
                field="vehicle_registration"
                header="Registration No."
                sortable
                className="border-none dark:bg-gray-900 dark:text-gray-200"
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="dms"
                header="DMS"
                sortable
                className="border-none dark:bg-gray-900 dark:text-gray-200"
                style={{ minWidth: "9rem" }}
              ></Column>
              <Column
                field="iot"
                header="IoT"
                sortable
                className="border-none dark:bg-gray-900 dark:text-gray-200"
                style={{ minWidth: "9rem" }}
              ></Column>
              <Column
                field="ecu"
                header="ECU"
                sortable
                className="border-none dark:bg-gray-900 dark:text-gray-200"
                style={{ minWidth: "9rem" }}
              ></Column>
              <Column
                field="status"
                header="Status"
                body={statusBodyTemplate}
                sortable
                className="border-none dark:bg-gray-900 dark:text-gray-200"
                style={{ minWidth: "7rem" }}
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel header="Feature Set" leftIcon="pi pi-cog mr-2">
            <div className="mb-2 flex justify-end">
              {/* Toggler for enabling/disabling editing */}
              <Button
                icon={editingEnabled ? "pi pi-lock-open" : "pi pi-lock"}
                className={`p-button-rounded p-button-text ${
                  editingEnabled ? "p-button-success" : "p-button-danger"
                }`}
                onClick={toggleEditingMode}
              />
            </div>
            <form>
              <div className="card">
                <div className="flex" style={{ flexDirection: "column" }}>
                  <label htmlFor="username">Feature Set ID*</label>
                  <InputText
                    id="username"
                    aria-describedby="username-help"
                    disabled
                    style={{
                      width: "63vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    value="Demo ID"
                  />
                  <small id="username-help">
                    Unique id to identify feature set
                  </small>
                </div>

                <div className="mt-2 flex" style={{ flexDirection: "column" }}>
                  <label htmlFor="username">Feature Set Name*</label>
                  <InputText
                    id="username"
                    aria-describedby="username-help"
                    disabled
                    style={{
                      width: "63vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    value="Demo Name"
                  />
                  <small id="username-help">
                    Unique id to identify feature set
                  </small>
                </div>
                <p className="mt-4 font-bold ">System Type</p>
                <div className="my-3 flex flex-wrap gap-3">
                  <div className="align-items-center flex">
                    <RadioButton
                      inputId="ingredient1"
                      name="offline"
                      value="Offline"
                      disabled={!editingEnabled}
                    />
                    <label htmlFor="ingredient1" className="ml-2">
                      Offline Mode
                    </label>
                  </div>
                  <div className="align-items-center flex">
                    <RadioButton
                      inputId="ingredient2"
                      name="online"
                      value="Online"
                      disabled={!editingEnabled}
                    />
                    <label htmlFor="ingredient2" className="ml-2">
                      Online Mode
                    </label>
                  </div>
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <div className="field my-3 w-[63vw]">
                <label htmlFor="ecu">Version*</label>
                <Dropdown
                  name="ecu"
                  id="ecu"
                  style={{
                    width: "63vw",
                    borderBottom: "1px dashed #ced4da",
                    borderRadius: "0px",
                    padding: "0.30px",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTop: "none",
                  }}
                  disabled={!editingEnabled}
                  placeholder="Tap To Select"
                  optionLabel="ecu"
                  className="md:w-14rem mt-2 w-full"
                />
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Collision Avoidance System</p>
              <div className="card justify-content-center mt-5 flex gap-4">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Activation Speed</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="10"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Alarm Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="1.5"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Brake Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0.4"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Brake Speed</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="40"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[63vw]">
                  <label htmlFor="ecu">Detect Stationary Object</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="No"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Allow Complete Brake</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="No"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[63vw]">
                  <label htmlFor="ecu">Detect Oncoming Obstacle</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="No"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Safety Mode</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="Normal"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">TTC Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="175"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Brake ON Duration</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="1000"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Brake OFF Duration</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="1000"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Start Time</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="12"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Stop Time</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="12"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Sleep Alert</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Pre Warning</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="5"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Sleep Alert Interval</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="60"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Activation Speed</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="40"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Start Time</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="23"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Stop Time</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="6"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Brake Activate Time</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Braking</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="No"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Driver Evaluation</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Max Lane Change Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0.35"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Min Lane Change Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="-0.35"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Max Harsh Acceleration Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0.25"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Min Harsh Acceleration Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Sudden Braking Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="-0.4"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Max Speed Bump Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0.5"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Min Speed Bump Threshold</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="10"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Speed Governor</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Speed Limit</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="100"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Cruise</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <div className="field my-3 w-[30vw]">
                <label htmlFor="ecu">Speed Limit</label>
                <input
                  type="number"
                  id="username"
                  aria-describedby="username-help"
                  disabled={!editingEnabled}
                  style={{
                    width: "30vw",
                    borderBottom: "1px dashed #ced4da",
                    borderRadius: "0px",
                    padding: "0.30px",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTop: "none",
                  }}
                  placeholder="100"
                />
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Vehicle Type</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="12V Pedal"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">OBD</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Protocol Type</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="SAE J1393"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">TPMS</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Vehicle Settings</p>

              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Accelerator Type</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="Sensor"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Sensor</p>
              <p className="mt-4 font-bold ">Laser Sensor</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <p className="mt-4 font-bold ">RF Sensor</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">RF Angle</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Activation Speed</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Reserved 1</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Reserved 2</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Speed Settings</p>

              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Speed Source</label>
                  <Dropdown
                    name="ecu"
                    id="ecu"
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    disabled={!editingEnabled}
                    placeholder="Speed Wire"
                    optionLabel="ecu"
                    className="md:w-14rem mt-2 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Slope</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0.51"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Offset</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="4.08"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Shutdown Delay</p>
              <div className="field my-3 w-[30vw]">
                <label htmlFor="ecu">Delay</label>
                <input
                  type="number"
                  id="username"
                  aria-describedby="username-help"
                  disabled={!editingEnabled}
                  style={{
                    width: "30vw",
                    borderBottom: "1px dashed #ced4da",
                    borderRadius: "0px",
                    padding: "0.30px",
                    borderRight: "none",
                    borderLeft: "none",
                    borderTop: "none",
                  }}
                  placeholder="30"
                />
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">RF Name</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Disable
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Enable
                  </label>
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Time Based Errors</p>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">No Alarm</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Speed</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Acceleration Bypass</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">TPMS</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Speed Based Errors</p>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">RF Sensor Absent</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="100"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Gyroscope Absent</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">HMI Absent</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="100"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Time Not Set</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Brake Error</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">TPMS Error</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">OBD Absent</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">No Alarm</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Laser Sensor Absent</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">RFID Absent</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">IOT Absent</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Accessory Board</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">DD Module Disconnected</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="60"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Alcohol Sensor Disconnected</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Temperature Sensor Disconnected</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <hr style={{ borderColor: "#333" }} />
              <p className="mt-4 font-bold ">Firmware OTA Update</p>
              <div className="my-3 flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="offline"
                    value="Offline"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Not Available
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="online"
                    value="Online"
                    disabled={!editingEnabled}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Available
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Reserved 1</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="field my-3 w-[30vw]">
                  <label htmlFor="ecu">Reserved 2</label>
                  <input
                    type="number"
                    id="username"
                    aria-describedby="username-help"
                    disabled={!editingEnabled}
                    style={{
                      width: "30vw",
                      borderBottom: "1px dashed #ced4da",
                      borderRadius: "0px",
                      padding: "0.30px",
                      borderRight: "none",
                      borderLeft: "none",
                      borderTop: "none",
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
            </form>
          </TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
}
