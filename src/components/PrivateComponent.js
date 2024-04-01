import React from "react";
import { Outlet, Navigate } from "react-router";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;
