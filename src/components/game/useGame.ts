import { ITile } from "components/game/Game";
import { GridSize } from "components/game/NewGame";
import { useCallback, useEffect, useMemo, useState } from "react";

const MATCH_NEEDED_COUNT = 2;
const DEFAULT_DELAY = 500;

export default function useGame(initialTiles: ITile[], gridSize: GridSize) {
  const [tiles, setTiles] = useState([...initialTiles]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const isGameOver = useMemo(
    () =>
      tiles.filter((tile) => tile.status === "revealed").length ===
      initialTiles.length,
    [tiles, initialTiles.length]
  );

  if (isGameOver) {
    alert("Game Over!");
  }

  const handleMatchTiles = useCallback(
    (indexes: number[]) => {
      setTimeout(() => {
        setSelectedTiles([]);

        let updatedTiles = [...tiles];
        for (const i of indexes) {
          updatedTiles[i].status = "revealed";
        }
        setTiles(updatedTiles);
      }, DEFAULT_DELAY);
    },
    [tiles]
  );

  const handleCloseTiles = useCallback(
    (indexes: number[]) => {
      setTimeout(() => {
        setSelectedTiles([]);
        let updatedTiles = [...tiles];
        for (const i of indexes) {
          updatedTiles[i].status = "closed";
        }
        setTiles(updatedTiles);
      }, DEFAULT_DELAY);
    },
    [tiles]
  );

  /**
   * useEffect when a tile is pushed to the selected
   * Check if it's the last one (selected.length === MATCH_NEEDED_COUNT)
   * setTimeout to perform state update
   */

  useEffect(() => {
    if (selectedTiles.length === 0) return;

    if (selectedTiles.length === MATCH_NEEDED_COUNT) {
      let value = tiles[selectedTiles[0]].value;
      if (selectedTiles.every((v) => tiles[v].value === value)) {
        handleMatchTiles(selectedTiles);
      } else {
        handleCloseTiles(selectedTiles);
      }
    }
  }, [
    selectedTiles.length,
    selectedTiles,
    tiles,
    handleMatchTiles,
    handleCloseTiles,
  ]);

  const toggleTile = (index: number) => {
    if (selectedTiles.length >= MATCH_NEEDED_COUNT) return;
    if (selectedTiles.includes(index)) return;
    if (tiles[index].status !== "closed") return;
    setSelectedTiles([...selectedTiles, index]);
    let updatedTiles = [...tiles];
    updatedTiles[index].status = "peak";
    setTiles(updatedTiles);
  };

  return { tiles, toggleTile, isGameOver };
}
