<template>
  <div class="message-room-vue">
    <DiceController />
    <div class="history-area" ref="historyAreaRef">
      <div v-for="e in useSocketStore().messageList">
        {{ e.content }}
      </div>
    </div>
    <el-input type="text-area" v-model="messageContentInEdit" class="message-text-area"></el-input>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeUpdate, onUpdated, ref } from "vue";
import DiceController from "./DiceController.vue";
import { useSocketStore } from "@/stores/useSocketStore";

const historyAreaRef = ref();

(function autoScroll() {
  let currentIsShowingButton = true;

  onBeforeUpdate(() => {
    if (!historyAreaRef.value) return;
    const { clientHeight, scrollHeight, scrollTop } = historyAreaRef.value;
    currentIsShowingButton = scrollTop + clientHeight > scrollHeight - 10;
  });

  onUpdated(() => {
    if (historyAreaRef.value) {
      if (currentIsShowingButton) {
        historyAreaRef.value.scrollTop = historyAreaRef.value.scrollHeight;
      }
    }
  });
})();

const messageContentInEdit = ref("");
</script>

<style lang="less" scoped>
.message-room-vue {
  position: relative;
  padding: 40px 5px;
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
.message-text-area {
  margin: 10px 0;
}
</style>
