<template>
  <div class="scene-control-container">
    <resizable-panel>
      <SceneTreePanel :tree-data="useSocketStore().clientSceneTree" @select="changeCurrentScene" />
      <el-button type="primary" @click="handleClickAddButton"> 增加新场景 </el-button>
    </resizable-panel>
    <SandboxEditor v-if="isCombating && currentScene" />
    <template v-if="currentScene && !isCombating">
      <ScenePanelIndex @change-scene="(scene) => (useSocketStore().currentScene = scene)" />
      <ResizablePanel v-if="!isCombating" resize-direction="left" :default-width="200">
        <RightBar :scene="currentScene" :key="currentScene._id" />
      </ResizablePanel>
    </template>
    <button
      style="position: absolute; bottom: 0; right: 0; z-index: 101"
      @click="isCombating = !isCombating"
    >
      {{ isCombating ? "离开沙盘" : "战斗沙盘" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import ResizablePanel from "../../components/ResizablePanel.vue";
import RightBar from "./RightBar.vue";
import { useSocketStore } from "@/stores/useSocketStore";
import { ref } from "vue";
import { getSceneTreeAndClientScenes } from "@/utils";
import ScenePanelIndex from "./scene-panel/ScenePanelIndex.vue";
import SceneTreePanel from "./SceneTreePanel.vue";
import { createSceneTemplate, type ClientScene } from "@trpg/shared";
import SandboxEditor from "./SandboxEditor.vue";

const { currentScene } = storeToRefs(useSocketStore());
const isCombating = ref(false);

function handleClickAddButton() {
  const newScene = createSceneTemplate();

  const fatherScene = useSocketStore().currentScene;
  if (fatherScene) {
    newScene.fatherId = fatherScene?._id;
  }

  const { topSceneTreeList, clientScenes } = getSceneTreeAndClientScenes([
    ...useSocketStore().allClientScenes,
    newScene,
  ]);

  useSocketStore().clientSceneTree = topSceneTreeList;
  useSocketStore().allClientScenes = clientScenes;

  changeCurrentScene(newScene);
}

const localStorageCurrentSceneId = localStorage.getItem("config: currentSceneId") ?? "";
if (!useSocketStore().currentScene) {
  useSocketStore().currentScene =
    useSocketStore().allClientScenes.find((e) => e._id === localStorageCurrentSceneId) ?? null;
}
function changeCurrentScene(scene: ClientScene) {
  localStorage.setItem("config: currentSceneId", scene._id);
  useSocketStore().currentScene = scene;
}
</script>

<style lang="less" scoped>
.scene-control-container {
  display: flex;
  overflow: hidden;
  height: 100%;
  position: relative;
}
</style>
