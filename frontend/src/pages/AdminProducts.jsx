import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductBanner from "../components/ProductBanner";
import "../css/Products.css";
import { Context } from "../main";

const AdminProducts = () => {
  const { isAuthenticated, user } = useContext(Context);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "admin") {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => setError("Failed to fetch products"));

    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => setError("Failed to fetch categories"));

    setLoading(false);
  }, [isAuthenticated, user, navigate]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ProductBanner title="Admin - Manage Products" imageurl="/admin.png" />

      <div className="products-container">
        <div className="filters">
          <h3>Categories</h3>
          {categories.map((category) => (
            <label key={category.id} className="category-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(category.id)
                      ? prev.filter((id) => id !== category.id)
                      : [...prev, category.id]
                  )
                }
              />
              {category.name}
            </label>
          ))}

          <h3>Price Range</h3>
          <input
            type="range"
            min="0"
            max="20000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), 20000])}
          />
          <p>₹{priceRange[0]} - ₹20000</p>
        </div>

        {/* Admin Product List */}
        <div className="products-grid">
          {products
            .filter(
              (product) =>
                (selectedCategories.length === 0 ||
                  selectedCategories.includes(product.category_id)) &&
                product.price >= priceRange[0] &&
                product.price <= priceRange[1]
            )
            .map((product) => (
              <div key={product.id} className="product-card admin-product">
                <img
                  src={`http://localhost:5000/uploads/${product.image_url}`}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/logo2.png";
                  }}
                  className="product-image"
                />
                <h4>{product.name}</h4>
                <p>Price: ₹{product.price}</p>
                <div className="admin-buttons">
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
