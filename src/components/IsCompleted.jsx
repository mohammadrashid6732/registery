import React from "react";
import { Navigate } from "react-router-dom";

const IsCompleted = ({ children }) => {
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  if (userData && !userData?.isCompleted) {
    return <Navigate to={"/personaldata"} replace />;
  }

  return children;
};

export default IsCompleted;
