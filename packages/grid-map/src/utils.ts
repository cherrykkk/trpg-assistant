import type { CellPoint } from "./types";

/** todo: find a public lib or write it more stably */
export function getUniqueId() {
  return Date.now() + Math.random();
}

export function parseCellId(cellId: CellPoint) {
  const [x, y] = cellId.split(",");
  return [Number(x), Number(y)];
}
