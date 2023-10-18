<template>
  <div class="characters-panel">
    <div
      v-for="c in sortedCharacters"
      class="character-item"
      :class="{ 'character-item-chosen': c._id === chosenCharacter?._id }"
      @click="() => handleClickCharacter(c)"
    >
      <div>{{ c.name }}</div>
      <div class="append-info">先攻{{ c.currentInitiative }}</div>
    </div>
    <QuickEditCharacter v-if="chosenCharacter" :character="chosenCharacter" />
    <el-drawer
      v-model="isEditingCharacterInfo"
      :size="800"
      direction="ltr"
      class="character-edit-dialog"
      :show-close="false"
    >
      <CharacterInfoEditor
        v-if="isEditingCharacterInfo"
        :character="chosenCharacter"
        @close-dialog="() => (isEditingCharacterInfo = false)"
      />
    </el-drawer>
  </div>

  <div>
    <el-select placeholder="迁入角色" filterable style="margin: 2px 10px">
      <el-option
        v-for="character in charactersToSelect"
        :key="character._id"
        :label="character.name"
        :value="character._id"
        @click="() => moveCharacterToCurrentLocation(character)"
      >
        <div style="display: flex; justify-content: space-between">
          <span>{{ character.name }}</span>
          <span style="text-align: right; color: #999">{{
            useSocketStore().allClientScenes.find((s) => s._id === character.locationSceneId)?.name
          }}</span>
        </div>
      </el-option>
    </el-select>
    <el-button @click="handleCreateCharacter()">新增角色</el-button>
    <ElDropdown @command="handleCreateCharacter">
      <ElButton> 模板创建 </ElButton>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem
            v-for="e in useSocketStore().collections.character.filter(
              (c) => c.scope === 'template'
            )"
            :command="e"
          >
            {{ e.name }}</ElDropdownItem
          >
        </ElDropdownMenu>
      </template>
    </ElDropdown>
    <TipPopover>
      <template #reference><button>? 战斗提示</button></template>
      <TipCombat />
    </TipPopover>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type PropType } from "vue";
import QuickEditCharacter from "./QuickEditCharacter.vue";
import type { CharacterInfo, SceneInfo } from "@trpg/shared";
import CharacterInfoEditor from "../components/CharacterInfoEditor.vue";
import { useDoubleClick } from "@/utils";
import { updateCharacterInfo } from "@/api/socket-tasks";
import {
  ElSelect,
  ElOption,
  ElButton,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
} from "element-plus";
import { useSocketStore } from "@/stores/useSocketStore";
import TipPopover from "@/views/components/tip-popovers/TipPopover.vue";
import TipCombat from "@/views/components/tip-popovers/TipCombat.vue";

const props = defineProps({
  scene: { type: Object as PropType<SceneInfo>, required: true },
});

const sortedCharacters = computed(() => {
  return useSocketStore()
    .collections.character.filter((character) => character.locationSceneId === props.scene._id)
    .sort((a, b) => b.currentInitiative - a.currentInitiative);
});

const chosenCharacter = ref<CharacterInfo | null>(null);

const handleDoubleClickCharacter = useDoubleClick(() => {
  isEditingCharacterInfo.value = true;
});

function handleClickCharacter(c: CharacterInfo) {
  handleDoubleClickCharacter();
  chosenCharacter.value = c;
}
function handleCreateCharacter(template?: CharacterInfo) {
  if (template) {
    const newC = JSON.parse(JSON.stringify(template)) as CharacterInfo;
    newC._id = "";
    newC.locationSceneId = props.scene._id;
    newC.scope = "monster";
    chosenCharacter.value = newC;
  } else {
    chosenCharacter.value = null;
  }
  isEditingCharacterInfo.value = true;
}

const charactersToSelect = computed(() => {
  return useSocketStore()
    .collections.character.filter((c) => c.locationSceneId !== props.scene._id)
    .sort((a, b) => {
      if (b.scope === "PC") return 1;
      else return -1;
    });
});

function moveCharacterToCurrentLocation(character: CharacterInfo) {
  character.locationSceneId = props.scene._id;
  updateCharacterInfo(character._id, character);
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
:deep(.character-edit-dialog) {
  .el-drawer__header {
    margin: 0;
    padding: 0;
  }
}
</style>
