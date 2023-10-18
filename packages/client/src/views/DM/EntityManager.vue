<template>
  <ListEditLayout
    :data="useSocketStore().collections.entity"
    @submit="updateEntityInfo"
    :createTemplate="createEntityTemplate"
  >
    <template #editor="{ item }">
      <div v-if="item && isEntityInfo(item)" style="font-size: 20px">
        <EditCell v-model="item.name" title="名称" />
        <EditCell v-model="item.description" title="描述" :textarea="true" style="width: 100%" />
        <EditCell v-model="item.pound" title="磅" />
        <EditCell v-model="item.ounce" title="盎司" />
        <EditCell v-model="item.price" title="价格" />

        <div>
          <input
            type="radio"
            id="isCustom"
            name="whetherIsCustom"
            :checked="item.isCustom"
            @change="item.isCustom = true"
          />
          <label for="isCustom">为自定义物品</label>
        </div>
        <div>
          <input
            type="radio"
            id="notCustom"
            name="whetherIsCustom"
            :checked="!item.isCustom"
            @change="item.isCustom = false"
          />
          <label for="notCustom">为 5E 规则物品</label>
        </div>
      </div>
      <div v-else></div>
    </template>
  </ListEditLayout>
</template>
<script lang="ts" setup>
import ListEditLayout from "@trpg/components/ListEditLayout.vue";
import { useSocketStore } from "@/stores/useSocketStore";
import { updateEntityInfo } from "@/api/socket-tasks";
import { type EntityInfo, createEntityTemplate } from "@trpg/shared";
import EditCell from "../components/EditCell.vue";

function isEntityInfo(data: Object): data is EntityInfo {
  return true;
}

function handleRadioChange(isCustom: boolean) {
  // console.log(e);
  console.log(isCustom);
}
</script>
<style lang="less" scoped></style>
