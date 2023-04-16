<template>
  <h1>{{ useSceneStore().currentScene?.name }}</h1>
  <div class="combat-control" :style="cssVariables">
    <div class="map-container">
      <div v-for="c in useCharactersStore().charactersInCurrentScene" :key="c.id"
        :style="{ 'grid-column': c.x, 'grid-row': c.y }"></div>
      <img v-if="useSceneStore().currentScene?.picture" :src="useSceneStore().currentScene?.picture" />
    </div>
    <el-card>
      <el-tabs tab-position="right" class="character-tabs">
        <el-tab-pane v-for="c in useCharactersStore().charactersInCurrentScene" :key="c.id" :label="c.name">
          <CharacterInCombat :character="c" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useCharactersStore } from "@/stores/useCharactersStore";
import { useSceneStore } from "@/stores/useSceneStore";
import CharacterInCombat from "./components/CharacterInCombat.vue";

const cssVariables = {
  "--area-x": useSceneStore().currentScene?.areaX || 0,
  "--area-y": useSceneStore().currentScene?.areaY || 0,
};
</script>
<style lang="less" scoped>
.combat-control {
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
    }

    img {
      position: absolute;
      z-index: -1;
      height: 100%;
    }
  }

  .character-tabs {
    flex-grow: 1;
    padding: 10px;
  }
}
</style>
