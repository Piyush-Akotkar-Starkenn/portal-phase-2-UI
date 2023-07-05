import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { CiMenuKebab } from "react-icons/ci";

import axios from "axios";

const CustomersList = () => {
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
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
      command: () => {
        navigate("/edit-customer");
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Get/GetUser")
      .then((res) => {
        const formattedData = res.data.data.map((item, index) => ({
          ...item,
          serialNo: index + 1,
          address:
            item.address +
            ", " +
            item.city +
            ", " +
            item.state +
            ", " +
            item.pincode,
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
    </div>
  );
};

export default CustomersList;
