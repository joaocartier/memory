import { Transition } from "@headlessui/react";
import { ResultMap } from "components/game/Game";
import { Grid } from "components/game/useGame";
import React from "react";

interface TilesProps {
  grid: Grid;
  columns: number;
  result: ResultMap;
  onOpen: (tile: string) => void;
}

export type TileStatus = "closed" | "open" | "revealed" | "peak";

interface TileProps {
  status: TileStatus;
  value: string;
  onOpen: (tile: string) => void;
}

const Tile = React.memo(({ status = "closed", value, onOpen }: TileProps) => {
  console.log("Rendering tile", value, status);
  return (
    <button
      onClick={() => onOpen(value)}
      className={`transition w-16 h-16 lg:w-24 lg:h-24 rounded-full 
      ${
        status === "peak"
          ? "bg-accent"
          : status === "closed"
          ? "bg-primary-600"
          : "bg-secondary"
      } 
      focus-visible:ring-4 ${
        status === "peak"
          ? "focus-visible:ring-primary"
          : "focus-visible:ring-accent"
      } outline-none text-white font-bold`}
    >
      <Transition
        show={status !== "closed"}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {value}
      </Transition>
    </button>
  );
});

function Tiles({ grid, columns, result, onOpen }: TilesProps) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((el, idx) => {
        return (
          <Tile
            onOpen={() => onOpen(el.value)}
            key={idx}
            status={result[el.value]}
            value={el.value}
          />
        );
      })}
    </div>
  );
}

export default React.memo(Tiles);
