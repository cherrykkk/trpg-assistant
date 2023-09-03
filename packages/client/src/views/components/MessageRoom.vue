<template>
  <div class="message-room-vue">
    <DiceController @roll-dice="handleRollDice" />
    <div class="history-area" ref="historyAreaRef">
      <div v-for="e in useSocketStore().messageList">
        <div class="message-time">{{ e.time }}</div>
        <div>
          {{ e.content }}
        </div>
      </div>
    </div>
    <!-- <el-input type="text-area" v-model="messageContentInEdit" class="message-text-area"></el-input> -->
  </div>
</template>
<script lang="ts" setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from "vue";
import DiceController from "./DiceController.vue";
import { useSocketStore } from "@/stores/useSocketStore";
import { rollDice } from "@/api/socket-tasks";

const historyAreaRef = ref();

(function autoScroll() {
  let keepBottom = true;

  onBeforeUpdate(() => {
    if (!historyAreaRef.value) return;
    const { clientHeight, scrollHeight, scrollTop } = historyAreaRef.value;
    keepBottom = scrollTop + clientHeight > scrollHeight - 10;
  });

  onUpdated(() => {
    if (historyAreaRef.value) {
      if (keepBottom) {
        historyAreaRef.value.scrollTop = historyAreaRef.value.scrollHeight;
      }
    }
  });
})();

onMounted(() => {
  historyAreaRef.value.scrollTop = historyAreaRef.value.scrollHeight;
});

const messageContentInEdit = ref("");

function handleRollDice(diceType: number | number[]) {
  const playerId = useSocketStore().playerCharacterInfo?._id;
  if (playerId) {
    rollDice(playerId, diceType);
  } else {
    rollDice("DM", diceType);
  }
}
</script>

<style lang="less" scoped>
.message-room-vue {
  position: relative;
  padding: 20px 5px;
  height: 100vh;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.history-area {
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
}

.message-time {
  font-size: 12px;
  color: #ccc;
}
.message-text-area {
  margin: 10px 0;
}
</style>
