<template>
  <div class="map-previewer">
    <div class="map-canvas-container" @wheel.prevent="handleWheelEvent">
      <canvas
        ref="mapCanvasRef"
        class="map-canvas"
        :width="mapInfo.width"
        :height="mapInfo.height"
        :style="mapCanvasStyle"
      ></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, type HTMLAttributes, watch } from "vue";
import { useEventListener } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useSocketStore } from "@/stores/useSocketStore";
import { paintCanvas } from "@/utils/index";

const { currentSceneMapCanvasInfo: mapInfo } = storeToRefs(useSocketStore());

useEventListener(document, "pointermove", (e) => {
  handleMoveCanvas(e.movementX, e.movementY);
});

function handleMoveCanvas(deltaX: number, deltaY: number) {
  let { offsetX, offsetY, width, height } = mapInfo.value;
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

  mapInfo.value.offsetX = offsetX;
  mapInfo.value.offsetY = offsetY;
}

function handleScaleCanvas(deltaY: number) {
  let { scale } = mapInfo.value;
  scale -= deltaY / 200;
  if (scale > 3) {
    scale = 3;
  }
  if (scale < 0.2) {
    scale = 0.2;
  }
  mapInfo.value.scale = scale;
}

const mapCanvasStyle = computed<HTMLAttributes["style"]>(() => {
  const { offsetX, offsetY, scale } = mapInfo.value;
  return {
    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
  };
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
        ctx.clearRect(0, 0, mapInfo.value.width, mapInfo.value.height);
        paintCanvas(ctx, mapInfo.value.layers, false);
        needRefreshCanvas = false;
      }
      autoDetectRefresh();
    });
  };

  autoDetectRefresh();
});

watch(
  () => [mapInfo.value],
  () => {
    needRefreshCanvas = true;
  },
  { deep: true }
);
</script>

<style lang="less" scoped>
.map-previewer {
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
</style>
