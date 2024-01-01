<template>
  <div class="app-container">
    <div
      v-for="cell in renderCellPosition"
      class="cell-render"
      :show-type="cell.showType"
      :style="{
        left: cell.x + 'px',
        top: cell.y + 'px',
      }"
      @dragstart="handleDragStart"
      @pointerdown="handlePointerdown(cell.cellId)"
      @pointermove="handlePointermove(cell.cellId, $event)"
      @pointerup="handlePointerup"
    >
      <MapItemCell v-for="item in cell.items" :name="item.name" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import MapItemCell from "./MapItemCell.vue";
import {
  renderCellPosition,
  cellSize,
  handlePointerdown,
  handlePointermove,
  handlePointerup,
} from "./cellStore";
import ItemsEditor from "./ItemsEditor.vue";
import OperatorPanel from "./OperatorPanel.vue";

function handleDragStart(e: DragEvent) {
  e.preventDefault();
}

onMounted(() => {
  addEventListener("pointerup", handlePointerup);
});

onUnmounted(() => {
  removeEventListener("pointerup", handlePointerup);
});
</script>

<style lang="less" scoped>
.app-container {
  position: relative;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}
.cell-render {
  position: absolute;
  width: v-bind('cellSize + "px"');
  height: v-bind('cellSize + "px"');
  margin: 1px;
  color: #666;
  box-shadow: 0 0 0 1px, inset 0 0 0 1px;
  z-index: 1; // protect box-shadow
  &:hover {
    box-shadow: 0 0 0 1px, inset 0 0 0 1px, 0 0 10px 2px;
  }
  &[show-type="selected"] {
    color: #04ca04;
    box-shadow: 0 0 1px 2px, inset 0 0 1px 2px;
    z-index: 2;
  }
  &[show-type="canPutInUse"] {
    color: #ddd;
    z-index: 0;
  }
  &[show-type="hidden"] {
    visibility: hidden;
  }
}
</style>
