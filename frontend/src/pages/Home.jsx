import React, { useContext } from "react";
import { Context } from "../main";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductsCarousel from "../components/ProdcutsCarousel";
import "../css/Home.css"; // Ensure you have styles

const Home = () => {
  const { user } = useContext(Context);

  return (
    <>
      {user.role === "admin" ? (
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          <div className="admin-sections">
            <Link to="/admin/products" className="admin-card">
              Manage Products
            </Link>
            <Link to="/admin/users" className="admin-card">
              Manage Users
            </Link>
            <Link to="/admin/categories" className="admin-card">
              Manage Categories
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Hero title={"Welcome to Polaroid Talkies"} imageurl={"/logo2.png"} />
          <ProductsCarousel />
        </>
      )}
    </>
  );
};

export default Home;
