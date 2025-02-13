import React from "react";

function Hero({ title, imageurl }) {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Welcome to our team, where joy is at the heart of everything we do!
          We’re passionate about bringing smiles to faces and turning cherished
          memories into lasting treasures. With creativity, care, and a shared
          love for life’s special moments, we craft personalized experiences and
          keepsakes that celebrate the beauty of connection. Our mission is
          simple: to spread happiness, one memory at a time, and help you hold
          onto the moments that truly matter.
        </p>
      </div>
      <div className="banner">
        <img src={imageurl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
}

export default Hero;
