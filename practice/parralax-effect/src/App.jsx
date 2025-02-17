import { ParallaxProvider } from "react-scroll-parallax";
import { AdvancedBannerTop } from "./AdvancedBanner";
import "./style.css";
import React from "react";

export default function App() {
  return (
    <ParallaxProvider>
      <AdvancedBannerTop />
      <div className="center full">
        <h1 className="headline gray">in.</h1>
      </div>
    </ParallaxProvider>
  );
}
