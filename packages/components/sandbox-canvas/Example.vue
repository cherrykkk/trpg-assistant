<template>
  <SandboxMap :map-info="mapInfo" :editable="true" />
  <LayerEditor :layer-list="mapInfo.layers" @change="(data) => (mapInfo.layers = data)" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SandboxMap from "./SandboxMap.vue";
import LayerEditor from "./LayerEditor.vue";
const mapInfo = ref();
</script>
<style lang="less" scoped></style>
