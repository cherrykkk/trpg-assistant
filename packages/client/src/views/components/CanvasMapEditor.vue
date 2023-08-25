<template>
  <div class="map-canvas-editor">
    <div
      class="map-canvas-container"
      @wheel.prevent="handleWheelEvent"
      @pointerdown="handlePointerdown"
    >
      <canvas
        ref="mapCanvasRef"
        class="map-canvas"
        :width="map.width"
        :height="map.height"
        :style="mapCanvasStyle"
      ></canvas>
    </div>
    <ResizablePanel resize-direction="left" :default-width="160" :min-width="160">
      <div style="display: flex; padding: 0 10px">
        宽<EditCell style-type="textLine" v-model="map.width" /> 高<EditCell
          style-type="textLine"
          v-model="map.height"
        />
      </div>
      <el-color-picker v-model="currentColor" show-alpha @active-change="handleActiveChange" />
      <ElRadioGroup v-model="mousedownMode" size="small">
        <ElRadioButton label="brush">画笔</ElRadioButton>
        <ElRadioButton label="moveCanvas">画布移动</ElRadioButton>
        <ElRadioButton label="moveLayer">图层移动</ElRadioButton>
        <ElRadioButton label="erase">橡皮</ElRadioButton>
      </ElRadioGroup>
      <ElButton @click="inDMView = !inDMView">{{ inDMView ? "DM 视角" : "PL 视角" }}</ElButton>
      <div class="layers-container">
        <div v-for="layer in map.layers" class="layer-content" @click="currentLayer = layer">
          <div v-if="currentLayer === layer" class="current-layer">
            <EditCell v-model="layer.layerName" style-type="textLine" />
            <div class="current-layer-buttons">
              <span
                class="layer-button"
                @click="layer.playerVisible = !layer.playerVisible"
                :style="{ color: layer.playerVisible ? '#333' : '#ccc' }"
                >pl</span
              >
              <img
                src="@/assets/icon-delete.svg"
                class="layer-button"
                @click="deleteCurrentLayer"
              />
            </div>
          </div>
          <div v-else>
            {{ layer.layerName }}
            <div style="font-size: 12px">
              <span v-if="layer.playerVisible">pl</span>
            </div>
          </div>
        </div>
        <div class="layer-content" @click="handleAddLayer">+</div>
        <div class="characters-container">
          <slot name="characters"></slot>
        </div>
      </div>
    </ResizablePanel>
  </div>
</template>

<script lang="ts" setup>
import ResizablePanel from "@/views/components/ResizablePanel.vue";
import { ref, onMounted, computed, type HTMLAttributes, watch, type PropType } from "vue";
import type { BrushAction, CanvasMap, LayerInfo, Point } from "@trpg/shared";
import { useEventListener } from "@vueuse/core";
import { ElButton, ElRadioButton, ElRadioGroup } from "element-plus";
import EditCell from "@/views/components/EditCell.vue";

const currentColor = ref("#333");

function handleActiveChange(color: string) {
  currentColor.value = color;
}
const props = defineProps({
  mapInfo: { type: Object as PropType<CanvasMap>, required: true },
});
const map = ref(props.mapInfo);

const canvasDOMRectOffset = { left: 0, top: 0 };

const currentLayer = ref(map.value.layers[0]);

if (map.value.layers.length === 0) {
  handleAddLayer();
}
function handleAddLayer() {
  const newLayer = { playerVisible: true, brushActions: [], layerName: "新建图层" };
  map.value.layers.push(newLayer);
  currentLayer.value = newLayer;
}

const mousedownMode = ref<"brush" | "moveLayer" | "moveCanvas" | "erase">("brush");
const pointerMode = ref<"brush" | "moveLayer" | "moveCanvas" | "erase" | null>(null);
let newAction: BrushAction | null = null;
let previousPoint: Point | null = null;

function handlePointerdown(e: PointerEvent) {
  if (!mapCanvasRef.value) throw Error();

  if (e.pointerType === "touch") {
    pointerMode.value = "moveLayer";
  } else if (e.pointerType === "pen") {
    pointerMode.value = "brush";
  } else if (e.pointerType === "mouse") {
    pointerMode.value = mousedownMode.value;
  }

  e.preventDefault();

  const rect = mapCanvasRef.value.getBoundingClientRect();
  canvasDOMRectOffset.left = rect.left;
  canvasDOMRectOffset.top = rect.top;
  previousPoint = e;
  newAction = { brushType: "line", points: [], color: currentColor.value };
  addCanvasPointToNewAction(e);
  currentLayer.value.brushActions.push(newAction);
}

function handleMoveErase() {}

useEventListener(document, "pointermove", (e) => {
  if (pointerMode.value === "brush") {
    addCanvasPointToNewAction(e);
    needRefreshCanvas = true;
  } else if (pointerMode.value === "moveCanvas") {
    if (!previousPoint) return;
    handleMoveCanvas(previousPoint.x - e.x, previousPoint.y - e.y);
    previousPoint = e;
  } else if (pointerMode.value === "moveLayer") {
    if (!previousPoint) return;
    handleMoveLayer(e.movementX, e.movementY, currentLayer.value);
    needRefreshCanvas = true;
  } else if (pointerMode.value === "erase") {
    handleMoveErase();
  }
});

const { handleScaleCanvas, handleMoveCanvas, handleMoveLayer, addCanvasPointToNewAction } =
  generateCanvasMapOperator(map.value!);

function generateCanvasMapOperator(map: CanvasMap) {
  return {
    handleScaleCanvas: (deltaY: number) => {
      let { scale } = map;
      scale -= deltaY / 200;
      if (scale > 3) {
        scale = 3;
      }
      if (scale < 0.2) {
        scale = 0.2;
      }
      map.scale = scale;
    },

    handleMoveCanvas: (deltaX: number, deltaY: number) => {
      let { offsetX, offsetY, width, height } = map;
      offsetX -= deltaX;
      offsetY -= deltaY;

      const minX = 100 - width;
      const maxX = 100;
      const minY = 100 - height;
      const maxY = 100;

      offsetX = Math.min(maxX, offsetX);
      offsetX = Math.max(minX, offsetX);
      offsetY = Math.min(maxY, offsetY);
      offsetY = Math.max(minY, offsetY);

      map.offsetX = offsetX;
      map.offsetY = offsetY;
    },

    handleMoveLayer: (deltaX: number, deltaY: number, layer: LayerInfo) => {
      layer.brushActions.forEach((e) =>
        e.points.forEach((p) => {
          p.x += deltaX;
          p.y += deltaY;
        })
      );
    },

    addCanvasPointToNewAction: (e: Point) => {
      const { scale } = map;
      newAction?.points.push({
        x: (e.x - canvasDOMRectOffset.left) / scale,
        y: (e.y - canvasDOMRectOffset.top) / scale,
      });
    },
  };
}
const mapCanvasStyle = computed<HTMLAttributes["style"]>(() => {
  const { offsetX, offsetY, scale } = map.value;
  return {
    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
  };
});
function deleteCurrentLayer() {
  map.value.layers = map.value.layers.filter((l) => l !== currentLayer.value);
}

useEventListener(document, "pointerup", (e) => {
  pointerMode.value = null;
  newAction = null;
});

const mapCanvasRef = ref<HTMLCanvasElement>();

let needRefreshCanvas = false;

function handleWheelEvent(e: WheelEvent) {
  if (e.ctrlKey) {
    handleScaleCanvas(e.deltaY);
  } else {
    handleMoveCanvas(e.deltaX, e.deltaY);
  }
}

onMounted(() => {
  const ctx = mapCanvasRef.value?.getContext("2d");
  if (!ctx) throw Error();

  const autoDetectRefresh = () => {
    requestAnimationFrame(() => {
      if (needRefreshCanvas) {
        ctx.clearRect(0, 0, map.value.width, map.value.height);
        paintCanvas(ctx, map.value.layers, inDMView.value, currentLayer.value);
        needRefreshCanvas = false;
      }
      autoDetectRefresh();
    });
  };

  autoDetectRefresh();
});

function paintCanvas(
  ctx: CanvasRenderingContext2D,
  layers: LayerInfo[],
  inDMView: boolean,
  shawdowLayer: LayerInfo
) {
  layers.forEach((singleLayer) => {
    if (!inDMView && !singleLayer.playerVisible) return;
    if (singleLayer === shawdowLayer) {
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

const inDMView = ref(true);
watch(
  () => [inDMView, map.value, currentLayer],
  () => {
    needRefreshCanvas = true;
  },
  { deep: true }
);
</script>

<style lang="less" scoped>
.map-canvas-editor {
  position: relative;
  width: 100%;
  height: 100%;
}
.map-canvas {
  box-shadow: 0px 0px 16px 4px #333;
  background-color: white;
  transform-origin: 0 0;
}
.map-canvas-container {
  position: absolute;
  width: 100%;
  height: 100%;
  touch-action: none;
  overflow: hidden;
  border: 1px solid black;
  -webkit-user-select: none; // 防止手写笔长按时选中并出现菜单， ipad 上必须加 -webkit 才管用
  user-select: none;
  background-color: rgb(118, 116, 116);
}
.layer-content {
  border-top: 1px solid #888;
  margin: 0 10px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #99999911;
  }
  .current-layer {
    cursor: default;
    .current-layer-buttons {
      font-size: 14px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .layer-button {
        cursor: pointer;
        height: 1em;
      }
    }
  }
}
:deep(.resizable-panel) {
  position: absolute;
  height: 100%;
  right: 0;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
