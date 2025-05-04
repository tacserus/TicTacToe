import React from "react";
import game from "../assets/game.json";
import Lottie from "react-lottie";
import { GridAnimation } from "./grid-animation.tsx";

export function GameAnimation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: game,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="game_animation">
            <GridAnimation />
            <Lottie
                options={defaultOptions}
                isClickToPauseDisabled={true}
                height={300}
                width={300}
                speed={1.5}
            />
        </div>
    );
}
