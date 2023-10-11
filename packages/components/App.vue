<template>
  <ListEditLayout :data="data">
    <div><input /></div>
  </ListEditLayout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ListEditLayout from "./ListEditLayout.vue";

const data = ref([
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
  { name: "111", _id: "12" },
  { name: "222", _id: "32" },
]);
</script>
<style>
#app {
  width: 800px;
  height: 500px;
  border: 1px solid #ccc;
}
</style>
