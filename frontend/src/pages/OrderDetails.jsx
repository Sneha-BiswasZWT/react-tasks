import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "../main"; // Import authentication context
import "../css/OrderDetails.css";

const OrderDetails = () => {
  const { isAuthenticated } = useContext(Context);
  const { id } = useParams(); // Get the orderId from the URL
  const [order, setOrder] = useState(null);
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
      .get(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrder(res.data.order);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching order details:",
          err.response?.data || err
        );
        setError("Failed to fetch order details");
        setLoading(false);
      });
  }, [id, navigate]);

  if (!isAuthenticated) return null;
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="order-details-container">
      <h1 className="page-title">Order Details</h1>

      {order ? (
        <div className="order-details-card">
          <h2>Order ID: {order.id}</h2>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total Price:</strong> ₹
            {Number(order.total_price).toFixed(2)}
          </p>

          <h3>Items in this order:</h3>
          <div className="order-items">
            {order.order_items.map((item) => (
              <div className="order-item" key={item.id}>
                <img
                  src={`http://localhost:5000${
                    item.product.image_url
                  }?t=${new Date().getTime()}`}
                  alt={item.product.name}
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <h4>{item.product.name}</h4>
                  <p>
                    <strong>Price:</strong> ₹{item.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/orders" className="back-to-orders-link">
            Back to Orders
          </Link>
        </div>
      ) : (
        <p className="no-order-details">Order not found.</p>
      )}
    </div>
  );
};

export default OrderDetails;
