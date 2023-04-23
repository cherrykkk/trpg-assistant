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
  <el-button class="create-character-button" @click="handleCreateCharacter">新增角色</el-button>
  <el-drawer v-model="isEditingCharacterInfo" :size="800" direction="ltr">
    <CharacterInfoEditor
      v-if="isEditingCharacterInfo"
      :character="chosenCharacter"
      @close-dialog="() => (isEditingCharacterInfo = false)"
    />
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import SceneCharacter from "./Character.vue";
import { useCharactersStore } from "@/stores/useCharactersStore";
import { CharacterInfo } from "@trpg/shared";
import CharacterInfoEditor from "./CharacterInfoEditor.vue";
import { useDoubleClick } from "@/utils";

const sortedCharacters = computed(() => {
  return useCharactersStore().charactersInCurrentScene.sort(
    (a, b) => b.currentInitiative - a.currentInitiative
  );
});

const chosenCharacter = ref<CharacterInfo | null>(null);

const handleDoubleClickCharacter = useDoubleClick(() => {
  isEditingCharacterInfo.value = true;
});

function handleClickCharacter(c: CharacterInfo) {
  handleDoubleClickCharacter();
  chosenCharacter.value = c;
}

function handleCreateCharacter() {
  chosenCharacter.value = null;
  isEditingCharacterInfo.value = true;
}

const isEditingCharacterInfo = ref(false);
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
.create-character-button {
  position: absolute;
  bottom: 10px;
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
