<template>
  <ListEditLayout :data="filteredSpellDatabase" @submit="updateSpellDoc" class="spell-manager">
    <template #header>
      <div class="filter-option">
        <select @change="handleSelectClass">
          <option v-for="e in classOption" :selected="filterClass === e">{{ e }}</option>
        </select>
      </div>
    </template>
    <template #editor="{ item }">
      <div v-if="item && isSpellInfo(item)" style="font-size: 20px">
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
import { updateSpellDoc } from "@/api/socket-tasks";
import { type SpellDoc } from "@trpg/shared";
import EditCell from "../components/EditCell.vue";
import { useSpellFilter } from "@/stores/hooks";

function isSpellInfo(data: Object): data is SpellDoc {
  return true;
}

const { filteredSpellDatabase, classOption, handleSelectClass, filterClass } =
  useSpellFilter("全部");
</script>
<style lang="less" scoped>
.spell-manager {
  :deep(.list-board) {
    width: 40% !important;
  }
}
</style>
