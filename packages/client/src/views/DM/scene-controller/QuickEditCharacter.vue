<template>
  <div v-if="character" class="character-in-combat">
    <div>
      <div>HP: {{ character.currentHP }} / {{ character.maxHP }}</div>
      <el-input-number v-model="changeOfHP" size="small"></el-input-number>
      <el-button size="small" @click="handleSubmitChangeHP">提交修改</el-button>
    </div>
    <div>
      <AbilityCheck :character="character" />
    </div>
    <div>
      先攻<el-input-number
        size="small"
        v-model="character.currentInitiative"
        :controls="false"
        @focus="() => (oldInitiative = character.currentInitiative)"
        @blur="handleSubmitChangeInitiative"
      />
    </div>
    <div>AC: {{ character.armorClass }}</div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, ref } from "vue";
import AbilityCheck from "../components/AbilityCheck.vue";
import type { CharacterDoc } from "@trpg/shared";
import { updateCharacterInfo, sendMessage } from "@/api/socket-tasks";
import { ElMessage } from "element-plus";

const props = defineProps({
  character: { type: Object as PropType<CharacterDoc>, required: true },
});

const changeOfHP = ref(0);
function handleSubmitChangeHP() {
  const previousHP = props.character.currentHP;

  if (isNaN(previousHP)) {
    ElMessage(`功能禁用。原因：血量不为数字`);
  } else {
    props.character.currentHP = Number(previousHP) + changeOfHP.value;
    updateCharacterInfo(props.character);
    sendMessage(
      `${props.character.name}更新了信息：${previousHP}HP → ${props.character.currentHP}HP`
    );
    changeOfHP.value = 0;
  }
}

const oldInitiative = ref(props.character.currentInitiative);
function handleSubmitChangeInitiative() {
  if (oldInitiative.value === props.character.currentInitiative) return;
  sendMessage(
    `${props.character.name}更新了信息：本场战斗先攻为 ${props.character.currentInitiative}`
  );
  updateCharacterInfo(props.character);
}
</script>
<style lang="less" scoped>
.character-in-combat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  > div {
    margin: 5px 0;
  }
}

.el-input-number {
  margin: 0 10px;
  width: 80px;
}
.steering {
  display: grid;
  align-items: center;
  height: 100px;
  width: 100px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "reset up ." "left center right" ". down .";
  .el-button {
    margin: 0;
  }
}
</style>
