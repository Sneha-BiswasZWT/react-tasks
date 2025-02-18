import { ParallaxProvider } from "react-scroll-parallax";
import { AdvancedBannerTop } from "./AdvancedBanner";
import { AuraBanner } from "./AuraBanner";
import "./style.css";
import React from "react";

export default function App() {
  return (
    <ParallaxProvider>
      <AdvancedBannerTop />
      <AuraBanner />
    </ParallaxProvider>
  );
}
