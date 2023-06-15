<template>
  <CharacterInfo
    v-if="characterInfo && selectedPanel === 'character'"
    :character-info="characterInfo"
  />
  <MessageRoom v-if="selectedPanel === 'message'" />
  <ElDropdown class="switch-buttons-dropdown" @command="handleClickDropdownItem">
    <div class="switch-buttons">切换</div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="character">角色面板</el-dropdown-item>
        <el-dropdown-item command="map">地图示意</el-dropdown-item>
        <el-dropdown-item command="message">消息窗口</el-dropdown-item>
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
import { ref } from "vue";
import { ElDropdown } from "element-plus";

const route = useRoute();
const characterId = route.params.id as string;
const { playerCharacterInfo: characterInfo } = storeToRefs(useSocketStore());
const socket = createSocketAndInitAbility("player", characterId);

type PanelType = "character" | "map" | "message";
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
