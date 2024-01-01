<template>
  <div class="sandbox-map">
    <div
      class="map-canvas-container"
      @wheel.prevent="handleWheelEvent"
      @pointerdown="handlePointerdown"
    >
      <canvas
        ref="mapCanvasRef"
        class="map-canvas"
        :width="mapInfo.width"
        :height="mapInfo.height"
        :style="mapCanvasStyle"
      ></canvas>
    </div>
    <button v-if="followCamera">跟随镜头</button>
    <template v-if="editable">
      <button
        v-for="{ label, value } in brushTypeButtons"
        :key="value"
        @click="brushTypeOfMouse = value"
        :style="{ color: brushTypeOfMouse === value ? 'red' : 'black' }"
      >
        {{ label }}
      </button>
      <button @click="undo">撤销</button>
      <button @click="inDMView = !inDMView">{{ inDMView ? "DM 视角 " : "PL 视角" }}</button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, type HTMLAttributes, type PropType, watch } from "vue";
import type { MapInfo } from "./types";
import { useSandboxPainter } from "./useSandboxPainter";
import { useSandboxCamera } from "./useSandboxCamera";
import { ElMessage } from "element-plus";
import { mapInstance as mapInfo } from "./store";

const props = defineProps({
  editable: Boolean,
  currentColor: String,
  followCamera: Boolean,
});

const emit = defineEmits<{ (event: "change", data: MapInfo): void }>();

const { cameraTransformStyle, scaleCanvas, moveCanvas, cameraState } = useSandboxCamera();

const mapCanvasStyle = computed<HTMLAttributes["style"]>(() => {
  const gridSize = mapInfo.gridSize * 2;
  return {
    ...cameraTransformStyle.value,
    "background-size": `${gridSize}px ${gridSize}px`,
  };
});

const { inDMView, moveBrush, endBrush, startBrushPaint, autoDetectRefresh, requestRefresh, undo } =
  useSandboxPainter(
    () => mapInfo,
    {
      moveCanvas: (deltaX, deltaY) => moveCanvas(deltaX, deltaY, mapInfo.width, mapInfo.height),
      getScale: () => cameraState.scale,
    },
    props.editable
      ? () => {
          return mapInfo.layers.find((e) => e.isSelected);
        }
      : undefined
  );

function handleWheelEvent(e: WheelEvent) {
  if (e.ctrlKey) {
    scaleCanvas(e.deltaY);
  } else {
    moveCanvas(e.deltaX, e.deltaY, mapInfo.width, mapInfo.height);
  }
}

watch(
  () => [mapInfo.width, mapInfo.height],
  () => {
    requestRefresh();
  }
);

type ActionType = "brush" | "moveLayer" | "moveCanvas" | "erase" | "auto";
const brushTypeOfMouse = ref<ActionType>("brush");
const pointerMode = ref<"brush" | "moveLayer" | "moveCanvas" | "erase" | null>(null);

const brushTypeButtons: { label: string; value: ActionType }[] = [
  { label: "自动", value: "auto" },
  { label: "画笔", value: "brush" },
  { label: "图层移动", value: "moveLayer" },
  { label: "画布移动", value: "moveCanvas" },
  { label: "橡皮", value: "erase" },
];

function handlePointerdown(e: PointerEvent) {
  if (!mapCanvasRef.value) throw Error();

  const currentLayer = mapInfo.layers.find((e) => e.isSelected);
  if (!currentLayer) {
    ElMessage("未选择图层！");
    return;
  }

  if (inDMView.value === false && currentLayer.playerVisible === false) {
    console.log("当前图层不可见");
    return;
  }

  pointerMode.value = detectBrushTypeByPointerType(e);

  e.preventDefault();
  startBrushPaint(
    e,
    mapCanvasRef.value,
    currentLayer,
    pointerMode.value,
    props.currentColor ?? "#333"
  );
}

if (props.editable) {
  document.addEventListener("pointermove", (e) => {
    moveBrush(e);
  });
  document.addEventListener("pointerup", () => {
    endBrush();
  });
  inDMView.value = true;
}

const mapCanvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  const ctx = mapCanvasRef.value?.getContext("2d");
  if (!ctx) throw Error();

  autoDetectRefresh(ctx);
});

function detectBrushTypeByPointerType(e: PointerEvent) {
  if (brushTypeOfMouse.value === "auto") {
    if (e.pointerType === "touch") {
      return "moveLayer";
    } else if (e.pointerType === "pen") {
      return "brush";
    } else {
      return "brush";
    }
  } else {
    return brushTypeOfMouse.value;
  }
}
</script>

<style lang="less" scoped>
.sandbox-map {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
}
.map-canvas {
  box-shadow: 0px 0px 16px 4px #333;
  background-color: white;
  transform-origin: 0 0;
  background-image: linear-gradient(90deg, rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%),
    linear-gradient(rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
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
button {
  position: relative;
  float: left;
}
.layers-container {
  position: absolute;
  right: 0;
  font-size: 12px;
}
</style>
