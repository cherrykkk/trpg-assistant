<template>
  <div class="skills-panel">
    <div v-for="(skills, ability) in ABILITY_SKILL_ZN" :key="ability" class="ability-block">
      <div>{{ ability }}</div>
      <div v-for="skill in skills">{{ skill }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type CharacterDoc, type ProficiencyObject, ABILITY_SKILL_ZN } from "@trpg/shared";
import { type PropType, computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  characterInfo: {
    type: Object as PropType<CharacterDoc>,
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
.skills-panel {
  font-size: 8px;
  .ability-block {
    float: left;
    margin: 2px;
  }
}
</style>
