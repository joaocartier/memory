import { GridSize, GRID_SIZES } from "components/game/NewGame";
import Tiles, { TileStatus } from "components/game/Tiles";
import useGame from "components/game/useGame";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export type Value = string;
export type ResultMap = Record<string, TileStatus>;
export interface ITile {
  status: TileStatus;
  value: string;
  id: number;
}

function Game() {
  const [searchParams] = useSearchParams();

  let gridSize: GridSize =
    GRID_SIZES.find((option) => option.value === searchParams.get("grid"))
      ?.value ?? "4x4";

  const rows = Number(gridSize[0]);
  const cols = Number(gridSize[2]);

  const values: Value[] = new Array((rows * cols) / 2)
    .fill(0)
    .map((_, i) => `${i + 1}`);

  const initialTiles: ITile[] = [...values, ...values]
    .sort(() => Math.random() - 0.5)
    .map((v, idx) => ({ status: "closed", value: v, id: idx }));

  const { tiles, toggleTile } = useGame(initialTiles, gridSize);

  return (
    <div className="bg-white h-screen">
      <div className="max-w-7xl h-full flex flex-col justify-between px-12 md:px-36 py-16 gap-y-12 mx-auto">
        <div className="flex gap-x-4 justify-between items-center">
          <h1 className="text-center text-primary text-4xl font-bold">
            memory
          </h1>

          <div className="flex items-center gap-x-4">
            <button className="px-6 focus-visible:ring-4 focus-visible:ring-primary outline-none flex items-center justify-center text-white font-bold bg-accent w-full py-3 rounded-full">
              Restart
            </button>
            <Link
              to="/"
              className="px-6 focus-visible:ring-4 whitespace-nowrap focus-visible:ring-primary outline-none flex items-center justify-center text-white font-bold bg-primary-100 text-primary-600 w-full py-3 rounded-full"
            >
              New Game
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Tiles tiles={tiles} columns={cols} onOpen={toggleTile} />
        </div>
        <div className="flex items-center justify-center gap-x-8">
          <div className="flex items-center justify-between gap-x-16 px-6 py-4 rounded-lg bg-primary-100">
            <span className="font-bold text-secondary-900">Time</span>
            <span className="font-bold text-primary-600 text-2xl">0:00</span>
          </div>
          <div className="flex items-center justify-between gap-x-20 px-6 py-4 rounded-lg bg-primary-100">
            <span className="font-bold text-secondary-900">Moves</span>
            <span className="font-bold text-primary-600 text-2xl">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Game);
