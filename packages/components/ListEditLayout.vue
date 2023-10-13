<template>
  <div class="list-edit-layout">
    <div class="filter-container">
      <slot name="header"></slot>
      <div class="append-button" @click="createNewItem">+</div>
    </div>
    <div class="main-container">
      <div class="list-board">
        <div class="list-item" v-for="e in data" :key="e._id" @click="handleClickItem(e)">
          {{ e.name }}
        </div>
      </div>
      <div class="edit-board">
        <slot name="editor" :item="currentItem"></slot>
        <button v-if="showSaveButton" @click="submitSave" class="submit-button">保存</button>
      </div>
      <div class="system-message">
        {{ systemMessage }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, type PropType, onBeforeUnmount, watch } from "vue";

interface ListItem {
  name: string;
  _id: string;
}

const props = defineProps({
  data: {
    type: Array as PropType<ListItem[]>,
    default() {
      return [];
    },
  },
  createTemplate: {
    type: Function as PropType<() => ListItem>,
  },
  showSaveButton: {
    type: Boolean,
    default: true,
  },
});

const systemMessage = ref("");
watch(systemMessage, () => {
  if (systemMessage.value) {
    setTimeout(() => {
      systemMessage.value = "";
    }, 3000);
  }
});

const currentItem = ref<null | ListItem>(null);

function handleClickItem(item: ListItem) {
  // todo 校验修改但未保存的情况
  currentItem.value = { ...item };
}

function createNewItem() {
  if (!props.createTemplate) return;

  const item = props.createTemplate();
  currentItem.value = item;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // 阻止默认行为，即保存网页
    submitSave();
  }
}

function submitSave() {
  if (currentItem.value) {
    const result = emit("submit", currentItem.value);
    console.log("result", result);
    if (result) {
      systemMessage.value = "已保存";
    }
  }
}

addEventListener("keydown", handleKeydown);
onBeforeUnmount(() => {
  removeEventListener("keydown", handleKeydown);
});

const emit = defineEmits<{
  (event: "submit", data: any): boolean;
  (event: "delete", _id: string): void;
}>();
</script>
<style lang="less" scoped>
.list-edit-layout {
  height: 100%;
  .filter-container {
    height: 40px;
    background-color: #eee;
    border-bottom: 1px solid #999;
  }
  .main-container {
    height: calc(100% - 40px);
    display: flex;
    position: relative;
    .list-board {
      background-color: #f5f5f5;
      border-right: 1px solid #999;
      width: 20%;
    }
    .edit-board {
      width: 100%;
    }
    .system-message {
      position: absolute;
      right: 10px;
      color: rgb(186, 56, 56);
    }
  }
}
.filter-container {
  position: relative;
  .append-button {
    position: absolute;
    background-color: rgb(184, 238, 184);
    top: 0;
    right: 0;
    width: 40px;
    line-height: 39px;
    height: 39px;
    cursor: pointer;
    &:hover {
      background-color: rgb(158, 211, 158);
    }
  }
}

.list-board {
  overflow-y: auto;
  .list-item {
    border-bottom: 1px solid #ddd;
    line-height: 30px;
    padding-left: 10px;
    cursor: pointer;
    color: #666;
    text-align: left;
    &:hover {
      color: #333;
      background-color: #ddd;
      font-weight: 600;
    }
  }
}

.edit-board {
  .submit-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
}
</style>
