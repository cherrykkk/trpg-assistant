<template>
  <CharacterInfo
    v-if="characterInfo && selectedPanel === 'character'"
    :character-info="characterInfo"
  />
  <!-- <MapPreviewer v-if="selectedPanel === 'map'" /> -->
  <MessageRoom v-if="selectedPanel === 'message'" />
  <SpellDatabase v-if="selectedPanel === 'spellDatabase'" />
  <ElDropdown class="switch-buttons-dropdown" @command="handleClickDropdownItem">
    <div class="switch-buttons">切换</div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="character">角色面板</el-dropdown-item>
        <el-dropdown-item command="map">地图示意</el-dropdown-item>
        <el-dropdown-item command="message">掷骰消息</el-dropdown-item>
        <el-dropdown-item command="spellDatabase">法术查询</el-dropdown-item>
      </el-dropdown-menu>
    </template></ElDropdown
  >
</template>

<script lang="ts" setup>
import { createSocketAndInitAbility } from "@/api/socket-client";
import MessageRoom from "../components/MessageRoom.vue";
import { useRoute } from "vue-router";
import CharacterInfo from "./CharacterInfo.vue";
import { storeToRefs } from "pinia";
import { useSocketStore } from "../../stores/useSocketStore";
import { ref, watch } from "vue";
import { ElDropdown } from "element-plus";
import SpellDatabase from "./SpellDatabase.vue";
import { saveAccount } from "@/stores/accounts";
// import MapPreviewer from "./components/MapPreviewer.vue";

const route = useRoute();
const characterId = route.params.id as string;
const { playerCharacterInfo: characterInfo } = storeToRefs(useSocketStore());
const socket = createSocketAndInitAbility("player", characterId);

watch(characterInfo, (newVal, oldVal) => {
  if (!oldVal && newVal) {
    saveAccount({
      id: characterId,
      role: "player",
      name: newVal.name,
      lastTime: Date.now(),
    });
  }
});

type PanelType = "character" | "map" | "message" | "spellDatabase";
const selectedPanel = ref<PanelType>("character");
function handleClickDropdownItem(e: PanelType) {
  selectedPanel.value = e;
}
</script>

<style lang="less">
.switch-buttons-dropdown {
  position: absolute;
  right: 10px;
  top: 10px;
}
.switch-buttons {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  background-color: #dddddd;
}
</style>
