import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Home from "./pages/home";
import Register from "./pages/register";
import SingleProduct from "./components/SingleProduct";
import { GlobalStyle } from "./style/GlobalStyle";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="products/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
