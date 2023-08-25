<template>
  <div class="proficiencies-editor">
    <TipPopover trigger="click" :teleported="true" placement="right">
      <template #reference> ? </template>
      <ProficiencyBonus />
    </TipPopover>
    <div>熟练项（技能、武器、护甲、工具）</div>
    <div style="text-align: left">熟练加值：3</div>
    <div
      v-for="(proficienciesList, index) in proficienciesDivided"
      class="items-list"
      :class="{ 'proficiencies-in-edit-mode': isEditing }"
    >
      <el-divider style="margin: 2px 0" v-if="index !== 0"></el-divider>
      <div
        v-for="p in proficienciesList"
        :key="p.name"
        @click="() => handleClickItem(p)"
        class="proficiency-item"
        :class="{ 'item-active': p.active }"
      >
        <span style="font-size: 14px">{{ p.name }}</span>
        <span style="font-size: 12px; color: #333; font-weight: 200">{{ p.description }}</span>
      </div>
    </div>
    <el-button v-if="!isEditing" @click="() => (isEditing = true)">打开编辑模式</el-button>
    <el-button v-else @click="isEditing = false">退出编辑模式</el-button>
  </div>
</template>

<script lang="ts" setup>
import { type CharacterInfo, type ProficiencyObject } from "@trpg/shared";
import { type PropType, computed, onMounted, ref, watch } from "vue";
import TipPopover from "@/views/components/tip-popovers/TipPopover.vue";
import ProficiencyBonus from "@/views/components/tip-popovers/ProficiencyBonus.vue";

const props = defineProps({
  characterInfo: {
    type: Object as PropType<CharacterInfo>,
    required: true,
  },
});

if (!props.characterInfo.proficiencies) {
  props.characterInfo.proficiencies = [];
}

const isEditing = ref(false);

function handleClickItem(item: ProficiencyObject) {
  if (!isEditing) return;

  item.active = !item.active;
}

function makeNameUnique(arrayData: { name: string }[]) {
  arrayData.forEach((e, i) => {
    const sameNameTarget = arrayData.find((e2) => e2.name === e.name);
    if (sameNameTarget !== e) {
      e.name = `${e.name}'`;
    }
  });
}

const proficienciesDivided = computed(() => {
  return divideProficiencies(props.characterInfo.proficiencies, !isEditing.value);
});

function divideProficiencies(proficiencies: ProficiencyObject[], onlyActive: boolean) {
  let _proficiencies = proficiencies;
  if (onlyActive) {
    _proficiencies = proficiencies.filter((e) => e.active);
  }

  return [
    _proficiencies.filter((e) => e.type === "skill"),
    _proficiencies.filter((e) => e.type === "weapon"),
    _proficiencies.filter((e) => e.type === "armor"),
    _proficiencies.filter((e) => e.type === "save"),
  ];
}

function getRidOfNullProficiency(arrayData: ProficiencyObject[]) {
  return arrayData.filter((e) => e.name || e.description);
}

onMounted(() => {
  props.characterInfo.proficiencies = getRidOfNullProficiency(props.characterInfo.proficiencies);
  makeNameUnique(props.characterInfo.proficiencies);
});
</script>

<style lang="less" scoped>
.proficiencies-editor {
  position: relative;
  border: 2px solid #ccc;
  padding: 5px 10px;
  height: 100%;
  box-sizing: border-box;
  .background-text {
    position: absolute;
    line-height: 100px;
    color: #ccc;
    text-align: center;
    margin: 0;
    width: 100%;
    z-index: -1;
  }
  .proficiencies-in-edit-mode {
    color: #999;
  }
}
.items-list {
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  .proficiency-item {
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #666;
    margin: 2px;
    padding: 2px;
    cursor: pointer;
    > span {
      margin: 2px;
    }
  }
  .item-active {
    border: 1px solid #333;
    color: #333;
  }
}
.add-item-button {
  background-color: rgb(73, 169, 73);
  color: white;
}

.item-description {
  font-size: 12px;
}
</style>
