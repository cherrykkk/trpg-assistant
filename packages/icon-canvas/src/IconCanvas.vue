<template>
  <div class="icon-canvas-container" @pointerdown="handlePointerdown">
    <canvas ref="mapCanvasRef" class="map-canvas" :width="128" :height="128"></canvas>
  </div>
  <button @click="handleOk">完成</button>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, type HTMLAttributes, watch } from "vue";
import { moveBrush, endBrush, startBrushPaint, autoDetectRefresh, undo } from "./store";
import { canvasToBlob } from "./utils";

type ActionType = "brush" | "moveLayer" | "moveCanvas" | "erase" | "auto";
const brushTypeOfMouse = ref<ActionType>("brush");

function handlePointerdown(e: PointerEvent) {
  if (!mapCanvasRef.value) throw Error();

  e.preventDefault();
  startBrushPaint(e, mapCanvasRef.value, "brush", "#333");
}

document.addEventListener("pointermove", (e) => {
  moveBrush(e);
});
document.addEventListener("pointerup", () => {
  endBrush();
});

const mapCanvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  const ctx = mapCanvasRef.value?.getContext("2d");
  if (!ctx) throw Error();

  autoDetectRefresh(ctx);
});

function handleOk() {
  if (!mapCanvasRef.value) return;
  const blobPic = canvasToBlob(mapCanvasRef.value);
}
</script>

<style lang="less" scoped>
.map-canvas {
  background-color: white;
  border: 1px solid black;
}
.icon-canvas-container {
  position: absolute;
  width: 100%;
  height: 100%;
  touch-action: none;
  overflow: hidden;
  -webkit-user-select: none; // 防止手写笔长按时选中并出现菜单， ipad 上必须加 -webkit 才管用
  user-select: none;
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
