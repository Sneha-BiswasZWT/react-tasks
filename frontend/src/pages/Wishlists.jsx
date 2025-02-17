import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../main";
import { useNavigate, Link } from "react-router-dom";
import "../css/Wishlist.css";

const Wishlist = () => {
  const { isAuthenticated } = useContext(Context);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, [isAuthenticated, navigate]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Wishlist Response:", res.data);
      setWishlist(res.data.wishlistItems || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to fetch wishlist");
    }
    setLoading(false);
  };

  const removeFromWishlist = async (Id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/wishlist/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product removed from wishlist!");
      setWishlist(wishlist.filter((item) => item.id !== Id));
    } catch (err) {
      setError("Failed to remove product from wishlist");
    }
  };

  const addToCart = async (productId, wishlistItemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { product_id: productId, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message || "Added to cart!");

      removeFromWishlist(wishlistItemId); // Remove the product from the wishlist
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add item to cart.");
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
              <Link
                to={`/products/${item.product_id}`}
                className="wishlist-link"
              >
                <img
                  src={`http://localhost:5000${
                    item.product.image_url
                  }?t=${new Date().getTime()}`}
                  alt={item.product?.name || "Product"}
                  className="wishlist-image"
                  onError={(e) => (e.target.src = "/logo2.png")}
                />
                <div className="wishlist-details">
                  <h4>{item.product?.name || "Unknown Product"}</h4>
                  <p>₹{item.product?.price || "N/A"}</p>
                </div>
              </Link>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(item.product_id, item.id)}
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
