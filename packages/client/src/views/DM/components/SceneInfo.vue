<template>
  <div class="scene-info-container">
    <img v-if="scene.picture" :src="scene.picture" />
    <div>
      <p v-for="text in scene.description?.split('\n')">{{ text }}</p>
    </div>
    <el-button v-for="npc in useCharactersStore().charactersInCurrentScene" @click="
      npcInDrawer = npc;
    drawer = true;
                        ">
      {{ npc.name }}
    </el-button>
    <el-divider />
    <el-button v-for="scene in useSceneStore().availableScenes" :key="scene.id"
      @click="useSceneStore().currentScene = scene">
      {{ scene.name }}
    </el-button>
  </div>
  <el-drawer v-model="drawer" v-if="npcInDrawer" :title="npcInDrawer.name" direction="btt" size="50%"
    custom-class="character-drawer">
    <AbilityCheckButton :character-info="npcInDrawer" />
    <p v-for="text in npcInDrawer.backgroundStory?.split('\n')">{{ text }}</p>
  </el-drawer>
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
const drawer = ref(false);
const npcInDrawer = ref<CharacterInfo>();
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
