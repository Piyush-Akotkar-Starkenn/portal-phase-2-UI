import React, { useState, useEffect } from "react";
import CustomersList from "./components/CustomersList";
import CustomersGrid from "./components/CustomersGrid";
import { BsGrid, BsListUl } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import axios from "axios";

const Customers = () => {
  const [isListView, setIsListView] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchCustomersData();
  }, []);

  const fetchCustomersData = () => {
    axios
      .get("http://localhost:3001/api/Get/GetUser")
      .then((res) => {
        const formattedData = res.data.data.map((item, index) => ({
          ...item,
          serialNo: index + 1,
          full_name: item.first_name + " " + item.last_name,
          address: `${item.address}, ${item.city}, ${item.state}, ${item.pincode}`,
        }));
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleListView = () => {
    setIsListView(true);
  };

  const handleGridView = () => {
    setIsListView(false);
  };
  const openDialog = () => {
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(true);

    const form = event.target;
    const formData = new FormData(form);

    const data = {
      first_name: formData.get("f_name"),
      last_name: formData.get("l_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company_name: formData.get("company_name"),
      address: formData.get("address"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode"),
      // Add more fields as needed
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/Get/UserSignup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        console.log("Data posted successfully:", responseData);
        setIsSuccess(true);

        setTimeout(() => {
          setIsDialogVisible(false);
          fetchCustomersData();
        }, 200);
      } else {
        console.log("Failed to post data:", response.statusText);
        setIsSuccess(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized: Please authenticate.");
        // Handle unauthorized error here, e.g., redirect to login page
      } else {
        console.log("Error:", error);
        setIsSuccess(false);
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-dark text-xl font-bold dark:text-white">
          Customers
        </h4>

        <div>
          <button
            className={`${
              isListView === true
                ? "list-btn bg-gray-150 px-3 py-2  dark:bg-gray-700  "
                : "list-btn bg-white px-3 py-2  dark:bg-gray-150 "
            }`}
            onClick={handleListView}
          >
            <BsListUl />
          </button>
          <button
            className={`${
              isListView === false
                ? "grid-btn bg-gray-150 px-3 py-2  dark:bg-gray-700  "
                : "grid-btn bg-white px-3 py-2  dark:bg-gray-150 "
            }`}
            onClick={handleGridView}
          >
            <BsGrid />
          </button>
        </div>
      </div>
      <Button
        label="Add Customer"
        icon="pi pi-plus"
        severity="Primary"
        className="mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
        onClick={openDialog}
      />
      {!isListView && <CustomersGrid data={data} />}
      {isListView && (
        <div className="opacity-100 transition-opacity duration-500">
          <CustomersList data={data} />
        </div>
      )}
      <Dialog
        visible={isDialogVisible}
        onHide={closeDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Fill the details"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <form onSubmit={handleSubmit} className="mx-auto">
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
                    className="h-5 w-5 cursor-pointer  text-gray-500"
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
              <InputText id="phone" type="phone" name="phone" />
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
              <InputText id="pincode" type="phone" name="pincode" />
              <label htmlFor="pincode">Pincode</label>
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </Dialog>
      {isSuccess && (
        <div className="fixed left-0 right-0 top-0 bg-green-500 py-2 text-center text-white">
          Customer added successfully
        </div>
      )}
    </>
  );
};

export default Customers;
