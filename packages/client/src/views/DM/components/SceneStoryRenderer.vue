<template>
  <div class="scene-info-container">
    <img v-if="scene.picture" :src="scene.picture" />
    <div>
      <p v-for="text in scene.description?.split('\n')">{{ text }}</p>
    </div>
    <el-divider />
    <el-button
      v-for="scene in useSceneStore().availableScenes"
      :key="scene.id"
      @click="useSceneStore().currentScene = scene"
    >
      {{ scene.name }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { useSceneStore } from "@/stores/useSceneStore";
import { useCharactersStore } from "@/stores/useCharactersStore";
import AbilityCheckButton from "@/views/components/AbilityCheckButton.vue";
import type { CharacterInfo, Scene } from "@trpg/shared";

const props = defineProps({
  scene: {
    type: Object as PropType<Scene>,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.scene-info-container {
  text-align: left;
  padding: 10px;
}

img {
  width: 200px;
}
</style>
