<template>
  <SandboxMap :map-info="mapInfo" :editable="true" @change="(data) => (mapInfo = data)" />
  <SettingPanel />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SandboxMap from "./SandboxMap.vue";
import SettingPanel from "./SettingPanel.vue";
const mapInfo = ref();
</script>
<style lang="less" scoped></style>
