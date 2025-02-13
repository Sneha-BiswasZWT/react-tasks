import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main"; // Import authentication context
import "../css/Orders.css";

const OrderHistory = () => {
  const { isAuthenticated } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data.orderHistory || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching order history:",
          err.response?.data || err
        );
        setError("Failed to fetch order history");
        setLoading(false);
      });
  }, [navigate]);

  if (!isAuthenticated) return null;
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="order-history-container">
      <h1 className="page-title">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders-message">No orders found.</p>
      ) : (
        <div className="order-cards-container">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <h2>Order ID: {order.id}</h2>
                <span className="order-status">{order.status}</span>
              </div>
              <p className="order-price">
                Total Price: ₹{Number(order.total_price).toFixed(2)}
              </p>
              <Link to={`/orders/${order.id}`} className="view-details-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
