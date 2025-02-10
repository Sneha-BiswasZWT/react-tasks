import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const ProtectedRoute = ({ children, role }) => {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" />; // Redirect if not logged in
  if (role && user.role !== role) return <Navigate to="/" />; // Restrict based on role
  return children;
};

export default ProtectedRoute;
