import { GridSize } from "components/game/NewGame";
import React from "react";

interface TilesProps {
  size: GridSize;
}

function Tile() {
  return (
    <button className="w-24 h-24 rounded-full bg-primary-600 focus-visible:ring-4 focus-visible:ring-accent outline-none"></button>
  );
}

export default function Tiles({ size }: TilesProps) {
  const rows = Number(size[0]);
  const cols = Number(size[2]);
  return (
    <div
      className="grid grid-cols-4 gap-4"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {new Array(rows * cols).fill(1).map((tile, idx) => {
        return <Tile key={idx} />;
      })}
    </div>
  );
}
