import React, { useState, useEffect, useRef } from "react";
import CustomersList from "./components/CustomersList";
import { Toast } from "primereact/toast";
import CustomersGrid from "./components/CustomersGrid";
import { BsGrid, BsListUl } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";

const Customers = () => {
  const [isListView, setIsListView] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState(null);
  const toastRef = useRef(null);
  const toastErr = useRef(null);
  const handleChange = (event) => {
    setUserType(event.value);
  };
  //User Type options
  const options = [
    { label: "Customer", value: 2 },
    { label: "Admin", value: 1 },
  ];

  useEffect(() => {
    fetchCustomersData();
  }, []);
  //Fetching all data
  const fetchCustomersData = () => {
    axios
      .get("http://localhost:3001/api/Admin/GetAll")
      .then((res) => {
        const formattedData = res.data.data.map((item, index) => ({
          ...item,
          serialNo: index + 1,
          full_name: item.first_name + " " + item.last_name,
          full_address: `${item.address}, ${item.city}, ${item.state}, ${item.pincode}`,
        }));
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.put(`http://localhost:3001/api/Admin/delete/${customerId}`, {
        status: false,
      });

      // Remove the deleted customer from the state
      setData((prevData) =>
        prevData.filter((customer) => customer.userId !== customerId)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleUpdateCustomer = async (customerId, updatedData) => {
    try {
      await axios.put(
        `http://localhost:3001/api/Admin/update/${customerId}`,
        updatedData
      );

      // Update the customer data in the state
      setData((prevData) =>
        prevData.map((customer) =>
          customer.userId === customerId
            ? { ...customer, ...updatedData }
            : customer
        )
      );
    } catch (error) {
      console.error("Error updating customer:", error);
    }
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
    setUserType(null);
  };
  //Add Customer form
  const handleSubmit = async (event) => {
    event.preventDefault();

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
      user_type: formData.get("user_type"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode"),
    };

    const isValidPhoneNumber = (phoneNumber) => {
      // Regular expression to check for exactly 10 digits
      const phonePattern = /^\d{10}$/;
      return phonePattern.test(phoneNumber);
    };
    // Validate the phone number
    if (!isValidPhoneNumber(data.phone)) {
      toastRef.current.show({
        severity: "warn",
        summary: "Invalid Phone Number",
        detail: "Please enter a 10-digit valid phone number.",
        life: 3000,
      });
      return;
    }
    if (data.password !== data.confirmPassword) {
      toastRef.current.show({
        severity: "warn",
        summary: "Password Mismatch",
        detail: "Password and Confirm Password do not match.",
        life: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/Admin/Signup",
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
        setIsDialogVisible(false);
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: `User ${
            data.first_name + " " + data.last_name
          } Added successfully`,
          life: 3000,
        });
        fetchCustomersData();
      } else {
        console.log("Failed to post data:", response.statusText);
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "An error occurred. Please try again later.",
          life: 3000,
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          console.log("Unauthorized: Please authenticate.");

          // Handle unauthorized error here, e.g., redirect to the login page
          toastRef.current.show({
            severity: "warn",
            summary: "Unauthorized",
            detail: "Please authenticate.",
            life: 3000,
          });
        } else if (status === 400) {
          // Handle validation errors
          const { message } = data;

          toastRef.current.show({
            severity: "error",
            summary: "Validation Error",
            detail: message,
            life: 3000,
          });
        } else if (status === 402) {
          console.log("Passwords MisMatched.");

          // Show password mismatch error toast message
          toastRef.current.show({
            severity: "error",
            summary: "Password Mismatch",
            detail: "Passwords do not match.",
            life: 3000,
          });
        } else if (status === 500 && data === "This Email Already Taken ") {
          // Show phone number already in use error toast message
          toastRef.current.show({
            severity: "error",
            summary: "Use another email ID",
            detail: "This email ID is already in use.",
            life: 3000,
          });
        } else if (
          status === 500 &&
          data === "This Phone Number Already Taken"
        ) {
          // Show phone number already in use error toast message
          toastRef.current.show({
            severity: "error",
            summary: "Use different Phone Number",
            detail: "The phone number is already in use.",
            life: 3000,
          });
        } else {
          console.log("Error:", error);

          // Show generic error toast message for other errors
          toastRef.current.show({
            severity: "error",
            summary: "Error",
            detail: "An error occurred. Please try again later.",
            life: 3000,
          });
        }
      } else {
        console.log("Error:", error);

        // Show network error toast message
        toastRef.current.show({
          severity: "error",
          summary: "Network Error",
          detail: "An error occurred. Please check your network connection.",
          life: 3000,
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      <Toast ref={toastErr} className="bg-red-400" />
      <div className="flex justify-between">
        <h4 className="text-dark text-xl font-bold dark:text-white">
          Customers
        </h4>

        <div>
          <button
            className={`${
              isListView === true
                ? "list-btn bg-gray-150 px-3 py-2 dark:bg-gray-700"
                : "list-btn bg-white px-3 py-2 dark:bg-gray-150"
            }`}
            onClick={handleListView}
          >
            <BsListUl />
          </button>
          <button
            className={`${
              isListView === false
                ? "grid-btn bg-gray-150 px-3 py-2 dark:bg-gray-700"
                : "grid-btn bg-white px-3 py-2 dark:bg-gray-150"
            }`}
            onClick={handleGridView}
          >
            <BsGrid />
          </button>
        </div>
      </div>
      <Button
        label="New Customer"
        icon="pi pi-plus"
        severity="primary"
        className="mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
        onClick={openDialog}
      />
      {!isListView && (
        <CustomersGrid
          data={data}
          onDelete={handleDeleteCustomer}
          onUpdate={handleUpdateCustomer}
        />
      )}
      {isListView && (
        <div className="opacity-100 transition-opacity duration-500">
          <CustomersList
            data={data}
            onDelete={handleDeleteCustomer}
            onUpdate={handleUpdateCustomer}
          />
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
                <InputText id="l_name" name="l_name" required />
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
              <Dropdown
                id="user_type"
                name="user_type"
                options={options}
                value={userType}
                optionLabel="label"
                optionValue="value"
                onChange={handleChange}
                className="p-dropdown"
              />
              <label htmlFor="user_type">User Type</label>
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

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Add Customer
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Customers;
