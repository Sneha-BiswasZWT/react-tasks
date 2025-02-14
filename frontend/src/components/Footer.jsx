import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Context } from "../main";

const Footer = () => {
  const { user } = useContext(Context);

  return (
    <footer className={"container"}>
      <hr />
      <div className="content">
        <div>
          <img src="/logo1.png" alt="logo" className="logo-img" />
        </div>

        {user.role === "admin" ? (
          // ADMIN FOOTER
          <div>
            <h4>Admin Links</h4>
            <ul>
              <Link to={"/admin/dashboard"}>Dashboard</Link>
              <Link to={"/admin/orders"}>Manage Orders</Link>
            </ul>
          </div>
        ) : (
          // REGULAR FOOTER
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/products"}>Products</Link>
              <Link to={"/orders"}>Orders</Link>
            </ul>
          </div>
        )}

        <div>
          <h4>Contact</h4>
          <div>
            <FaPhone />
            <span>999-999-9999</span>
          </div>
          <div>
            <MdEmail />
            <span>Polaroid@gmail.com</span>
          </div>
          <div>
            <FaLocationArrow />
            <span>Gujarat, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
