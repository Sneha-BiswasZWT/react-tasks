import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {
        withCredentials: true,
      });

      toast.success("Logged out successfully");

      localStorage.removeItem("token"); // ❌ Remove JWT token from storage
      setIsAuthenticated(false); // 🔥 Update auth state

      navigateTo("/login"); // 🚀 Redirect to login page
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <nav className="container">
      <div className="logo">
        <Link to="/" onClick={() => setShow(false)}>
          <img src="/logo1_dark.png" alt="logo" className="logo-img" />
        </Link>
      </div>

      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="/" onClick={() => setShow(false)}>
            Home
          </Link>

          {/* Regular User Pages */}
          {!user.role || user.role !== "admin" ? (
            <>
              <Link to="/products" onClick={() => setShow(false)}>
                Products
              </Link>
              <Link to="/cart" onClick={() => setShow(false)}>
                Cart
              </Link>
              <Link to="/wishlists" onClick={() => setShow(false)}>
                Wishlist
              </Link>
              <Link to="/users/profile" onClick={() => setShow(false)}>
                Profile
              </Link>
            </>
          ) : (
            /* Admin Pages */
            <>
              <Link to={"/admin/dashboard"} onClick={() => setShow(!show)}>
                Dashboard
              </Link>
              <Link to="/admin/products" onClick={() => setShow(false)}>
                Products
              </Link>
              <Link to="/admin/users" onClick={() => setShow(false)}>
                Users
              </Link>
              <Link to="/admin/categories" onClick={() => setShow(false)}>
                Categories
              </Link>
              <Link to="/users/profile" onClick={() => setShow(false)}>
                Profile
              </Link>
              <Link to="/admin/orders" onClick={() => setShow(false)}>
                Orders
              </Link>
            </>
          )}
        </div>

        {/* Authentication Buttons */}
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="loginBtn btn" onClick={goToLogin}>
            LOGIN
          </button>
        )}
      </div>

      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
