import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import CustomerLayout from "layouts/customer";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";
import Profile from "views/auth/Profile";
const App = () => {
  return (
    <Routes>
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="customer/*" element={<CustomerLayout />} />
      <Route path="/" element={<Navigate to="/customer" replace />} />
    </Routes>
  );
};

export default App;
