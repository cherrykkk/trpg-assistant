<template>
  <div v-if="currentScene" class="scene-map-editor">
    <SceneMapRenderer />
    <ResizablePanel resize-direction="left">
      <div>
        <el-button @click="handleChangeAreaSize">提交修改</el-button>
        <div>x:<el-input-number size="small" v-model="currentScene.areaX" /></div>
        <div>y:<el-input-number size="small" v-model="currentScene.areaY" /></div>
        <SceneMapItemEditor :scene-info="currentScene" />
      </div>
    </ResizablePanel>
  </div>
</template>

<script lang="ts" setup>
import ResizablePanel from "@/views/components/ResizablePanel.vue";
import SceneMapItemEditor from "./SceneMapItemEditor.vue";
import { useSceneStore } from "@/stores/useSceneStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { updateSceneInfo } from "@/api/socket-tasks";
import SceneMapRenderer from "./SceneMapRenderer.vue";

const { currentScene, isEditing } = storeToRefs(useSceneStore());

function handleChangeAreaSize() {
  if (!currentScene.value) return;

  updateSceneInfo(currentScene.value.id, currentScene.value);
  isEditing.value = false;
}

const areaX = computed(() => {
  return currentScene.value?.areaX || 10;
});
const areaY = computed(() => {
  return currentScene.value?.areaY || 10;
});
</script>
<style lang="less" scoped>
.scene-map-editor {
  display: flex;
}
.combat-control {
  --area-x: v-bind(areaX);
  --area-y: v-bind(areaY);

  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-grow: 1;

  .map-container {
    --size: 50px;
    width: calc(var(--area-x) * var(--size) + 1px);
    height: calc(var(--area-y) * var(--size) + 2px);

    background: linear-gradient(#33333333 1px, #00000000 0),
      linear-gradient(90deg, #33333333 1px, #00000000 0);
    background-size: var(--size) var(--size);

    display: grid;
    grid-template-columns: repeat(var(--area-x), 1fr);
    grid-template-rows: repeat(var(--area-y), 1fr);

    position: relative;

    div {
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid #333;
      color: white;
      background-color: #00000063;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1px;
    }

    img {
      position: absolute;
      z-index: -1;
      height: 100%;
    }
  }
  .characters-content {
    width: 400px;
    border: 2px solid #cccccc;
    margin: 0 10px;
  }

  .character-tabs {
    flex-grow: 1;
    padding: 10px;
  }
}
</style>
