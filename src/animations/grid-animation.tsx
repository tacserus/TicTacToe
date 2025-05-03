import grid from "../assets/grid.json";
import Lottie from "react-lottie";
import React from "react";

export function GridAnimation() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: grid,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="grid_animation">
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        height={300}
        width={300}
        speed={0.5}
      />
    </div>
  );
}
