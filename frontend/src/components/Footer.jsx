import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/logo1.png" alt="logo" className="logo-img" />
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/products"}>Products</Link>
              <Link to={"/orders"}>Orders</Link>
            </ul>
          </div>

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
    </>
  );
};

export default Footer;
