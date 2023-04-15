<template>
  <div v-if="character" class="character-in-combat">
    <div>{{ character.name }}</div>
    <el-slider
      v-model="character.currentHP"
      show-input
      size="small"
      :max="character.maxHP"
    ></el-slider>
    <div class="steering">
      <span style="grid-area: center">({{ character.x }},{{ character.y }})</span>
      <el-button style="grid-area: up" @click="move(0, -1)">上</el-button>
      <el-button style="grid-area: down" @click="move(0, 1)">下</el-button>
      <el-button style="grid-area: left" @click="move(-1, 0)">左</el-button>
      <el-button style="grid-area: right" @click="move(1, 0)">右</el-button>
      <el-button style="grid-area: reset" @click="resetPosition()">重置</el-button>
    </div>
    <div>
      <AbilityCheck :character="character" />
    </div>
    <SpellTag v-for="spellName in character.spells" :spell-name="spellName" />
  </div>
</template>

<script lang="ts" setup>
import { useCharactersStore, Character } from "@/stores/useCharactersStore";
import { PropType, watch } from "vue";
import AbilityCheck from "./AbilityCheck.vue";
import SpellTag from "@/views/components/SpellTag.vue";
import { useSceneStore } from "@/stores/useSceneStore";
import { ElMessage } from "element-plus";
const props = defineProps({
  character: { type: Object as PropType<Character>, required: true },
});

function move(dx: number, dy: number) {
  const _x = props.character.x | 1;
  const _y = props.character.y | 1;

  const x = _x + dx;
  const y = _y + dy;

  const scene = useSceneStore().scenes.find((scene) => scene.name === props.character.location);
  if (
    scene &&
    scene.areaX &&
    scene.areaY &&
    x > 0 &&
    y > 0 &&
    x <= scene.areaX &&
    y <= scene.areaY
  ) {
    props.character.updateCharacter({ x, y });
  } else {
    ElMessage("不可行走");
  }
}

function resetPosition() {
  props.character.updateCharacter({ x: 1, y: 1 });
}

watch(
  () => props.character.currentHP,
  (currentHP) => {
    props.character.updateCharacter({ currentHP });
  }
);
</script>
<style lang="less" scoped>
.steering {
  display: grid;
  align-items: center;
  height: 100px;
  width: 100px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: ". up ." "left center right" ". down .";
  .el-button {
    margin: 0;
  }
}
</style>
