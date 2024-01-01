export interface MapGridConfig {
  row: number;
  column: number;
  cellSize: number;
  activeCells: string[];
}

export type CellPoint = string;

export interface MapItem {
  attachedTo: CellPoint;
  name: string;
  data: unknown;
  id: number;
}

export interface MapInstance {
  gridConfig: MapGridConfig;
  items: MapItem[];
}
