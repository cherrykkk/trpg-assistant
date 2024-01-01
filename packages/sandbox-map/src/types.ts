export interface MapInfo {
  mapName: string;
  layers: LayerInfo[];
  gridSize: number;
  width: number;
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

export interface LayerInfo {
  key: number;
  layerName: string;
  playerVisible: boolean;
  brushActions: BrushAction[];
  isSelected: boolean;
}

export interface BrushAction {
  brushType: "line";
  points: Point[];
  color: string;
}

export interface Point {
  x: number;
  y: number;
}
