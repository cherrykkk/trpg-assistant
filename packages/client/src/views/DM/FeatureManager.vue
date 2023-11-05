<template>
  <ListEditLayout
    :data="useSocketStore().collections.feature"
    @submit="updateFeatureInfo"
    :createTemplate="createFeatureTemplate"
  >
    <template #editor="{ item }">
      <div v-if="item && isFeatureInfo(item)" style="font-size: 20px">
        <EditCell v-model="item.name" title="名称" />
        <EditCell v-model="item.description" title="描述" :textarea="true" />
      </div>
      <div v-else></div>
    </template>
  </ListEditLayout>
</template>
<script lang="ts" setup>
import ListEditLayout from "@trpg/components/ListEditLayout.vue";
import { useSocketStore } from "@/stores/useSocketStore";
import { updateFeatureInfo } from "@/api/socket-tasks";
import { createFeatureTemplate, type FeatureDoc } from "@trpg/shared";
import EditCell from "../components/EditCell.vue";

function isFeatureInfo(data: Object): data is FeatureDoc {
  return true;
}

function handleRadioChange(isCustom: boolean) {
  // console.log(e);
  console.log(isCustom);
}
</script>
<style lang="less" scoped></style>
