<template>
  <div class="scene-control-container">
    <resizable-panel>
      <SceneTreePanel
        :tree-data="useSceneStore().sceneTree"
        @select="useSceneStore().changeCurrentScene"
      />
      <el-button type="primary" @click="handleClickAddButton"> 增加新场景 </el-button>
    </resizable-panel>
    <ScenePanelIndex
      :path="useSceneStore().path"
      @change-scene="(scene: Scene) =>useSceneStore().currentScene = scene"
    />
    <template v-if="currentScene">
      <ResizablePanel v-if="!isCombating" resize-direction="left" :default-width="200">
        <RightBar :scene="currentScene" />
      </ResizablePanel>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import ResizablePanel from "../../components/ResizablePanel.vue";
import RightBar from "./RightBar.vue";
import { useSceneStore } from "@/stores/useSceneStore";
import { ref } from "vue";
import { createCanvasMapTemplate } from "@/utils";
import ScenePanelIndex from "./scene-panel/ScenePanelIndex.vue";
import SceneTreePanel from "./SceneTreePanel.vue";
import { createSceneTemplate, type Scene } from "@trpg/shared";

const { isCombating, currentScene } = storeToRefs(useSceneStore());

const mapInfo = ref(createCanvasMapTemplate());

function handleClickAddButton() {
  useSceneStore().changeCurrentScene(createSceneTemplate());
  useSceneStore().editTarget = null;
}
</script>

<style lang="less" scoped>
.scene-control-container {
  display: flex;
  overflow: hidden;
  height: 100%;
}
</style>
