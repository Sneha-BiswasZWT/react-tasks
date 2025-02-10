import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Product:", data); // Debugging
        setProduct(data.product); // ✅ Fix: Access correct key
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <Wrapper>
      <div className="container">
        <h1>{product.name}</h1>
        <img
          src={product.image_url || "https://via.placeholder.com/300"}
          alt={product.name}
          style={{ width: "300px" }}
        />
        <p>{product.description}</p>
        <p className="product-data-price">
          Price: ${Number(product.price).toFixed(2)}
        </p>
        <p>Stock: {product.stock} available</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
    text-align: center;
  }
  .product-data-price {
    font-weight: bold;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary || "blue"};
  }
`;

export default SingleProduct;
