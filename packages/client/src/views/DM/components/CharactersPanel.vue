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

  <div class="util-buttons">
    <el-select placeholder="迁入角色" filterable style="margin: 2px 10px">
      <el-option
        v-for="character in charactersToSelect"
        :key="character.id"
        :label="character.name"
        :value="character.id"
        @click="() => moveCharacterToCurrentLocation(character)"
      >
        <div style="display: flex; justify-content: space-between">
          <span>{{ character.name }}</span>
          <span style="text-align: right; color: #999">{{ character.location.sceneName }}</span>
        </div>
      </el-option>
    </el-select>
    <el-button @click="handleCreateCharacter">新增角色</el-button>
  </div>

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
import { useSceneStore } from "@/stores/useSceneStore";
import { updateCharacterInfo } from "@/api/socket-tasks";

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

const charactersToSelect = computed(() => {
  return useCharactersStore()
    .characters.filter((c) => c.location.sceneName !== useSceneStore().currentScene?.name)
    .sort((a, b) => {
      if (b.scope === "PC") return 1;
      else return -1;
    });
});

function moveCharacterToCurrentLocation(character: CharacterInfo) {
  character.location.sceneName = useSceneStore().currentScene?.name || "未知";
  updateCharacterInfo(character.id, character);
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
.util-buttons {
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
