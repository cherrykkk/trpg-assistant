<template>
  <div class="example-container">
    <OperatorPanel class="operator-panel" />
    <CellRenderer class="cell-renderer" />
    <ItemsEditor class="items-editor" />
  </div>
</template>
<script lang="ts" setup>
import CellRenderer from "./CellRenderer.vue";
import ItemsEditor from "./ItemsEditor.vue";
import OperatorPanel from "./OperatorPanel.vue";
</script>
<style lang="less" scoped>
.example-container {
  position: fixed;
}
.operator-panel {
}
.items-editor {
  position: fixed;
  right: 0;
  background-color: #fff;
  z-index: 10;
}
</style>
