import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService"; // ✅ Correct import

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((response) => {
        console.log("Fetched Products:", response.data); // Debugging
        setProducts(response.data.products); // Fix: Access `products` array inside response
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.length > 0 ? (
        products.map((product) => <p key={product.id}>{product.name}</p>)
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
