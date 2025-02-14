import React, { useContext } from "react";
import { Context } from "../main";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(Context);

  if (user?.role !== "admin") {
    return <p style={{ color: "gray", textAlign: "center" }}>Loading..</p>;
  }

  return element;
};

export default ProtectedRoute;
