<template>
  <div>
    <button @click="removeItemsInSelectedCells()">清除选中</button>
    <div v-for="(items, name) in selectedItems">
      <div>{{ name }} x{{ items.length }}</div>
      <div>
        <button @click="removeItemsInSelectedCells(name)">移除</button>
        <button @click="startToDragItems(items)">拖动</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { removeItemsInSelectedCells, startToDragItems, selectedItems } from "./cellStore";
</script>
