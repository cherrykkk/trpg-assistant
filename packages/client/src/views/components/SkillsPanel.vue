<template>
  <div class="skills-panel">
    <div
      v-for="(skills, ability) in ABILITY_SKILL_ZN"
      :key="ability"
      class="ability-block"
      :style="{ color: isProficiency(ability) ? 'red' : 'auto' }"
    >
      <div style="background-color: #ccc">{{ ability }} {{ getPropertyValue(ability) }}</div>
      <div
        v-for="skill in skills"
        :style="{ 'background-color': '#f5f5f5', color: isProficiency(skill) ? 'red' : '#333' }"
      >
        {{ skill }} {{ getSkillValue(skill, ability) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLevelAndBonus } from "@/utils";
import {
  type CharacterDoc,
  type ProficiencyObject,
  ABILITY_SKILL_ZN,
  ABILITY_PROPERTY_TRANSLATION_2,
} from "@trpg/shared";
import { type PropType, onMounted, ref } from "vue";

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

function getRidOfNullProficiency(arrayData: ProficiencyObject[]) {
  return arrayData.filter((e) => e.name || e.description);
}

onMounted(() => {
  props.characterInfo.proficiencies = getRidOfNullProficiency(
    props.characterInfo.proficiencies ?? []
  );
  makeNameUnique(props.characterInfo.proficiencies);
});

function getPropertyValue(key: string) {
  if (key in ABILITY_PROPERTY_TRANSLATION_2) {
    key = ABILITY_PROPERTY_TRANSLATION_2[key as keyof typeof ABILITY_PROPERTY_TRANSLATION_2];
  }
  let num = 0;
  if (key in props.characterInfo) {
    num = props.characterInfo[key as keyof CharacterDoc] as number;
  }

  return Math.floor((num - 10) / 2);
}

function getSkillValue(skill: string, property: string) {
  const propertyValue = getPropertyValue(property);
  if (isProficiency(skill)) {
    return propertyValue + getLevelAndBonus(props.characterInfo.experience).proficiencyBonus;
  } else {
    return propertyValue;
  }
}

function isProficiency(skill: string) {
  return props.characterInfo.proficiencyNames?.includes(skill);
}
</script>

<style lang="less" scoped>
.skills-panel {
  font-size: 12px;
  .ability-block {
    float: left;
    border: 1px solid #333;
    div {
      padding: 2px;
    }
  }
}
</style>
