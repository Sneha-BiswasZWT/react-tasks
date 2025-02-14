import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../main";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/Wishlist.css";

const Wishlist = () => {
  const { isAuthenticated } = useContext(Context); // Authentication status from context
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }
    fetchWishlist();
  }, [isAuthenticated, navigate]); // Trigger on change of authentication status

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Wishlist Response:", res.data); // Check API response
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to fetch wishlist");
    }
    setLoading(false);
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(wishlist.filter((item) => item.id !== productId));
    } catch (err) {
      setError("Failed to remove product from wishlist");
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/cart`,
        { productId, quantity: 1 }, // Assuming default quantity is 1
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Item added to cart!");
    } catch (err) {
      setError("Failed to add item to cart");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-message">
          Your wishlist is empty. Start adding your favorite products!
        </p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-card">
              <a href={`/product/${item.product_id}`} className="wishlist-link">
                <img
                  src={`http://localhost:5000${
                    item.product.image_url || "/default-image.jpg"
                  }`} // Handle image
                  alt={item.product?.name || "Product"}
                  className="wishlist-image"
                />
                <div className="wishlist-details">
                  <h4>{item.product?.name || "Unknown Product"}</h4>
                  <p>₹{item.product?.price || "N/A"}</p>
                </div>
              </a>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(item.product_id)}
              >
                Add to Cart
              </button>
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
