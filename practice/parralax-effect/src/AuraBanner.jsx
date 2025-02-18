import { ParallaxBanner } from "react-scroll-parallax";
import React from "react";

export const AuraBanner = () => {
  return (
    <ParallaxBanner
      layers={[
        {
          image: "/aurabg.png",
          translateY: [0, 0],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/overlay2.png",
          translateY: [0, 0],
          opacity: [1, 1],
          scale: [1, 1],
          shouldAlwaysCompleteAnimation: true,
        },
        // Keep circle-6 static
        {
          image: "/circle-6.png",
          translateX: [0, 0],
          translateY: [0, 0],
          scale: [1, 1],
          shouldAlwaysCompleteAnimation: true,
        },
        // Move other circles left to form a cone
        {
          image: "/circle-5.png",
          translateX: [0, -10],
          translateY: [0, -5],
          scale: [1, 1],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/circle-3.png",
          translateX: [0, -20],
          translateY: [0, -10],
          scale: [1, 1],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/circle-2.png",
          translateX: [0, -30],
          translateY: [0, -15],
          scale: [1, 1],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/circle-1.png",
          translateX: [0, -40],
          translateY: [0, -20],
          scale: [1, 1],
          shouldAlwaysCompleteAnimation: true,
        },
        // Slower circular motion for "in.png"
        {
          image: "/in.png",
          translateX: [-5, 0],
          rotate: [0, 180], // Slower rotation
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/star2.png",
          opacity: [1, 0.7],
          scale: [1, 1.05, "easeInOutSine"],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/star1.png",
          translateY: [10, 20],
          scale: [0.8, 1.05, "easeInOutSine"],
          shouldAlwaysCompleteAnimation: true,
        },
      ]}
      className="full"
    />
  );
};
