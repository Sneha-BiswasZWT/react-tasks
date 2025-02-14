import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { isAuthenticated } = useContext(Context);
  const [user, setUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setUpdatedData(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile");
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (field) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        "http://localhost:5000/api/users/profile",
        { [field]: updatedData[field] }, // Send only the updated field
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setUser(res.data.updatedUser);
        setEditingField(null); // Exit edit mode after saving
      })
      .catch(() => setError("Failed to update profile"));
  };

  if (!isAuthenticated) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        {["first_name", "last_name", "email", "age"].map((field) => (
          <div key={field} className="profile-field">
            <strong>{field.replace("_", " ").toUpperCase()}:</strong>

            {editingField === field ? (
              <>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "age"
                      ? "number"
                      : "text"
                  }
                  name={field}
                  value={updatedData[field] || ""}
                  onChange={handleChange}
                />
                <div className="profile-actions">
                  <button
                    onClick={() => handleSubmit(field)}
                    className="save-btn"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingField(null)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {user[field]}
                <div className="profile-actions">
                  <button
                    onClick={() => setEditingField(field)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="order-history-link">
        <Link to="/orders">View Order History</Link>
      </div>
    </div>
  );
};

export default UserProfile;
