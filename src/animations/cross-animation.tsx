import React from "react";
import cross from "../assets/cross.json";
import Lottie from "react-lottie";

export const CrossAnimation = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: cross,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="cross_animation">
            <Lottie
                options={defaultOptions}
                isClickToPauseDisabled={true}
                height={60}
                width={60}
                speed={0.5}
            />
        </div>
    );
};
