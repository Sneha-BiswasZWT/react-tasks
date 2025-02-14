import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import "../css/AdminOrders.css";

const AdminOrders = () => {
  const { isAuthenticated, user } = useContext(Context);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchOrders();
  }, [isAuthenticated, user, navigate]);

  const fetchOrders = async () => {
    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/allorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      setError("Failed to fetch orders.");
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      setError("Failed to update order status.");
    }
  };

  return (
    <div className="orders-page">
      <h2>Manage Orders</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? <p>Loading orders...</p> : null}

      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <div>
              <strong>Order ID:</strong> {order.id}
            </div>
            <div>
              <strong>Customer:</strong> {order.user?.name || "Unknown"}
            </div>
            <div>
              <strong>Total:</strong> ₹{order.total}
            </div>
            <div>
              <strong>Status:</strong>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;
