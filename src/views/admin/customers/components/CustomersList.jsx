import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Menu } from "primereact/menu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { CiMenuKebab } from "react-icons/ci";

const CustomersList = ({ data }) => {
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const menuRight = useRef(null);
  const toast = useRef(null);
  const navigate = useNavigate();
  const items = [
    {
      label: "Rights Management",
      icon: "pi pi-lock",
      command: () => {
        navigate("/edit-customer");
      },
    },
    {
      label: "Manage Assigned",
      icon: "pi pi-users",
      command: () => {
        navigate("/edit-customer");
      },
    },
    {
      label: "Manage Unassigned",
      icon: "pi pi-user-minus",
      command: () => {
        navigate("/edit-customer");
      },
    },
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: (customer) => {
        setEditedCustomer(customer);
        setEditDialogVisible(true);
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        navigate("/edit-customer");
      },
    },
  ];
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const EditCustomerDialog = ({ visible, onHide, customer }) => {
    const [editedCustomerData, setEditedCustomerData] = useState(customer);

    const onSave = () => {
      // Perform the save operation with the editedCustomerData
      onHide();
    };

    return (
      <Dialog
        visible={visible}
        onHide={onHide}
        header="Edit Customer"
        footer={
          <div>
            <Button label="Save" icon="pi pi-check" onClick={onSave} />
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={onHide}
              className="p-button-secondary"
            />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="flex justify-evenly">
            <div className="card justify-content-center mt-5 flex">
              <span className="p-float-label">
                <InputText id="f_name" name="f_name" />
                <label htmlFor="f_name">First Name</label>
              </span>
            </div>
            <div className="card justify-content-center mt-5 flex">
              <span className="p-float-label">
                <InputText id="l_name" name="l_name" />
                <label htmlFor="l_name">Last Name</label>
              </span>
            </div>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText id="email" type="email" name="email" />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
              />
              <label htmlFor="password">Password</label>
              <div className="absolute right-2.5 top-4">
                {showPassword ? (
                  <FaEyeSlash
                    className="h-5 w-5 cursor-pointer text-gray-500"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="h-5 w-5 cursor-pointer text-gray-600"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="confirmPassword"
                type="password"
                name="confirmPassword"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText id="company_name" type="text" name="company_name" />
              <label htmlFor="company_name">Company Name</label>
            </span>
          </div>
          <div className="mx-auto mb-3 mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText id="phone" type="tel" name="phone" />
              <label htmlFor="phone">Contact Number</label>
            </span>
          </div>
          <div className="mx-auto mt-6 w-[34.5vw]">
            <span>Address:</span>
          </div>
          <div className="mx-auto mt-6 w-[34.5vw]">
            <span className="p-float-label">
              <InputText id="address" type="text" name="address" />
              <label htmlFor="address">Flat No./ Plot No., Area/Society</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText id="city" type="text" name="city" />
              <label htmlFor="city">City</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText id="state" type="text" name="state" />
              <label htmlFor="state">State</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="pincode"
                type="text"
                name="pincode"
                keyfilter="pint"
                onChange={(e) => {
                  const value = e.target.value;
                  const formattedValue = value.replace(/\D/g, "").slice(0, 6); // Remove non-digits and limit to 6 characters
                  e.target.value = formattedValue;
                }}
              />
              <label htmlFor="pincode">Pincode (Format: xxxxxx)</label>
            </span>
          </div>
          {/* Add more fields as needed */}
        </div>
      </Dialog>
    );
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

  const actionBodyTemplate = () => {
    return (
      <div>
        <Toast ref={toast}></Toast>
        <Menu model={items} popup ref={menuRight} id="popup_menu_left" />
        <Button
          type="button"
          className="text-bold border-none text-gray-950 hover:bg-none dark:text-white dark:hover:text-white"
          onClick={(event) => menuRight.current.toggle(event)}
          aria-controls="popup_menu_right"
          aria-haspopup
        >
          <CiMenuKebab />
        </Button>
        <Menu
          model={items}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
      </div>
    );
  };

  return (
    <div>
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
        globalFilterFields={["full_name", "address", "company_name", "phone"]}
        emptyMessage="No customers found."
        header={header}
      >
        <Column
          field="serialNo"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "4rem", textAlign: "center" }}
        ></Column>
        <Column
          field="full_name"
          header="Name"
          style={{ minWidth: "8rem" }}
          className="border-none dark:bg-gray-900 dark:text-gray-200"
        ></Column>
        <Column
          field="email"
          header="Email"
          style={{ minWidth: "8rem" }}
          className="border-none dark:bg-gray-900 dark:text-gray-200"
        ></Column>
        <Column
          field="address"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          header="Address"
          style={{ width: "12rem", minWidth: "26rem" }}
        ></Column>
        <Column
          field="company_name"
          header="Company Name"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "4rem" }}
        ></Column>
        <Column
          field="phone"
          header="Contact No."
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "5rem" }}
        ></Column>
        <Column
          header="Action"
          headerStyle={{ width: "4rem", textAlign: "left" }}
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
    </div>
  );
};

export default CustomersList;
