import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./auth/SignIn";
import Profile from "./auth/Profile";
import CustomerLayout from "layouts/customer";
import AdminLayout from "layouts/admin";
import AddVehicle from "./admin/vehicles/AddVehicle";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="admin/vehicles/addvehicle" element={<AddVehicle />} />
      <Route path="customer/*" element={<CustomerLayout />} />
      <Route path="/" element={<Navigate to="/customer" replace />} />
    </Routes>
  );
};

export default AllRoutes;
