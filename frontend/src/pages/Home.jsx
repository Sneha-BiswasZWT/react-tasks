import React, { useContext } from "react";
import { Context } from "../main";
import Hero from "../components/Hero";
import ProductsCarousel from "../components/ProdcutsCarousel";

const Home = () => {
  return (
    <>
      <Hero title={"Welcome to Polaroid Talkies"} imageurl={"/logo2.png"} />
      <ProductsCarousel />
    </>
  );
};

export default Home;
