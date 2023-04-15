<template>
  <el-popover placement="left" width="260">
    <div class="ability-board">
      <div v-for="ability in Object.keys(abilityType)" class="ability-tag">
        {{ ability }}({{ Math.floor((character[ability] - 10) / 2) }})
        <div v-for="skill in abilityType[ability]" class="skill-tag">
          {{ skill }}
          <span v-if="character.技能熟练项 && character.技能熟练项.includes(skill)">
            ({{ proficiencyBonus }})
          </span>
        </div>
      </div>
    </div>
    <template #reference><el-button>属性调整值</el-button></template>
  </el-popover>
</template>

<script setup>
import { abilityType } from "@/stores/types";
import { characterAdvancement } from "@/stores/constants";
import { ref } from "vue";

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const proficiencyBonus = getProficiencyBonus(props.character.experience);

function getProficiencyBonus(experience) {
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
