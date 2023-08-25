<template>
  <template v-if="scene">
    <div class="scene-header" v-if="useSceneStore().editTarget !== 'path'">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="scene in path" @click="$emit('change-scene', scene)">
          <a>{{ scene.name }}</a>
        </el-breadcrumb-item>
        <IconButton :size="10" icon="icon-edit.svg" @click="useSceneStore().editTarget = 'path'" />
      </el-breadcrumb>
    </div>
    <div class="edit-scene-header" v-else>
      <el-input v-model="scene.name" placeholder="请输入唯一场景名">
        <template #append>
          <el-select v-model="scene.father" placeholder="所属" style="width: 115px">
            <el-option
              v-for="scene in useSceneStore().scenes"
              :key="scene.name"
              :value="scene.name"
            />
          </el-select>
        </template>
      </el-input>
      <el-button type="primary" @click="updateEdit">确定</el-button>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { updateSceneInfo } from "@/api/socket-tasks";
import { useSceneStore } from "@/stores/useSceneStore";
import IconButton from "@/views/components/IconButton.vue";
import { storeToRefs } from "pinia";

const { currentScene: scene, path } = storeToRefs(useSceneStore());

function updateEdit() {
  if (!scene.value) return;
  updateSceneInfo(scene.value._id, scene.value);

  useSceneStore().editTarget = null;
}
</script>
<style lang="less" scoped>
.scene-story-editor {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.edit-scene-header {
  display: flex;
  .el-select {
    flex-shrink: 0;
  }
  .el-button {
    margin: 0 0 0 6px;
  }
}
</style>
