import { ref, watch } from "vue";
import type { BrushAction, Point } from "./types";

let actionMode: "brush" | "moveLayer" | "moveCanvas" | "erase" | null = null;
let newAction: BrushAction | null = null;
let previousPoint: Point | null = null;

const canvasDOMRectOffset = { left: 0, top: 0 };

function addCanvasPointToNewAction(e: Point) {
  newAction?.points.push({
    x: e.x - canvasDOMRectOffset.left,
    y: e.y - canvasDOMRectOffset.top,
  });
}

export function startBrushPaint(
  e: PointerEvent,
  mapCanvasEl: HTMLCanvasElement,
  aMode: typeof actionMode,
  bColor: string
) {
  actionMode = aMode;

  const rect = mapCanvasEl.getBoundingClientRect();
  canvasDOMRectOffset.left = rect.left;
  canvasDOMRectOffset.top = rect.top;

  previousPoint = e;

  if (aMode === "brush") {
    newAction = { brushType: "line", points: [], color: bColor };
    addCanvasPointToNewAction(e);

    brushActions.value.push(newAction);
  }
}

function handleMoveErase() {}

let needRefreshCanvas = true;

export function moveBrush(e: PointerEvent) {
  if (actionMode === "brush") {
    addCanvasPointToNewAction(e);
    needRefreshCanvas = true;
  } else if (actionMode === "erase") {
    handleMoveErase();
  } else {
    return;
  }
}

let lastSelectedKey = 0;
export const autoDetectRefresh = (ctx: CanvasRenderingContext2D) => {
  requestAnimationFrame(() => {
    if (needRefreshCanvas) {
      const { width, height } = ctx.canvas;
      ctx.clearRect(0, 0, width, height);
      paintCanvas(brushActions.value, ctx);

      needRefreshCanvas = false;
    }
    autoDetectRefresh(ctx);
  });
};

export function endBrush() {
  actionMode = null;
  newAction = null;
}

export function undo() {
  brushActions.value.pop();
  needRefreshCanvas = true;
}

function paintCanvas(brushActions: BrushAction[], ctx: CanvasRenderingContext2D) {
  brushActions.forEach((a) => {
    ctx.beginPath();
    ctx.strokeStyle = a.color;
    ctx.lineWidth = 2;
    if (a.brushType === "line") {
      const start = a.points[0];
      ctx.moveTo(start.x, start.y);
      a.points.forEach((p) => {
        ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }
  });
}

const brushActions = ref<BrushAction[]>([]);
