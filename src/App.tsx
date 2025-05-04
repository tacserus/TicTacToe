import React from "react";
import "./App.css";
import "./pages/main-page/main-page-style.css";
import "./pages/undefined-page/undefined-page-style.css";
import "./pages/game-page/game-page-style.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./routing/app-router.ts";
import MainPage from "./pages/main-page/main-page";
import { gameConfig } from "./game-config.ts";
import UndefinedPage from "./pages/undefined-page/undefined-page.tsx";
import { GamePage } from "./pages/game-page/game-page.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRouter.Main} element={<MainPage />} />
                <Route
                    path={AppRouter.GamePage}
                    element={<GamePage {...gameConfig} />}
                />
                <Route path={AppRouter.Undefined} element={<UndefinedPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
