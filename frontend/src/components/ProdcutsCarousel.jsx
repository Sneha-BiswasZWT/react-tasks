import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductsCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API using Axios
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        console.log("Fetched Products:", response.data);
        setProducts(response.data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: { breakpoint: { max: 1324, min: 1005 }, items: 3, slidesToSlide: 1 },
    medium: { breakpoint: { max: 1005, min: 700 }, items: 2, slidesToSlide: 1 },
    small: { breakpoint: { max: 700, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  if (loading) return <h2>Loading products...</h2>;

  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="container carousel-products">
      <h2>Our Products</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="card"
            style={{ textAlign: "center", padding: "10px" }}
          >
            <div className="product-name">{product.name}</div>
            <img
              src={`http://localhost:5000/uploads/${
                product.image_url
              }?timestamp=${Date.now()}`}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo2.png"; // backup image if broken
              }}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;
