import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductBanner from "../components/ProductBanner";
import "../css/AdminProducts.css";
import "../css/AddProducts.css";
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
      navigate("/products");
      return;
    }
    fetchData();
  }, [isAuthenticated, user, navigate]);

  const fetchData = async () => {
    try {
      const resProducts = await axios.get(
        "http://localhost:5000/api/products",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProducts(resProducts.data.products || []);

      const resCategories = await axios.get(
        "http://localhost:5000/api/categories"
      );
      setCategories(resCategories.data.categories || []);
    } catch (err) {
      setError("Failed to fetch data");
    }
    setLoading(false);
  };

  const handleProductUpdate = async () => {
    await fetchData();
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category_id)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-products-page">
      <ProductBanner title="Admin - Manage Products" imageurl="/boat.png" />
      <button
        className="add-product-btn"
        onClick={() => navigate("/admin/products/add")}
      >
        Add New Product
      </button>

      <div className="products-container">
        {/* Filter Section */}
        <div className="filters">
          <h3>Categories</h3>
          {categories.map((cat) => (
            <label key={cat.id} className="category-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(cat.id)
                      ? prev.filter((id) => id !== cat.id)
                      : [...prev, cat.id]
                  )
                }
              />
              {cat.name}
            </label>
          ))}
          <button
            className="category-page-btn"
            onClick={() => navigate("/admin/categories")}
          >
            Manage Categories
          </button>
          <br></br>
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
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card admin-product">
              <img
                src={`http://localhost:5000${
                  product.image_url
                }?t=${new Date().getTime()}`}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo2.png";
                }}
              />
              <h4>{product.name}</h4>
              <p>Price: ₹{product.price}</p>
              <div className="admin-buttons">
                <Link to={`/admin/products/${product.id}`} className="edit-btn">
                  Edit
                </Link>
                <button onClick={handleProductUpdate} className="delete-btn">
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
