<template>
  <div class="DM-layout">
    <div class="control-content">
      <el-menu mode="horizontal" default-active="characterControl" @select="handleSelect">
        <AccountIcon />
        <el-menu-item index="characterControl">角色编辑</el-menu-item>
        <el-menu-item index="sceneControl">场景演绎</el-menu-item>
        <el-menu-item index="combatControl">战斗演绎</el-menu-item>
      </el-menu>
      <div class="router-page"><router-view /></div>
    </div>
    <message-room class="message-room-content" />
    <DiceController class="dice-controller" @do-roll-dice="handleRollDice" />
  </div>
</template>
<script lang="ts" setup>
import { createSocketAndInitAbility } from "@/api/socket-client";
import { useRouter } from "vue-router";
import DiceController from "../components/DiceController.vue";
import MessageRoom from "../components/MessageRoom.vue";
import AccountIcon from "../components/AccountIcon.vue";

const socket = createSocketAndInitAbility("DM");
const router = useRouter();

router.push({ name: "characterControl" });
function handleSelect(name: string) {
  router.push({ name });
}
function handleRollDice(diceType: number) {
  socket.emit("operator: rollDice", -1, diceType);
}
</script>
<style lang="less" scoped>
.DM-layout {
  display: flex;
  .control-content {
    flex-grow: 1;
  }
  .router-page {
  }
  .message-room-content {
    width: 200px;
    flex-shrink: 0;
  }
  .dice-controller {
    position: absolute;
    right: 0;
    top: 0;
  }
  .el-menu {
    align-items: center;
  }
}
</style>
