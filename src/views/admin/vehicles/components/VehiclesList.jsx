import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
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
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const toast = useRef(null);
  // const dt = useRef(null);
  const [ecuData, setEcuData] = useState([]);
  const [selectedIot, setSelectedIot] = useState(null);
  const [selectedDms, setSelectedDms] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedEcu, setSelectedEcu] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const statusOptions = [
    { status: 1, label: "Active" },
    { status: 0, label: "Deactive" },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Vehicles/getAllVehicle")
      .then((res) => {
        setEcuData(res.data.data);
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

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
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

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
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

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  // const exportCSV = () => {
  //   dt.current.exportCSV();
  // };

  // const confirmDeleteSelected = () => {
  //   setDeleteProductsDialog(true);
  // };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Add Vehicle"
          icon="pi pi-plus"
          severity="Primary"
          className="h-10 px-5 py-0 dark:hover:text-white"
          onClick={openNew}
        />
        {/* <Button
          label="Delete"
          icon="pi pi-trash"
          className="h-10 px-5 py-0"
          severity="danger"
          title="Select to delete"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        /> */}
      </div>
    );
  };

  // const rightToolbarTemplate = () => {
  //   return (
  //     <Button
  //       label="Export"
  //       icon="pi pi-download"
  //       className="h-10 border-none bg-gray-600 px-5 py-0"
  //       onClick={exportCSV}
  //     />
  //   );
  // };

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
          onClick={() => editProduct(rowData)}
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
          className="text-red-500 dark:text-red-500"
          style={{ width: "2rem", height: "2rem" }}
          onClick={() => confirmDeleteProduct(rowData)}
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
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card rounded-lg bg-none dark:bg-gray-950">
        <Toolbar
          className="rounded-lg border-none dark:bg-gray-950"
          start={leftToolbarTemplate}
          // end={rightToolbarTemplate}
        >
          {leftToolbarTemplate}
        </Toolbar>

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
      {/* Add New Vehicle Form */}
      <Dialog
        visible={productDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Fill the details"
        modal
        className="p-fluid dark:bg-gray-900"
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="mb-2 font-bold">
            Vehicle Name
          </label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.name })}
            style={{ marginTop: "0.5rem" }}
          />
          {submitted && !product.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field mt-2">
          <label htmlFor="description" className="font-bold">
            Registration Number
          </label>
          <InputText
            id="description"
            className="mt-2"
            value={product.description}
            onChange={(e) => onInputChange(e, "description")}
            required
          />
        </div>

        <div className="dropdowns flex justify-between">
          <div className="field mt-2 w-[20vw]">
            <label htmlFor="ecu" className="font-bold">
              Select ECU
            </label>
            <Dropdown
              name="ecu"
              id="ecu"
              value={selectedEcu}
              options={ecuData}
              onChange={(e) => setSelectedEcu(e.value)}
              placeholder="Tap To Select"
              optionLabel="ecu"
              className="md:w-14rem mt-2 w-full"
            />
          </div>

          <div className="field mt-2 w-[20vw]">
            <label htmlFor="iot" className="font-bold">
              Select IoT
            </label>
            <Dropdown
              name="iot"
              id="iot"
              value={selectedIot}
              options={ecuData}
              onChange={(e) => setSelectedIot(e.value)}
              placeholder="Tap To Select"
              optionLabel="iot"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="dropdowns flex justify-between">
          <div className="field mt-2 w-[20vw]">
            <label htmlFor="dms" className="font-bold">
              Select DMS
            </label>
            <Dropdown
              name="dms"
              id="dms"
              value={selectedDms}
              options={ecuData}
              onChange={(e) => setSelectedDms(e.value)}
              placeholder="Tap To Select"
              optionLabel="dms"
              className="md:w-14rem mt-2 w-full"
            />
          </div>

          <div className="field mt-2 w-[20vw]">
            <label htmlFor="status" className="font-bold">
              Select Status
            </label>
            <Dropdown
              name="status"
              id="status"
              value={selectedStatus}
              options={statusOptions}
              onChange={(e) => setSelectedStatus(e.value)}
              placeholder="Tap To Select"
              optionLabel="label"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button
            label="Cancel"
            icon="pi pi-times"
            className="mx-2 h-9 border-none px-2 py-0"
            style={{ backgroundColor: "#444", width: "fit-content" }}
            onClick={hideDialog}
          />
          <Button
            label="Add Vehicle"
            className="h-9 border-none px-2 py-0"
            style={{ backgroundColor: "#422AFB", width: "fit-content" }}
            icon="pi pi-plus"
            onClick={saveProduct}
          />
        </div>
      </Dialog>

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
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
