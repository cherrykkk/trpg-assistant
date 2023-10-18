<template>
  <ListEditLayout :data="filteredCharacters" class="character-control-page" :showSaveButton="false">
    <template #header>
      <ElTabs v-model="characterScope" class="character-control">
        <ElTabPane label="PC" name="PC" />
        <ElTabPane label="NPC" name="NPC" />
        <ElTabPane label="monster" name="monster" />
        <ElTabPane label="template" name="template" />
      </ElTabs>
    </template>
    <template #editor="{ item }">
      <CharacterInfoEditor :character="(item as CharacterInfo)" :key="item?._id" v-if="item" />
    </template>
  </ListEditLayout>
</template>

<script lang="ts" setup>
import CharacterInfoEditor from "./components/CharacterInfoEditor.vue";
import { computed, ref } from "vue";
import type { CharacterInfo } from "@trpg/shared";
import { useSocketStore } from "@/stores/useSocketStore";
import ListEditLayout from "@trpg/components/ListEditLayout.vue";
import { ElTabPane, ElTabs } from "element-plus";

const characterScope = ref<"star" | CharacterInfo["scope"]>("PC");

const filteredCharacters = computed(() => {
  return useSocketStore().collections.character.filter((e) => e.scope === characterScope.value);
});
</script>

<style lang="less" scoped>
.el-button {
  margin: 10px;
}

//为什么无效？
.character-control-page {
  :deep(.el-tabs__item) {
    padding-left: 60px !important;
    padding-right: 60px !important;
  }
}
</style>
