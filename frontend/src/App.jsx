import React from "react";
import { Context } from "./main";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/App.css";
import "./css/Products.css";

//pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import UserProfile from "./pages/Profile";
import Products from "./pages/Products";
import Wishlists from "./pages/Wishlists";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import OrderDetails from "./pages/OrderDetails";
import AdminProducts from "./pages/AdminProducts";
import AdminDashboard from "./pages/AdminDashboard";
import EditProduct from "./pages/EditProduct";
import CategoriesPage from "./pages/Categories";
import UsersPage from "./pages/Users";
import AdminOrders from "./pages/AdminOrders";
import AddProduct from "./pages/AddProduct";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/users/profile" element={<UserProfile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/wishlist" element={<Wishlists />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />

        <Route
          path="/admin/products"
          element={<ProtectedRoute element={<AdminProducts />} />}
        />
        <Route
          path="/admin/products/:id"
          element={<ProtectedRoute element={<EditProduct />} />}
        />

        <Route
          path="/admin/products/:id"
          element={<ProtectedRoute element={<EditProduct />} />}
        />
        <Route
          path="/admin/categories"
          element={<ProtectedRoute element={<CategoriesPage />} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute element={<UsersPage />} />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute element={<AdminOrders />} />}
        />
        <Route
          path="/admin/products/add"
          element={<ProtectedRoute element={<AddProduct />} />}
        />
      </Routes>
      <ToastContainer position="top-center" />
      <Footer />
    </Router>
  );
};

export default App;
