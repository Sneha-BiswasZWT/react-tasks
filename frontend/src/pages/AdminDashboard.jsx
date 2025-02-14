import React from "react";
import { Link } from "react-router-dom";
import "../css/AdminDashboard.css"; // Import styles

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-sections">
        <Link to="/admin/products" className="admin-card">
          Manage Products
        </Link>
        <Link to="/admin/users" className="admin-card">
          Manage Users
        </Link>
        <Link to="/admin/categories" className="admin-card">
          Manage Categories
        </Link>
        <Link to="/admin/orders" className="admin-card">
          Manage Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
