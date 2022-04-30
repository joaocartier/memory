import App from "App";
import Game from "components/game/Game";
import NewGame from "components/game/NewGame";
import React from "react";
import {
  BrowserRouter,
  Routes as ReactRouterRoutes,
  Route,
} from "react-router-dom";

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<NewGame />}></Route>
        <Route path="game" element={<Game />}></Route>
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
