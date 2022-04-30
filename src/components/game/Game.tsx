import Tiles from "components/game/Tiles";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { GRID_SIZES, GridSize } from "components/game/NewGame";

export default function Game() {
  const [searchParams] = useSearchParams();

  let gridSize: GridSize =
    GRID_SIZES.find((option) => option.value === searchParams.get("grid"))
      ?.value ?? "4x4";

  return (
    <div className="bg-white h-screen">
      <div className="max-w-7xl h-full flex flex-col justify-between px-36 py-16 gap-y-4 mx-auto">
        <div className="flex gap-x-4 justify-between items-center">
          <h1 className="text-center text-primary text-4xl font-bold">
            memory
          </h1>

          <div className="flex items-center gap-x-4">
            <button className="px-6 focus-visible:ring-4 focus-visible:ring-primary outline-none flex items-center justify-center text-white font-bold bg-accent w-full py-3 rounded-full">
              Restart
            </button>
            <button className="px-6 focus-visible:ring-4 whitespace-nowrap focus-visible:ring-primary outline-none flex items-center justify-center text-white font-bold bg-primary-100 text-primary-600 w-full py-3 rounded-full">
              New Game
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Tiles size={gridSize} />
        </div>
        <div>
          <div>
            <span>Time</span>
            <span>0:00</span>
          </div>
          <div>
            <span>Moves</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
