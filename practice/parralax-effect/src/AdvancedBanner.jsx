import { ParallaxBanner } from "react-scroll-parallax";
import React from "react";

export const AdvancedBannerTop = () => {
  return (
    <ParallaxBanner
      layers={[
        {
          image: "/bg-teal.png",
          translateY: [0, 30],

          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/overlay.png",
          translateY: [0, 0],
          scale: [1, 3],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/circle4.png",
          translateY: [5, 30],
          opacity: [1, 0.5],
          scale: [0.6, 0.8],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/circle3.png",
          translateY: [5, 30],
          opacity: [1, 0.5],
          scale: [0.6, 0.7],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/circle2.png",
          translateY: [5, 30],
          opacity: [1, 0.5],
          scale: [0.6, 0.4],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/circle1.png",
          translateY: [5, 30],
          opacity: [1, 0.5],
          scale: [0.6, 0.2],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/breathe.png",
          translateY: [7, 40],

          scale: [0.6, 0.6, "easeInOutSine"],
          shouldAlwaysCompleteAnimation: true,
        },

        {
          image: "/birds.png",
          translateX: ["-50%", "50%"],
          opacity: [1, 0.5],
          scale: [0.9, 1.05, "easeInOutSine"],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/mountains.png",
          translateY: [0, 20],
          opacity: [1, 0.7],
          scale: [1, 1.05, "easeInOutSine"],
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image: "/girl.png",
          translateY: [10, 20],
          scale: [0.8, 1.05, "easeInOutSine"],

          shouldAlwaysCompleteAnimation: true,
        },
      ]}
      className="full"
    />
  );
};
