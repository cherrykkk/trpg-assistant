<template>
  <div class="operator-panel">
    <button @click="showItemList = !showItemList">添加+</button>
    <div v-if="showItemList" class="items-list">
      <div
        v-for="e in itemList"
        class="item-in-list"
        @click="
          showItemList = false;
          startToAttachItem(e);
        "
      >
        <div class="item-preview">
          <MapItemCell :name="e" />
        </div>
        {{ e }}
      </div>
      <div @click="openAddIcon">+</div>
    </div>
    <button v-if="operatorStatus.attachingItems" @pointerdown="stopAttachingItem()">取消</button>
    <button @click="switchEditingCellShowStatus()">边界</button>
    <!-- to show more reactive status， like count down -->
    <span v-if="operatorStatus.movingSelectedItems">dragging...</span>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  switchEditingCellShowStatus,
  stopAttachingItem,
  startToAttachItem,
  operatorStatus,
  initOperator,
} from "./cellStore";
import MapItemCell from "./MapItemCell.vue";

const showItemList = ref(false);

const itemList = ["wall", "human"];

initOperator();

const isAddingIcon = ref(false);

function openAddIcon() {
  isAddingIcon.value = true;
}
</script>
<style lang="less" scoped>
.operator-panel {
  position: relative;
  z-index: 10;
}
.items-list {
  position: absolute;
  background-color: #f7f8f2;
  box-shadow: 0 0 0 1px;
  .item-in-list {
    text-align: center;
    cursor: pointer;
    .item-preview {
      position: relative;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
