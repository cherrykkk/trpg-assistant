<template>
  <div class="scene-control-container">
    <ElDrawer v-model="showSceneListDrawer" direction="ltr" size="90%">
      <SceneTreePanel :tree-data="useSocketStore().clientSceneTree" @select="changeCurrentScene" />
      <el-button type="primary" @click="handleClickAddButton"> 增加新场景 </el-button>
    </ElDrawer>
    <SandboxEditor v-if="isCombating && currentScene" />
    <template v-if="currentScene && !isCombating">
      <div class="scene-name">{{ useSocketStore().currentScene?.name }}</div>
      <ScenePanelIndex @change-scene="(scene) => (useSocketStore().currentScene = scene)" />
      <ElDrawer v-model="showCharacterListDrawer" size="80%">
        <RightBar :scene="currentScene" :key="currentScene._id" />
      </ElDrawer>
    </template>
    <div class="bottom-buttons">
      <button @click="showSceneListDrawer = true">列表</button>
      <button @click="showCharacterListDrawer = true">角色</button>
      <button @click="isCombating = !isCombating">
        {{ isCombating ? "离开沙盘" : "战斗沙盘" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ElDrawer } from "element-plus";
import RightBar from "./RightBar.vue";
import { useSocketStore } from "@/stores/useSocketStore";
import { ref } from "vue";
import ScenePanelIndex from "./scene-panel/ScenePanelIndex.vue";
import SceneTreePanel from "./SceneTreePanel.vue";
import type { ClientScene } from "@trpg/shared";
import SandboxEditor from "./SandboxEditor.vue";
import { createSceneTemplate } from "@/stores/template";

const showSceneListDrawer = ref(false);
const showCharacterListDrawer = ref(false);

const { currentScene } = storeToRefs(useSocketStore());
const isCombating = ref(false);

async function handleClickAddButton() {
  const newScene = await createSceneTemplate();

  const fatherScene = useSocketStore().currentScene;
  if (fatherScene) {
    newScene.fatherId = fatherScene?._id;
  }

  changeCurrentScene(newScene);
}

const localStorageCurrentSceneId = localStorage.getItem("config: currentSceneId") ?? "";
if (!useSocketStore().currentScene) {
  useSocketStore().currentScene =
    useSocketStore().flatClientScenes.find((e) => e._id === localStorageCurrentSceneId) ?? null;
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
  flex-direction: column;
}
.scene-name {
  font-weight: 600;
  font-size: 18px;
  margin-top: 20px;
}
.bottom-buttons {
  height: 40px;
  border-top: 1px solid;
  display: flex;
  button {
    display: inline-block;
    height: 100%;
    flex-grow: 1;
  }
}
</style>
