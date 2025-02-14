import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../css/Categories.css";
import { Context } from "../main";

const CategoriesPage = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      setError("Failed to fetch categories");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newCategory.trim()) {
      setError("Category name cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/categories",
        { name: newCategory },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(res.data.message);
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add category.");
    }
  };

  return (
    <div className="category-page">
      <h2>Manage Categories</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="category-form" onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            {category.name}
            <button className="delete-category">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
