<template>
  <ListEditLayout
    ref="listEditLayoutRef"
    :data="filteredSpellDatabase"
    @submit="updateSpellDoc"
    class="spell-manager"
    :createTemplate="createSpellTemplate"
  >
    <template #header>
      <div class="filter-option">
        <input @input="onNameInputChange" />
        <select @change="handleSelectClass">
          <option v-for="e in classOption" :selected="filterClass === e">{{ e }}</option>
        </select>
      </div>
    </template>
    <template #list-item="{ item }">
      <SpellTitle :spell="(item as SpellDoc)" />
    </template>
    <template #editor="{ item }">
      <div v-if="item && isSpellInfo(item)" style="font-size: 20px">
        <StringInput v-model="item.name" title="名称" />
        <TextareaEditor v-model="item.description" title="描述" />
        <TextareaEditor v-model="item.higherLevel" title="升环" />
        <NumberInput v-model="item.level" title="等级" />
        <StringInput v-model="item.school" title="学派" />
        <StringInput v-model="item.castingTime" title="施法时间" />
        <StringInput v-model="item.duration" title="持续时间" />
        <StringInput v-model="item.range" title="范围与射程" />
        <StringInput v-model="item.components" title="施法成分" />
        <StringInput v-model="item.material" title="施法材料" />
      </div>
      <div v-else></div>
    </template>
  </ListEditLayout>
</template>
<script lang="ts" setup>
import { ListEditLayout } from "@trpg/components/main-exports";
import StringInput from "../components/editor/StringInput.vue";
import NumberInput from "../components/editor/NumberInput.vue";
import TextareaEditor from "../components/editor/TextareaEditor.vue";
import { updateSpellDoc } from "@/api/socket-tasks";
import { type SpellDoc } from "@trpg/shared";
import { useSpellFilter } from "@/stores/hooks";
import { createSpellTemplate } from "@/stores/template";
import SpellTitle from "../components/spell/SpellTitle.vue";
import { provide, ref } from "vue";

function isSpellInfo(data: Object): data is SpellDoc {
  return true;
}

const listEditLayoutRef = ref<InstanceType<typeof ListEditLayout>>();

provide("edit-cell-on-blur", () => {
  const item = listEditLayoutRef.value?.getCurrentItem();
  if (item) {
    updateSpellDoc(item as SpellDoc);
  }
});

const { filteredSpellDatabase, classOption, handleSelectClass, filterClass, onNameInputChange } =
  useSpellFilter("全部");
</script>
<style lang="less" scoped>
.spell-manager {
  :deep(.list-board) {
    width: 40% !important;
  }
}
</style>
