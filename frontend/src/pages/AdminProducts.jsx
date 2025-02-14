import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductBanner from "../components/ProductBanner";
import "../css/AdminProducts.css";
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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "admin") {
      navigate("/");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !description || !price || !stock || !category || !image) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category_id", category);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);

      // Fetch updated product list immediately
      const updatedProducts = await axios.get(
        "http://localhost:5000/api/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(updatedProducts.data.products || []);

      // Reset form fields
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product.");
    }
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

      {/* Add Product Section */}
      <div className="add-product-section">
        <h2>Add New Product</h2>
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="add-product-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminProducts;
