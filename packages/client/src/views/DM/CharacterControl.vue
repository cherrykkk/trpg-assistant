<template>
  <div class="character-control-page">
    <el-tabs v-model="characterScope" class="character-control">
      <el-tab-pane label="PC" name="PC">
        <CharacterCollapse
          :characters="useCharactersStore().characters.filter((e) => e.scope === 'PC')"
          @edit-story="handleEditStory"
          @edit-spell="handleEditSpell"
          @edit-ability="handleEditAbility"
        />
      </el-tab-pane>
      <el-tab-pane label="NPC" name="NPC">
        <CharacterCollapse
          :characters="useCharactersStore().characters.filter((e) => e.scope === 'NPC')"
          @edit-story="handleEditStory"
          @edit-spell="handleEditSpell"
          @edit-ability="handleEditAbility"
        />
      </el-tab-pane>
      <el-tab-pane label="monster" name="monster">
        <CharacterCollapse
          :characters="useCharactersStore().characters.filter((e) => e.scope === 'monster')"
          @edit-story="handleEditStory"
          @edit-spell="handleEditSpell"
          @edit-ability="handleEditAbility"
        />
      </el-tab-pane>
    </el-tabs>
    <el-button @click="isEditingCharacterStory = true">新增角色</el-button>
    <el-dialog v-model="isEditing" fullscreen @close="closeDialog()">
      <h1>{{ editedCharacter?.name || "新增角色" }}</h1>
      <EditCharacterInfo
        v-if="isEditingCharacterStory"
        :character="editedCharacter"
        @close-dialog="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useCharactersStore } from "@/stores/useCharactersStore";
import EditCharacterInfo from "./components/EditCharacterInfo.vue";
import CharacterCollapse from "./components/CharacterCollapse.vue";
import { ref, watchEffect } from "vue";
import { CharacterInfo } from "@trpg/shared";

const characterScope = ref<"star" | CharacterInfo["scope"]>("PC");

const isEditingSpell = ref(false);
const isEditingCharacterStory = ref(false);
const isEditingAbility = ref(false);

const editedCharacter = ref<CharacterInfo | null>(null);
const isEditing = ref(false);
watchEffect(() => {
  isEditing.value = isEditingSpell.value || isEditingCharacterStory.value || isEditingAbility.value;
});

function closeDialog() {
  isEditingSpell.value = false;
  isEditingCharacterStory.value = false;
  isEditingAbility.value = false;
  editedCharacter.value = null;
}

function handleEditStory(character: CharacterInfo) {
  isEditingCharacterStory.value = true;
  editedCharacter.value = character;
}
function handleEditSpell(character: CharacterInfo) {
  isEditingSpell.value = true;
  editedCharacter.value = character;
}
function handleEditAbility(character: CharacterInfo) {
  isEditingAbility.value = true;
  editedCharacter.value = character;
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
