<template>
  <ListEditLayout
    :data="filteredCharacters"
    class="character-control-page"
    :showSaveButton="false"
    :createTemplate="createNewCharacterInfoTemplate"
  >
    <template #header>
      <ElTabs v-model="characterScope" class="character-control">
        <ElTabPane label="PC" name="PC" />
        <ElTabPane label="NPC" name="NPC" />
        <ElTabPane label="monster" name="monster" />
        <ElTabPane label="template" name="template" />
      </ElTabs>
    </template>
    <template #editor="{ item }">
      <CharacterInfoEditor :character="(item as CharacterDoc)" :key="item?._id" v-if="item" />
    </template>
  </ListEditLayout>
</template>

<script lang="ts" setup>
import CharacterInfoEditor from "./components/CharacterInfoEditor.vue";
import { computed, ref } from "vue";
import type { CharacterDoc } from "@trpg/shared";
import { useSocketStore } from "@/stores/useSocketStore";
import { ListEditLayout } from "@trpg/components/main-exports";
import { ElTabPane, ElTabs } from "element-plus";
import { createNewCharacterInfoTemplate } from "@/stores/template";

const characterScope = ref<"star" | CharacterDoc["scope"]>("PC");

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
