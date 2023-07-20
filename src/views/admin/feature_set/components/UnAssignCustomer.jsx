import React, { useState, useEffect } from "react";
import axios from "axios";

const UnAssignCustomer = (parameters) => {
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState("");

  const handleChange = (e) => {
    setCustomer(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/featureset/featureset-assign-customerlist/${parameters.propValue}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer) {
      console.log("Please select a customer.");
      return;
    }

    const requestData = {
      selectCustomer: [customer],
    };

    axios
      .put(
        `http://localhost:3001/api/featureset/featureset-unassign-customer/${parameters.propValue}`,
        requestData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>UnAssign Customer</h1>
      <div className="field my-3 w-[30vw]">
        <form onSubmit={handleSubmit}>
          <label htmlFor="ecu">Select Customer</label>
          <select
            name="selectCustomer"
            className="border-black mx-4 my-4 border-4"
            onChange={handleChange}
            value={customer}
          >
            <option value="">-Select Customer-</option>
            {data?.map((el, ind) => (
              <option key={ind} value={el.userId}>
                {el.first_name}
              </option>
            ))}
          </select>
          <br />
          <button className="border-black my-4 border-4 px-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnAssignCustomer;
