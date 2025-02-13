import React from "react";

function ProductBanner({ title, imageurl }) {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Kaagaz ki kashtiyon mai yaado ki barsaat Sailing Through Memories -
          Where Every Drop Tells a Story.
        </p>
      </div>
      <div className="banner">
        <img src={imageurl} alt="hero" className="product-banner-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
}

export default ProductBanner;
