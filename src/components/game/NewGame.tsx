import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface OptionProps<T> {
  value: T;
  title: string;
}

function Option<T>({ value, title }: OptionProps<T>) {
  return (
    <RadioGroup.Option
      className="rounded-full focus-visible:ring-4 focus-visible:ring-accent outline-none"
      value={value}
    >
      {({ checked, active }) => (
        <span
          className={`select-none cursor-pointer flex text-center items-center justify-center w-full rounded-full text-white font-bold px-4 py-2 transition duration-75 ${
            checked ? "bg-primary-600" : "bg-secondary hover:bg-primary-400"
          }
          ${active ? "ring-4 ring-accent bg-red" : ""}`}
        >
          {title}
        </span>
      )}
    </RadioGroup.Option>
  );
}

function Label({ children }: { children: string }) {
  return (
    <RadioGroup.Label className="text-secondary-900 font-bold text-lg">
      {children}
    </RadioGroup.Label>
  );
}

type GameOption<T> = {
  title: string;
  value: T;
};

export type Theme = "numbers" | "icons";
export type GridSize = "4x4" | "6x6";
export type NumberPlayers = 1 | 2 | 3 | 4;

const THEMES: GameOption<Theme>[] = [
  {
    title: "Numbers",
    value: "numbers",
  },
  {
    title: "Icons",
    value: "icons",
  },
];

const NUM_PLAYERS: GameOption<NumberPlayers>[] = new Array(4)
  .fill(0)
  .map((_, idx) => {
    return { title: `${idx + 1}`, value: (idx + 1) as NumberPlayers };
  });

export const GRID_SIZES: GameOption<GridSize>[] = [
  {
    title: "4x4",
    value: "4x4",
  },
  {
    title: "6x6",
    value: "6x6",
  },
];

interface GameOptionSelectionProps<T> {
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  title: string;
  options: GameOption<T>[];
}
function GameOptionSelection<T>({
  value,
  onChange,
  title,
  options,
}: GameOptionSelectionProps<T>) {
  return (
    <RadioGroup className="space-y-2" value={value} onChange={onChange}>
      <Label>{title}</Label>
      <div
        className={`grid w-full gap-x-2`}
        style={{
          gridTemplateColumns: `repeat(${Math.min(
            options.length,
            4
          )},minmax(0, 1fr))`,
        }}
      >
        {options.map((option, idx) => {
          return <Option key={idx} value={option.value} title={option.title} />;
        })}
      </div>
    </RadioGroup>
  );
}

export default function NewGame() {
  const [theme, setTheme] = useState<Theme>(THEMES[0].value);
  const [numPlayers, setNumPlayers] = useState<NumberPlayers>(
    NUM_PLAYERS[0].value
  );
  const [gridSize, setGridSize] = useState<GridSize>(GRID_SIZES[0].value);
  return (
    <div className="h-screen bg-primary py-16 flex items-center justify-center">
      <main className="flex flex-col gap-y-16">
        <h1 className="text-center text-white text-4xl font-bold">memory</h1>
        <section className="bg-white rounded-lg p-8 space-y-8 min-w-[500px]">
          <GameOptionSelection
            value={theme}
            onChange={setTheme}
            title="Select Theme"
            options={THEMES}
          />
          <GameOptionSelection
            value={numPlayers}
            onChange={setNumPlayers}
            title="Number of Players"
            options={NUM_PLAYERS}
          />
          <GameOptionSelection
            value={gridSize}
            onChange={setGridSize}
            title="Grid Size"
            options={GRID_SIZES}
          />

          <Link
            className="focus-visible:ring-4 focus-visible:ring-primary outline-none mt-6 flex items-center justify-center text-white font-bold bg-accent w-full py-2 rounded-full"
            to={`/game?theme=${theme}&players=${numPlayers}&grid=${gridSize}`}
          >
            start game
          </Link>
        </section>
      </main>
    </div>
  );
}
