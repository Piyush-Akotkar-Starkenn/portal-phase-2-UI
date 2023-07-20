import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AddFeatureSet from "./AddFeatureSet";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import EditFeatureset from "./EditFeatureset";
import { useContext } from "react";
import { AppContext } from "context/AppContext";
import AssignCustomer from "./AssignCustomer";
import UnAssignCustomer from "./UnAssignCustomer";

const FeatureList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isDialogVisible1, setIsDialogVisible1] = useState(false);
  const [isDialogVisible2, setIsDialogVisible2] = useState(false);
  const [isDialogVisible3, setIsDialogVisible3] = useState(false);

  const [myData, setMyData] = useState();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const { updateData, updateFunc, resetState } = useContext(AppContext);

  //get list of featureset
  useEffect(() => {
    getListData();
    console.log(updateData);
  }, [updateData]);

  const getListData = () => {
    axios
      .get("http://localhost:3001/api/featureset/featureset-list")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const openDialog = () => {
    setIsDialogVisible(true);
  };
  const closeDialog = () => {
    setIsDialogVisible(false);
    resetState();
  };

  const openDialog1 = (rowData) => {
    setMyData(rowData); // Set the rowData to myData state
    setIsDialogVisible1(true);
  };

  const closeDialog1 = () => {
    setIsDialogVisible1(false);
    resetState();
  };

  const openDialog2 = (rowData) => {
    setMyData(rowData);
    setIsDialogVisible2(true);
  };
  const closeDialog2 = () => {
    setIsDialogVisible2(false);
    resetState();
  };

  const openDialog3 = (rowData) => {
    setMyData(rowData);
    setIsDialogVisible3(true);
  };
  const closeDialog3 = () => {
    setIsDialogVisible3(false);
    resetState();
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

  const handleDelete = (rowData) => {
    axios
      .put(
        `http://localhost:3001/api/featureset/featureset-delete/${rowData?.featureSetId}`
      )
      .then((res) => {
        console.log(res);
        getListData(); // Fetch the updated list of featuresets after the delete operation
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-plus"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem", marginRight: "5px" }}
          onClick={() => openDialog2(rowData)}
        />
        <Button
          icon="pi pi-minus"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem", marginRight: "5px" }}
          onClick={() => openDialog3(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          style={{ width: "2rem", height: "2rem", marginRight: "5px" }}
          onClick={() => openDialog1(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem" }}
          severity="danger"
          onClick={() => handleDelete(rowData)}
        />
      </React.Fragment>
    );
  };
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
        visible={isDialogVisible2}
        onHide={closeDialog2}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Assign Feature-Set to Client Company"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <AssignCustomer propValue={myData?.featureSetId} />
      </Dialog>
      <Dialog
        visible={isDialogVisible3}
        onHide={closeDialog3}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Unassign Client Company from Feature-Set"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <UnAssignCustomer propValue={myData?.featureSetId} />
      </Dialog>

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
      <Dialog
        visible={isDialogVisible1}
        onHide={closeDialog1}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Featureset Fill values which you wanted to update"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <EditFeatureset propValue={myData?.featureSetId} />
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
        globalFilterFields={["featureSetId", "featureSetName"]}
        emptyMessage="No customers found."
        header={header}
      >
        <Column
          field="serialNo"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "4rem", textAlign: "center" }}
        />
        <Column
          field="featureSetId"
          header="featureSetId"
          style={{ minWidth: "8rem" }}
          className="border-none dark:bg-gray-900 dark:text-gray-200"
        />
        <Column
          field="featureSetName"
          header="featureSetName"
          style={{ minWidth: "8rem" }}
          className="border-none dark:bg-gray-900 dark:text-gray-200"
        />
        <Column
          body={actionBodyTemplate}
          header="Action"
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "6rem" }}
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
