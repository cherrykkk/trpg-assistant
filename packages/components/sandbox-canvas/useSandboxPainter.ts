import { ref, watch } from "vue";
import type { BrushAction, CanvasMap, LayerInfo, Point } from "@trpg/shared";

export function useSandboxPainter(
  getMapInfo: () => CanvasMap,
  emitChange: (data: CanvasMap) => void,
  cameraUtils: {
    moveCanvas: (deltaX: number, deltaY: number) => void;
    getScale: () => number;
  },
  getCurrentLayer?: () => LayerInfo | undefined | null
) {
  const canvasDOMRectOffset = { left: 0, top: 0 };

  let actionMode: "brush" | "moveLayer" | "moveCanvas" | "erase" | null = null;
  let newAction: BrushAction | null = null;
  let previousPoint: Point | null = null;
  const historyBrushAction = [] as { layer: LayerInfo; actionIndex: number }[];

  const inDMView = ref(false);

  function addCanvasPointToNewAction(e: Point) {
    const scale = cameraUtils.getScale();
    newAction?.points.push({
      x: (e.x - canvasDOMRectOffset.left) / scale,
      y: (e.y - canvasDOMRectOffset.top) / scale,
    });
  }

  let layerToPaint: LayerInfo | null = null;
  function startBrushPaint(
    e: PointerEvent,
    mapCanvasEl: HTMLCanvasElement,
    layer: LayerInfo,
    aMode: typeof actionMode,
    bColor: string
  ) {
    actionMode = aMode;
    layerToPaint = layer;

    const rect = mapCanvasEl.getBoundingClientRect();
    canvasDOMRectOffset.left = rect.left;
    canvasDOMRectOffset.top = rect.top;
    previousPoint = e;

    if (aMode === "brush") {
      newAction = { brushType: "line", points: [], color: bColor };
      addCanvasPointToNewAction(e);

      historyBrushAction.push({ layer, actionIndex: layer.brushActions.length });
      layer.brushActions.push(newAction);
    }
  }

  function handleMoveErase() {}

  let needRefreshCanvas = true;

  function moveBrush(e: PointerEvent) {
    if (!layerToPaint) return;
    if (actionMode === "brush") {
      addCanvasPointToNewAction(e);
      needRefreshCanvas = true;
    } else if (actionMode === "moveCanvas") {
      if (!previousPoint) return;
      cameraUtils.moveCanvas(previousPoint.x - e.x, previousPoint.y - e.y);
      previousPoint = e;
    } else if (actionMode === "moveLayer") {
      if (!previousPoint) return;
      handleMoveLayer(e.movementX, e.movementY, layerToPaint);
      needRefreshCanvas = true;
    } else if (actionMode === "erase") {
      handleMoveErase();
    } else {
      return;
    }
    emitChange({ ...getMapInfo() });
  }

  let lastSelectedKey = 0;
  const autoDetectRefresh = (ctx: CanvasRenderingContext2D) => {
    requestAnimationFrame(() => {
      const currentLayer = getCurrentLayer?.();
      if (lastSelectedKey !== currentLayer?.key) {
        lastSelectedKey = Number(currentLayer?.key);
        needRefreshCanvas = true;
      }

      if (needRefreshCanvas) {
        const { width, height } = ctx.canvas;
        ctx.clearRect(0, 0, width, height);
        paintCanvas(getMapInfo().layers, ctx, inDMView.value, currentLayer);

        needRefreshCanvas = false;
      }
      autoDetectRefresh(ctx);
    });
  };

  watch(
    () => [inDMView],
    () => {
      needRefreshCanvas = true;
    }
  );

  function handleMoveLayer(deltaX: number, deltaY: number, layer: LayerInfo) {
    layer.brushActions.forEach((e) =>
      e.points.forEach((p) => {
        p.x += deltaX;
        p.y += deltaY;
      })
    );
  }

  function endBrush() {
    actionMode = null;
    newAction = null;
  }

  function undo() {
    const lastChange = historyBrushAction.pop();
    if (lastChange) {
      const { layer, actionIndex } = lastChange;
      layer.brushActions.splice(actionIndex, 1);
    }
    needRefreshCanvas = true;
  }

  return {
    inDMView,
    autoDetectRefresh,
    startBrushPaint,
    moveBrush,
    endBrush,
    requestRefresh() {
      needRefreshCanvas = true;
    },
    undo,
  };
}

function paintCanvas(
  layers: LayerInfo[],
  ctx: CanvasRenderingContext2D,
  inDMView: boolean,
  shadowLayer?: LayerInfo | null
) {
  layers.forEach((singleLayer) => {
    if (!inDMView && !singleLayer.playerVisible) return;
    if (singleLayer === shadowLayer) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = "red";
    } else {
      ctx.shadowBlur = 0;
    }
    singleLayer.brushActions.forEach((a) => {
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
  });
}

export function createCanvasMapTemplate(): CanvasMap {
  return {
    _id: "",
    mapName: "新建地图",
    gameInstanceId: "",
    layers: [],
    gridSize: 5,
    width: 400,
    height: 400,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  };
}
