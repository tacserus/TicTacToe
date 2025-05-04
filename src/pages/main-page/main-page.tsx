import React from "react";
import { GameAnimation } from "../../animations/game-animation.tsx";
import { Link } from "react-router";
import AppRouter from "../../routing/app-router.ts";

export default function MainPage() {
    return (
        <div className="main_page_container">
            <div className="main_page_title">Tic-Tac-Toe!</div>
            <div className="main-page-content">
                <GameAnimation />
                <Link
                    to={AppRouter.GamePage}
                    className="main_page_start_button"
                    type="button"
                >
                    Start game
                </Link>
            </div>
        </div>
    );
}
