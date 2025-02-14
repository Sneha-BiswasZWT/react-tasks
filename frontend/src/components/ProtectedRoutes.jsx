import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../main";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(Context);

  return user?.role === "admin" ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
