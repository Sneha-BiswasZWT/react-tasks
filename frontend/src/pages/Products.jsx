import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductBanner from "../components/ProductBanner";
import "../css/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);

  // Fetch Products & Categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        console.log("Products:", response.data);
        setProducts(response.data.products || []);
      })
      .catch((error) => console.error("Error fetching products:", error));

    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        console.log("Categories:", response.data);
        setCategories(response.data.categories || []);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle Category Selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle Price Slider
  const handlePriceChange = (event) => {
    setPriceRange([parseInt(event.target.value), 20000]);
  };

  // Filter Products
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category_id)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  return (
    <div>
      <ProductBanner title="Our Products" imageurl="/boat.png" />

      <div className="products-container">
        {/* Sidebar Filters */}
        <div className="filters">
          <h3>Categories</h3>
          {categories.map((category) => (
            <label key={category.id} className="category-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
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
            onChange={handlePriceChange}
          />
          <p>₹{priceRange[0]} - ₹20000</p>
        </div>
        {/* Product Grid */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const imageUrl = product.image_url
                ? `http://localhost:5000${
                    product.image_url
                  }?t=${new Date().getTime()}`
                : "/logo2.png";

              return (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="product-card"
                >
                  <img
                    src={imageUrl}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/logo2.png"; // Backup image
                    }}
                    className="product-image"
                  />
                  <h4>{product.name}</h4>
                  <p>Price: ₹{product.price}</p>
                </Link>
              );
            })
          ) : (
            <p className="no-products">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
