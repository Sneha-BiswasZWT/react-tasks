import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlistMessage, setWishlistMessage] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        console.log("Fetched product:", res.data);
        if (res.data.product) {
          setProduct(res.data.product);
        } else {
          setProduct(res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details");
        setLoading(false);
      });
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { product_id: product.id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message || "Added to cart!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add item to cart.");
    }
  };

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to the wishlist.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/wishlist",
        { product_id: product.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlistMessage(res.data.message || "Added to wishlist!");
      setTimeout(() => setWishlistMessage(""), 3000);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add item to wishlist.");
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const imageUrl = product.image_url
    ? `http://localhost:5000${product.image_url}?t=${Date.now()}`
    : "/logo2.png";

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-detail-image">
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) => (e.target.src = "/logo2.png")}
          />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <p className="price">Price: ₹{product.price}</p>
          <p className="stock">
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <button onClick={decreaseQuantity} className="quantity-btn">
              −
            </button>
            <span className="quantity">{quantity}</span>
            <button onClick={increaseQuantity} className="quantity-btn">
              +
            </button>
          </div>

          <button
            className="add-to-cart"
            onClick={addToCart}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          {/* Add to Wishlist Button */}
          <button className="add-to-wishlist" onClick={addToWishlist}>
            Add to Wishlist
          </button>

          {wishlistMessage && (
            <p className="wishlist-message">{wishlistMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
