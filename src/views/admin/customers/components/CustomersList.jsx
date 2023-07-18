import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Menu } from "primereact/menu";
import { Dialog } from "primereact/dialog";
import { CiMenuKebab } from "react-icons/ci";
import { Toast } from "primereact/toast";
import axios from "axios";

const CustomersList = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [customerData, setCustomerData] = useState(data);

  const toastRef = useRef(null);
  const toastErr = useRef(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const menuRight = useRef(null);

  useEffect(() => {
    setCustomerData(
      data.map((customer, index) => ({
        ...customer,
        serialNo: index + 1,
      }))
    );
  }, [data]);

  // Edit Customer Dialog code
  const EditCustomerDialog = ({ visible, onHide, customer }) => {
    const [editedCustomerData, setEditedCustomerData] = useState(customer);

    const onSave = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3001/api/Admin/update/${customer.userId}`,
          editedCustomerData
        );
        console.log("Save success:", response.data);

        const updatedData = customerData.map((customer) => {
          if (customer.userId === editedCustomerData.userId) {
            return {
              ...customer,
              ...editedCustomerData,
            };
          }
          return customer;
        });

        setCustomerData(updatedData);

        onHide();
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "User updated successfully",
          life: 3000,
        });
      } catch (error) {
        onHide();
        toastErr.current.show({
          severity: "danger",
          summary: "Error",
          detail: "Error while saving",
          life: 3000,
        });
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setEditedCustomerData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    return (
      <Dialog
        visible={visible}
        onHide={onHide}
        header="Edit Customer"
        footer={
          <div>
            <Button
              label="Update"
              icon="pi pi-check"
              className="p-button-primary px-3 py-2 hover:bg-none dark:hover:bg-gray-50"
              onClick={onSave}
            />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="flex justify-between">
            <div className="card justify-content-center mt-5 flex">
              <span className="p-float-label">
                <InputText
                  id="first_name"
                  name="first_name"
                  value={editedCustomerData?.first_name || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="first_name">First Name</label>
              </span>
            </div>
            <div className="card justify-content-center mt-5 flex">
              <span className="p-float-label">
                <InputText
                  id="last_name"
                  name="last_name"
                  value={editedCustomerData?.last_name || ""}
                  onChange={handleInputChange}
                />
                <label htmlFor="last_name">Last Name</label>
              </span>
            </div>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="email"
                type="email"
                name="email"
                value={editedCustomerData?.email || ""}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="company_name"
                type="text"
                name="company_name"
                value={editedCustomerData?.company_name || ""}
                onChange={handleInputChange}
              />
              <label htmlFor="company_name">Company Name</label>
            </span>
          </div>
          <div className="mx-auto mb-3 mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="phone"
                type="tel"
                name="phone"
                value={editedCustomerData?.phone || ""}
                onChange={handleInputChange}
              />
              <label htmlFor="phone">Contact Number</label>
            </span>
          </div>
        </div>
      </Dialog>
    );
  };

  // Delete Customer Dialog code
  const DeleteCustomerDialog = ({ visible, onHide, customer }) => {
    const handleConfirmDelete = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3001/api/Admin/delete/${customer.userId}`,
          { status: false }
        );
        console.log("Delete success:", response.data.user.userId);

        const updatedData = customerData
          .filter((c) => c.userId !== customer.userId)
          .map((customer, index) => ({
            ...customer,
            serialNo: index + 1,
          }));

        setCustomerData(updatedData);

        onHide();
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "User deleted successfully",
          life: 3000,
        });
      } catch (error) {
        console.error(error);
        onHide();
        toastErr.current.show({
          severity: "danger",
          summary: "Error",
          detail: "Error while deleting",
          life: 3000,
        });
      }
    };

    return (
      <Dialog
        visible={visible}
        onHide={onHide}
        header="Confirm Delete"
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
              onClick={onHide}
            />
          </div>
        }
      >
        <div>Are you sure you want to delete this customer?</div>
      </Dialog>
    );
  };

  // Global Filter
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
            className="p-button-rounded p-button-text hover:none dark:text-gray-100"
            onClick={clearSearch}
          />
        )}
      </span>
    </div>
  );

  // Action menu
  const actionBodyTemplate = (rowData) => {
    const handleEdit = () => {
      setEditedCustomer(rowData);
      setEditDialogVisible(true);
    };

    const handleDelete = () => {
      setSelectedProduct(rowData);
      setDeleteDialogVisible(true);
    };

    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2 dark:text-gray-100"
          style={{ width: "2rem", height: "2rem" }}
          onClick={handleEdit}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          className="text-red-500 dark:text-red-500"
          style={{ width: "2rem", height: "2rem" }}
          onClick={handleDelete}
        />
        <Button
          type="button"
          className="text-bold setting ml-2 rounded-full text-gray-950 dark:text-white"
          onClick={(event) => menuRight.current.toggle(event)}
          style={{ padding: "0.4rem" }}
          aria-controls="popup_menu_right"
          aria-haspopup
        >
          <CiMenuKebab />
        </Button>
        <Menu
          model={[
            {
              label: "Rights Management",
              icon: "pi pi-lock",
              // command: () => {
              //   navigate("/edit-customer");
              // },
            },
            {
              label: "Manage Assigned",
              icon: "pi pi-users",
              // command: () => {
              //   navigate("/edit-customer");
              // },
            },
            {
              label: "Manage Unassigned",
              icon: "pi pi-user-minus",
              // command: () => {
              //   navigate("/edit-customer");
              // },
            },
          ]}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      <Toast ref={toastErr} className="bg-red-400" />
      <DataTable
        removableSort
        value={customerData}
        selection={selectedProduct}
        onSelectionChange={(e) => setSelectedProduct(e.value)}
        dataKey="id"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        filterDisplay="menu"
        filters={filters}
        globalFilterFields={["full_name", "address", "company_name", "phone"]}
        emptyMessage="No customers found."
        header={header}
      >
        <Column
          field="serialNo"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "4rem", textAlign: "center" }}
        />
        <Column
          field="full_name"
          header="Name"
          style={{ minWidth: "8rem" }}
          className="border-none dark:bg-gray-900 dark:text-gray-200"
        />
        <Column
          field="email"
          header="Email"
          style={{ minWidth: "8rem" }}
          className="border-none dark:bg-gray-900 dark:text-gray-200"
        />
        <Column
          field="full_address"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          header="Address"
          style={{ width: "12rem", minWidth: "20rem" }}
        />
        <Column
          field="company_name"
          header="Company Name"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "6rem" }}
        />
        <Column
          field="phone"
          header="Contact No."
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "5rem" }}
        />
        <Column
          header="Action"
          headerStyle={{ width: "11rem", textAlign: "left" }}
          bodyStyle={{ textAlign: "left", overflow: "visible" }}
          body={actionBodyTemplate}
          className="border-none dark:bg-gray-900 "
        />
      </DataTable>
      <EditCustomerDialog
        visible={editDialogVisible}
        onHide={() => setEditDialogVisible(false)}
        customer={editedCustomer}
      />
      <DeleteCustomerDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        customer={selectedProduct}
      />
    </div>
  );
};

export default CustomersList;
