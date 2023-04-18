<template>
  <div v-if="character" class="character-in-combat">
    <div>{{ character.name }}</div>
    <div>
      <div>HP: {{ character.currentHP }} / {{ character.maxHP }}</div>
      <el-input-number v-model="changeOfHP" size="small"></el-input-number>
      <el-button size="small" @click="handleSubmitChangeHP">提交修改</el-button>
    </div>
    <div class="steering">
      <span style="grid-area: center">({{ character.location.x }},{{ character.location.y }})</span>
      <el-button style="grid-area: up" @click="move(0, -1)">⇧</el-button>
      <el-button style="grid-area: down" @click="move(0, 1)">⇩</el-button>
      <el-button style="grid-area: left" @click="move(-1, 0)">⇦</el-button>
      <el-button style="grid-area: right" @click="move(1, 0)">⇨</el-button>
      <el-button style="grid-area: reset; padding: 0" @click="resetPosition()">重置</el-button>
    </div>
    <div>
      <AbilityCheck :character="character" />
    </div>
    <SpellTag v-for="spell in character.spellsPrepared" :spell-name="spell.spellId" />
    <div>
      先攻<el-input-number
        size="small"
        v-model="character.currentInitiative"
        :controls="false"
        @focus="() => (oldInitiative = character.currentInitiative)"
        @blur="handleSubmitChangeInitiative"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import AbilityCheck from "./AbilityCheck.vue";
import SpellTag from "@/views/components/SpellTag.vue";
import { ElMessage } from "element-plus";
import type { CharacterInfo, Scene } from "@trpg/shared";
import { updateCharacterInfo, sendMessage } from "@/api/socket-tasks";

const props = defineProps({
  character: { type: Object as PropType<CharacterInfo>, required: true },
  scene: { type: Object as PropType<Scene>, required: true },
});

const changeOfHP = ref(0);
function handleSubmitChangeHP() {
  const previousHP = props.character.currentHP;

  props.character.currentHP += changeOfHP.value;
  updateCharacterInfo(props.character.id, props.character);
  sendMessage(
    `${props.character.name}更新了信息：${previousHP}HP → ${props.character.currentHP}HP`
  );
  changeOfHP.value = 0;
}

const oldInitiative = ref(props.character.currentInitiative);
function handleSubmitChangeInitiative() {
  if (oldInitiative.value === props.character.currentInitiative) return;
  sendMessage(
    `${props.character.name}更新了信息：本场战斗先攻为 ${props.character.currentInitiative}`
  );
  updateCharacterInfo(props.character.id, props.character);
}

function move(dx: number, dy: number) {
  const _x = props.character.location.x;
  const _y = props.character.location.y;
  const { areaX, areaY } = props.scene;

  const x = _x + dx;
  const y = _y + dy;

  console.log(x, y);
  if (areaX && areaY && x > 0 && y > 0 && x <= areaX && y <= areaY) {
    moveAndUpdateInfo(x, y);
  } else {
    ElMessage("不可行走");
  }
}

function resetPosition() {
  moveAndUpdateInfo(1, 1);
}

function moveAndUpdateInfo(x: number, y: number) {
  props.character.location.x = x;
  props.character.location.y = y;
  updateCharacterInfo(props.character.id, { location: props.character.location });
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
