<template>
  <el-popover placement="left" width="260">
    <div class="ability-board">
      <div v-for="abilityProperty in AbilityPropertyList" class="ability-tag">
        {{ AbilityPropertyToName[abilityProperty] }}({{
          Math.floor((character[abilityProperty] - 10) / 2)
        }})
        <div v-for="skill in AbilityType[abilityProperty]" class="skill-tag">
          {{ skill }}
          <span
            v-if="character.proficiencies && character.proficiencies.includes(skill as unknown as ProficiencyObject)"
          >
            ({{ proficiencyBonus }})
          </span>
        </div>
      </div>
    </div>
    <template #reference><el-button>属性调整值</el-button></template>
  </el-popover>
</template>

<script lang="ts" setup>
import { type PropType, ref } from "vue";
import { characterAdvancement } from "@/stores/constants";
import {
  AbilityType,
  AbilityPropertyToName,
  AbilityPropertyList,
  type CharacterInfo,
  type ProficiencyObject,
} from "@trpg/shared";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo>,
    required: true,
  },
});

const proficiencyBonus = getProficiencyBonus(props.character.experience);

function getProficiencyBonus(experience: number) {
  let bonus = 0;
  for (let i = 0; i < characterAdvancement.length; i++) {
    if (experience >= characterAdvancement[i][0]) {
      bonus = characterAdvancement[i][1];
    } else break;
  }
  return bonus;
}

const ability = ref("敏捷");
const difficulty = ref(5);
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
