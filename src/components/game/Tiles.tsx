import { Transition } from "@headlessui/react";
import { ITile } from "components/game/Game";
import React from "react";

interface TilesProps {
  tiles: ITile[];
  columns: number;
  onOpen: (index: number) => void;
}

export type TileStatus = "closed" | "open" | "revealed" | "peak";

interface TileProps extends ITile {
  index: number;
  onOpen: (index: number) => void;
}

const Tile = React.memo(
  ({ index, status = "closed", value, onOpen }: TileProps) => {
    return (
      <button
        onClick={() => onOpen(index)}
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
  }
);

function Tiles({ tiles, columns, onOpen }: TilesProps) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {tiles.map((el, index) => {
        return (
          <Tile
            onOpen={() => onOpen(index)}
            key={index}
            index={index}
            id={index}
            status={el.status}
            value={el.value}
          />
        );
      })}
    </div>
  );
}

export default React.memo(Tiles);
