import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import "../css/Users.css";

const UsersPage = () => {
  const { isAuthenticated, user } = useContext(Context);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [isAuthenticated, user, navigate, page]);

  const fetchUsers = async () => {
    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/users?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data.users || []);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      setError("Failed to fetch users.");
    }
    setLoading(false);
  };

  return (
    <div className="users-page">
      <h2>Manage Users</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? <p>Loading users...</p> : null}

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <span className="user-role">{user.role}</span>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
