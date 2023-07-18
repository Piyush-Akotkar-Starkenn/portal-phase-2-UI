import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import AddFeatureSet from "./AddFeatureSet";

const FeatureList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const openDialog = () => {
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
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
    </>
  );
};

export default FeatureList;
