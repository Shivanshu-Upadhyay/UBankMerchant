import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateComp() {
  const auth = localStorage.getItem("user");
  console.log(auth);
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateComp;
