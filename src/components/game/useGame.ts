import { ResultMap, Value } from "components/game/Game";
import { GridSize } from "components/game/NewGame";
import { useCallback, useEffect, useMemo, useState } from "react";

export type Grid = { value: string; status: string }[];

export default function useGame(values: Value[], gridSize: GridSize) {
  const [grid, setGrid] = useState<Grid | null>(null);
  const initialResult = useMemo(
    () =>
      values.reduce(function (map: ResultMap, obj) {
        map[obj] = "closed";
        return map;
      }, {}),
    [values]
  );

  useEffect(() => {
    if (!grid) {
      setGrid(
        [...values, ...values]
          .sort(() => Math.random() - 0.5)
          .map((el) => ({ value: el, status: "closed" }))
      );
    }
    console.log({ grid });
  }, [grid, values]);

  const [result, setResult] = useState<ResultMap>(initialResult);

  const toggleTile = useCallback(
    (tile: string) => {
      let updatedResult = { ...result };
      let status = updatedResult[tile];
      console.log({ status });
      switch (status) {
        case "closed":
          updatedResult[tile] = "peak";
          break;
        case "peak":
          updatedResult[tile] = "open";
          break;
        default:
          break;
      }

      setResult(updatedResult);
    },
    [result]
  );

  return { result, toggleTile, grid };
}
