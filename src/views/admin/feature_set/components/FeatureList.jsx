import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AddFeatureSet from "./AddFeatureSet";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const FeatureList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    axios
      .get("https://example.com/api/featureSets")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openDialog = () => {
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
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
  return (
    <>
      <div>
        <Button
          label="New Feature Set"
          icon="pi pi-plus"
          severity="Primary"
          className="mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
          onClick={openDialog}
        />
      </div>

      <Dialog
        visible={isDialogVisible}
        onHide={closeDialog}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Fill the details"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <AddFeatureSet />
      </Dialog>
      <DataTable
        removableSort
        value={data}
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
        {/* <Column
          header="Action"
          headerStyle={{ width: "11rem", textAlign: "left" }}
          bodyStyle={{ textAlign: "left", overflow: "visible" }}
          body={actionBodyTemplate}
          className="border-none dark:bg-gray-900 "
        /> */}
      </DataTable>
    </>
  );
};

export default FeatureList;
