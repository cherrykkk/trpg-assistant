<template>
  <ListEditLayout :data="useSocketStore().collections.spell" @submit="updateSpellDoc">
    <template #editor="{ item }">
      <div v-if="item && isSpellInfo(item)" style="font-size: 20px">
        <EditCell v-model="item.name" title="名称" />
        <EditCell v-model="item.description" title="描述" :textarea="true" style="width: 100%" />
      </div>
      <div v-else></div>
    </template>
  </ListEditLayout>
</template>
<script lang="ts" setup>
import ListEditLayout from "@trpg/components/ListEditLayout.vue";
import { useSocketStore } from "@/stores/useSocketStore";
import { updateSpellDoc } from "@/api/socket-tasks";
import { type SpellDoc } from "@trpg/shared";
import EditCell from "../components/EditCell.vue";

function isSpellInfo(data: Object): data is SpellDoc {
  return true;
}
</script>
<style lang="less" scoped></style>
