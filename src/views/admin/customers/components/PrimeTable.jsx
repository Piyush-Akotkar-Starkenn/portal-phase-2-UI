import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

const PrimeTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetchData();

    axios
      .get("http://localhost:3001/api/Vehicles/getAllVehicle")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <DataTable value={data}>
        <Column field="vehicle_name" header="Vehicle Name"></Column>
        <Column
          field="vehicle_registration"
          header="Vehicle Registration"
        ></Column>
        {/* Add more columns for other fields as needed */}
      </DataTable>
    </div>
  );
};

export default PrimeTable;
