import { GridSize, GRID_SIZES } from "components/game/NewGame";
import Tiles, { TileStatus } from "components/game/Tiles";
import useGame from "components/game/useGame";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export type Value = string;
export type ResultMap = Record<string, TileStatus>;

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

  const { grid, result, toggleTile } = useGame(values, gridSize);

  /**
   * Build a map ->
   *               array
   * Res map     ->
   *               value: found
   */

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
          <Tiles
            grid={grid || []}
            columns={cols}
            result={result}
            onOpen={toggleTile}
          />
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

export default React.memo(Game);
