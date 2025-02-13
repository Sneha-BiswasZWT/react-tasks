import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main"; // Import authentication context
import "../css/Cart.css";

const Cart = () => {
  const { isAuthenticated } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false); // Track order status
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Full API Response:", res.data);
        setCartItems(res.data.cartItems || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err.response?.data || err);
        setError("Failed to fetch cart items");
        setLoading(false);
      });
  }, [navigate]);

  const removeFromCart = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== id)
        );
      })
      .catch(() => alert("Failed to remove item from cart"));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const proceedToOrder = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setOrderPlaced(true);
      })
      .catch(() => alert("Failed to place order"));
  };

  if (!isAuthenticated) return null;
  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>🛒 Cart Empty</p>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <Link to={`/products/${item.product_id}`} className="cart-link">
              <img
                src={`http://localhost:5000/uploads/${
                  item.product?.image_url || "default.jpg"
                }`}
                alt={item.product?.name || "No name"}
                className="cart-image"
                onError={(e) => (e.target.src = "/logo2.png")}
              />
              <div className="cart-details">
                <h4>{item.product?.name || "Unknown Product"}</h4>
                <p>Price: ₹{item.product?.price || "N/A"}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </Link>

            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))
      )}

      <div className="cart-summary">
        <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
        <button
          className="order-btn"
          onClick={proceedToOrder}
          disabled={cartItems.length === 0 || orderPlaced}
        >
          {orderPlaced
            ? "Order Placed"
            : cartItems.length === 0
            ? "Add Items to Order"
            : "Proceed to Order"}
        </button>
      </div>

      {orderPlaced && (
        <div className="order-confirmation">
          <p>🎉 Order placed successfully! Your order is being processed.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
