import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

const DevicesList = () => {
  let emptyProduct = {
    device_id: "",
    device_type: "",
    customer_id: "",
    sim_number: "",
    status: "null",
  };
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);

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
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const deviceTypeOptions = [...new Set(data.map((item) => item.device_type))];

  const deviceTypeFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={deviceTypeOptions}
        onChange={(e) => {
          setGlobalFilter(e.target.value);
          setFilters({
            ...filters,
            device_type: {
              value: e.target.value,
              matchMode: FilterMatchMode.EQUALS,
            },
          });
        }}
        placeholder="Select a device type"
        className="p-column-filter"
      />
    );
  };

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

  const editProduct = (data) => {
    setProduct({ ...data });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (data) => {
    setProduct(data);
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

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

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

  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product["category"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
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
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem" }}
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (data) => {
    switch (data.status) {
      case "0":
        return "success";

      case "1":
        return "warning";

      default:
        return null;
    }
  };

  const header = (
    <div className="align-items-center flex flex-wrap justify-end gap-2 py-3 dark:bg-gray-950">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-[25vw] cursor-pointer rounded-full dark:bg-gray-950 dark:text-gray-50"
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
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
    <>
      <div>
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="rounded-lg border-none dark:bg-gray-950"
            start={leftToolbarTemplate}
          ></Toolbar>

          <DataTable
            removableSort
            value={data}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
            filters={filters}
          >
            <Column
              selectionMode="multiple"
              className="dark:bg-gray-900 dark:text-gray-200"
            ></Column>
            <Column
              field="serialNo"
              header="#"
              className="border-none dark:bg-gray-900 dark:text-gray-200"
              style={{ minWidth: "4rem" }}
            ></Column>
            <Column
              field="device_id"
              header="Device ID"
              sortable
              className="dark:bg-gray-900 dark:text-gray-200"
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="device_type"
              header="Device Type"
              sortable
              filter
              showFilterMatchModes={false}
              filterElement={deviceTypeFilterTemplate}
              className="dark:bg-gray-900 dark:text-gray-200"
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="customer_id"
              header="Customer ID"
              sortable
              className="dark:bg-gray-900 dark:text-gray-200"
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="sim_number"
              header="Sim Number"
              className="dark:bg-gray-900 dark:text-gray-200"
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              header="Action"
              className="dark:bg-gray-900 dark:text-gray-200"
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={productDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Product Details"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <InputText
              id="name"
              value={allData.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !product.name,
              })}
            />
            {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <InputTextarea
              id="description"
              value={product.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
            />
          </div>

          <div className="field">
            <label className="mb-3 font-bold">Category</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category1"
                  name="category"
                  value="Accessories"
                  onChange={onCategoryChange}
                  checked={product.category === "Accessories"}
                />
                <label htmlFor="category1">Accessories</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="category"
                  value="Clothing"
                  onChange={onCategoryChange}
                  checked={product.category === "Clothing"}
                />
                <label htmlFor="category2">Clothing</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category3"
                  name="category"
                  value="Electronics"
                  onChange={onCategoryChange}
                  checked={product.category === "Electronics"}
                />
                <label htmlFor="category3">Electronics</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category4"
                  name="category"
                  value="Fitness"
                  onChange={onCategoryChange}
                  checked={product.category === "Fitness"}
                />
                <label htmlFor="category4">Fitness</label>
              </div>
            </div>
          </div>

          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="price" className="font-bold">
                Price
              </label>
              <InputNumber
                id="price"
                value={product.price}
                onValueChange={(e) => onInputNumberChange(e, "price")}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
            <div className="field col">
              <label htmlFor="quantity" className="font-bold">
                Quantity
              </label>
              <InputNumber
                id="quantity"
                value={product.quantity}
                onValueChange={(e) => onInputNumberChange(e, "quantity")}
              />
            </div>
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
              <span>
                Are you sure you want to delete the selected products?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default DevicesList;
