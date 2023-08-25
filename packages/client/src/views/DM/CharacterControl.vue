<template>
  <div class="character-control-page">
    <el-tabs v-model="characterScope" class="character-control">
      <el-tab-pane label="PC" name="PC">
        <CharacterCollapse
          :characters="useCharactersStore().characters.filter((e) => e.scope === 'PC')"
          @edit-story="openEditBoard"
        />
      </el-tab-pane>
      <el-tab-pane label="NPC" name="NPC">
        <CharacterCollapse
          :characters="useCharactersStore().characters.filter((e) => e.scope === 'NPC')"
          @edit-story="openEditBoard"
        />
      </el-tab-pane>
      <el-tab-pane label="template" name="template">
        <CharacterCollapse
          :characters="useCharactersStore().characters.filter((e) => e.scope === 'template')"
          @edit-story="openEditBoard"
        />
      </el-tab-pane>
      <el-tab-pane label="monster" name="monster">
        <CharacterCollapse
          :characters="useCharactersStore().characters.filter((e) => e.scope === 'monster')"
          @edit-story="openEditBoard"
        />
      </el-tab-pane>
    </el-tabs>
    <el-button @click="() => openEditBoard(null)">新增角色</el-button>
    <CharacterInfoEditor
      v-if="isEditing"
      :character="editedCharacter"
      @close-dialog="closeEditBoard"
    />
  </div>
</template>

<script lang="ts" setup>
import { useCharactersStore } from "@/stores/useCharactersStore";
import CharacterInfoEditor from "./components/CharacterInfoEditor.vue";
import CharacterCollapse from "./components/CharacterCollapse.vue";
import { ref } from "vue";
import type { CharacterInfo } from "@trpg/shared";

const characterScope = ref<"star" | CharacterInfo["scope"]>("PC");

const editedCharacter = ref<CharacterInfo | null>(null);
const isEditing = ref(false);

function openEditBoard(c: CharacterInfo | null) {
  editedCharacter.value = c;
  isEditing.value = true;
}
function closeEditBoard() {
  isEditing.value = false;
  editedCharacter.value = null;
}
</script>

<style lang="less" scoped>
.el-button {
  margin: 10px;
}

//为什么无效？
.character-control-page {
  :deep(.el-tabs__item) {
    padding-left: 60px !important;
    padding-right: 60px !important;
  }
}
</style>
