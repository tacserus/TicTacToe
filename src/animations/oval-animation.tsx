import oval from "../assets/oval.json";
import Lottie from "react-lottie";
import React from "react";

export const OvalAnimation = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: oval,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="oval_animation">
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
