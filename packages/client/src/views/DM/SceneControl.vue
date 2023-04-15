<template>
  <div class="tab-page">
    <div class="scene-tree-content">
      <el-tree
        :data="useSceneStore().sceneTree"
        node-key="_id"
        default-expand-all
        :props="{ label: 'name' }"
        :current-node-key="currentScene?._id"
        :highlight-current="true"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
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
        <div v-if="!useSceneStore().isEditing">
          <el-button
            type="primary"
            @click="
              useSceneStore().isEditing = true;
              useSceneStore().currentScene = null;
            "
          >
            Add
          </el-button>
          <el-button type="primary" @click="useSceneStore().isEditing = true">Edit</el-button>
        </div>
      </div>
      <SceneInfo v-if="currentScene && !useSceneStore().isEditing" :scene="currentScene" />
      <EditScene v-else :scene="currentScene" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSceneStore } from "@/stores/useSceneStore";
import SceneInfo from "./components/SceneInfo.vue";
import EditScene from "./components/EditScene.vue";
import { storeToRefs } from "pinia";
import { Scene } from "@/types";

function handleNodeClick(scene: Scene) {
  useSceneStore().currentScene = scene;
}

const { currentScene } = storeToRefs(useSceneStore());
</script>

<style lang="less" scoped>
.tab-page {
  display: flex;
  .scene-tree-content {
    width: 400px;
  }
}

:deep(.scene-control) {
  margin-top: 10px;
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
  float: left;
}
</style>
