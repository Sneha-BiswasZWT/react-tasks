import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

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

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <Link to={"/"} onClick={() => setShow(!show)}>
            <img src="/logo1_dark.png" alt="logo" className="logo-img" />
          </Link>
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/products"} onClick={() => setShow(!show)}>
              Products
            </Link>
            <Link to={"/cart"} onClick={() => setShow(!show)}>
              Cart
            </Link>
            <Link to={"/wishlists"} onClick={() => setShow(!show)}>
              Whishlist
            </Link>
            <Link to={"/profile"} onClick={() => setShow(!show)}>
              Profile
            </Link>
          </div>
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
    </>
  );
};

export default Navbar;
