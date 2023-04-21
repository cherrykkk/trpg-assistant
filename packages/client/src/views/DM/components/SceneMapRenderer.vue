<template>
  <div v-if="currentScene">
    <div class="combat-control">
      <div class="map-container">
        <div
          v-for="c in useCharactersStore().charactersInCurrentScene"
          :key="c.id"
          :style="{
            'grid-column': c.location.x,
            'grid-row': c.location.y,
            fontSize: `${30 / c.name.length}px`,
          }"
        >
          {{ c.name }}
        </div>
        <div
          v-for="item in currentScene.items"
          :key="item.id"
          :style="{
            'grid-column': item.points[0].x,
            'grid-row': item.points[0].y,
            fontSize: `${30 / item.name.length}px`,
            backgroundColor: item.backgroundColor,
          }"
        >
          {{ item.name }}
        </div>
        <!-- <img
          v-if="useSceneStore().currentScene?.picture"
          :src="useSceneStore().currentScene?.picture"
        /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCharactersStore } from "@/stores/useCharactersStore";
import { useSceneStore } from "@/stores/useSceneStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { currentScene } = storeToRefs(useSceneStore());

const areaX = computed(() => {
  return currentScene.value?.areaX || 10;
});
const areaY = computed(() => {
  return currentScene.value?.areaY || 10;
});
</script>
<style lang="less" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin-left: 20px;
  }
  .el-input-number {
    margin: 0 10px;
    width: 80px;
  }
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
