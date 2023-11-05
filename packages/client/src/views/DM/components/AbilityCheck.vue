<template>
  <el-popover placement="left" width="260">
    <div class="ability-board">
      <div>熟练加值: {{ getLevelAndBonus(character.experience).proficiencyBonus }}</div>
      <div v-for="abilityProperty in AbilityPropertyList" class="ability-tag">
        {{ ABILITY_PROPERTY_TRANSLATION[abilityProperty] }}({{
          Math.floor((character[abilityProperty] - 10) / 2)
        }})
        <div v-for="skill in AbilityType[abilityProperty]" class="skill-tag">
          {{ skill }}
          <span
            v-if="character.proficiencies && character.proficiencies.includes(skill as unknown as ProficiencyObject)"
          >
            {{ getLevelAndBonus(character.experience).proficiencyBonus }}
          </span>
        </div>
      </div>
    </div>
    <template #reference><el-button>属性调整值</el-button></template>
  </el-popover>
</template>

<script lang="ts" setup>
import { type PropType, ref } from "vue";
import {
  AbilityType,
  ABILITY_PROPERTY_TRANSLATION,
  AbilityPropertyList,
  type CharacterDoc,
  type ProficiencyObject,
} from "@trpg/shared";
import { getLevelAndBonus } from "@/utils";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterDoc>,
    required: true,
  },
});
</script>
<style lang="less" scoped>
.ability-board {
  .ability-tag {
    display: flex;
    color: #000;
    .skill-tag {
      margin: 2px;
      color: #999;
    }
  }
}
</style>
