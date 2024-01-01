<template>
  <div class="map-previewer">
    <!-- <SandboxMap v-if="currentMap" :map-info="currentMap" :follow-camera="false" /> -->
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSocketStore } from "@/stores/useSocketStore";
// import SandboxMap from "@trpg/components/sandbox-canvas/SandboxMap.vue";

const { currentMap } = storeToRefs(useSocketStore());
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
