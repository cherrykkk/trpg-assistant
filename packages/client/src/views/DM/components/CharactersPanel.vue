<template>
  <div class="characters-panel">
    <div
      v-for="c in sortedCharacters"
      class="character-item"
      :class="{ 'character-item-chosen': c === chosenCharacter }"
      @click="() => handleClickCharacter(c)"
    >
      <div>{{ c.name }}</div>
      <div class="append-info">先攻{{ c.currentInitiative }}</div>
    </div>
    <SceneCharacter v-if="chosenCharacter" :character="chosenCharacter" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import SceneCharacter from "./Character.vue";
import { useCharactersStore } from "@/stores/useCharactersStore";
import { CharacterInfo } from "@trpg/shared";

const sortedCharacters = computed(() => {
  return useCharactersStore().charactersInCurrentScene.sort(
    (a, b) => b.currentInitiative - a.currentInitiative
  );
});

const chosenCharacter = ref<CharacterInfo | null>(null);
function handleClickCharacter(c: CharacterInfo) {
  if (chosenCharacter.value === c) {
    chosenCharacter.value = null;
  } else {
    chosenCharacter.value = c;
  }
}
</script>
<style lang="less" scoped>
.characters-panel {
  .character-item {
    border: 1px solid #ccc;
    margin: 10px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .append-info {
      font-size: 12px;
      color: #aaa;
    }
  }
  .character-item-chosen {
    border: 2px solid red;
  }
}

.el-input-number {
  margin: 0 10px;
  width: 80px;
}
.steering {
  display: grid;
  align-items: center;
  height: 100px;
  width: 100px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "reset up ." "left center right" ". down .";
  .el-button {
    margin: 0;
  }
}
</style>
