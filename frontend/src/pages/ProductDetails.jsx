import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Now it's inside the component
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      return;
    }

    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        console.log("Fetched product:", res.data);
        setProduct(res.data.product || res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details");
        setLoading(false);
      });
  }, [id]);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
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

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-detail-image">
          <img
            src={`http://localhost:5000/uploads/${product.image_url}`}
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
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
