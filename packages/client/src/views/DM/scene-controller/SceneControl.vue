<template>
  <div class="scene-control-container">
    <resizable-panel>
      <el-tree
        :data="useSceneStore().sceneTree"
        node-key="id"
        default-expand-all
        :props="{ label: 'name' }"
        :current-node-key="currentScene?.id"
        :highlight-current="true"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
      <el-button type="primary" @click="handleClickAddButton"> 增加新场景 </el-button>
    </resizable-panel>
    <div class="scene-control">
      <div class="scene-header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="scene in useSceneStore().path"
            @click="useSceneStore().currentScene = scene"
          >
            <a>{{ scene.name }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-if="!useSceneStore().isEditing" style="white-space: pre">
          <el-button
            type="primary"
            @click="() => (useSceneStore().isCombating = !useSceneStore().isCombating)"
            >切换</el-button
          >
          <el-button
            type="primary"
            v-if="!isCombating"
            @click="() => (useSceneStore().isEditing = true)"
            >编辑</el-button
          >
        </div>
      </div>
      <div class="scene-info-container" :key="currentScene?.id" v-if="!isCombating">
        <template v-if="!isEditing && currentScene">
          <SceneStoryRenderer :scene="currentScene" />
        </template>
        <template v-if="isEditing">
          <SceneStoryEditor :scene="currentScene" />
        </template>
      </div>
      <div class="scene-info-container" :key="currentScene?.id" v-if="isCombating">
        <CanvasMapEditor v-if="isCombating" :map-info="mapInfo">
          <template #characters> <CharactersPanel /></template
        ></CanvasMapEditor>
      </div>
    </div>
    <ResizablePanel v-if="!isEditing && !isCombating" resize-direction="left" :default-width="200">
      <CharactersPanel />
    </ResizablePanel>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import SceneStoryRenderer from "./SceneStoryRenderer.vue";
import SceneStoryEditor from "./SceneStoryEditor.vue";
import CanvasMapEditor from "@/views/components/CanvasMapEditor.vue";
import ResizablePanel from "../../components/ResizablePanel.vue";
import CharactersPanel from "../components/CharactersPanel.vue";
import { useSceneStore } from "@/stores/useSceneStore";
import type { Scene } from "@trpg/shared";
import { ref } from "vue";
import { createCanvasMapTemplate } from "@/utils";

const { isEditing, isCombating, currentScene } = storeToRefs(useSceneStore());

const mapInfo = ref(createCanvasMapTemplate());

function handleNodeClick(scene: Scene) {
  useSceneStore().currentScene = scene;
}

function handleClickAddButton() {
  useSceneStore().isEditing = true;
  useSceneStore().currentScene = null;
}
</script>

<style lang="less" scoped>
.scene-control-container {
  display: flex;
  overflow: hidden;
  height: 100%;
}

:deep(.scene-control) {
  margin-top: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  p {
    text-align: left;
  }

  :deep(.character-drawer) {
    text-align: left;

    :deep(.el-drawer__body) {
      p {
        text-align: left;
      }
    }
  }
}

.scene-header {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

.scene-info-container {
  padding: 10px;
  flex-grow: 1;
  overflow: hidden;
}
</style>
