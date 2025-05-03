import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import MainPage from "./pages/main-page/main-page";
import "./pages/main-page/grid-style.css";
import { gameConfig } from "./pages/main-page/game-config.ts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRouter.Main} element={<MainPage {...gameConfig} />} />
        {/*<Route path={AppRouter.Undefined} element={<UndefinedPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
