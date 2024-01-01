<template>
  <div class="right-bar-character">
    <div>
      <span class="right-bar-character-name" style="flex-shrink: 1">
        {{ character.name }}
      </span>
      <span class="text-button" style="flex-shrink: 0" @pointerdown="$emit('click-more')"
        >更多</span
      >
    </div>
    <div>
      <div class="append-info">先攻{{ character.currentInitiative }}</div>
      <HitSliderEditor
        :full-hit="character.maxHP"
        :current-hit="character.currentHP"
        @change="handleUpdateCurrentHit"
      />
      <div v-if="editInitiative">
        先攻<el-input-number
          size="small"
          v-model="character.currentInitiative"
          :controls="false"
          @focus="() => (oldInitiative = character.currentInitiative)"
          @blur="handleSubmitChangeInitiative"
        />
        <!-- <div>AC: {{ character.armorClass }}</div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { sendMessage, updateCharacterInfo } from "@/api/socket-tasks";
import { HitSliderEditor } from "@trpg/components/main-exports";
import type { CharacterDoc } from "@trpg/shared";
import { ref, type PropType } from "vue";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterDoc>,
    required: true,
  },
  showHitPoint: Boolean,
  editInitiative: Boolean,
});

const emit = defineEmits<{ (event: "click-more"): void }>();

const handleUpdateCurrentHit = (e: number) => {
  const previousHP = props.character.currentHP;

  props.character.currentHP = e;
  updateCharacterInfo(props.character);
  sendMessage(
    `${props.character.name}更新了信息：${previousHP}HP → ${props.character.currentHP}HP`
  );
};

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
.right-bar-character {
  border: 1px solid #ccc;
  margin: 10px;
  box-sizing: border-box;
  padding: 10px;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 100px;
    white-space: nowrap;
  }
  .right-bar-character-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .append-info {
    font-size: 12px;
    color: #aaa;
  }
}

.text-button {
  cursor: pointer;
  font-size: 14px;
  padding: 0 2px;
  font-weight: 300;
  background-color: #ccc;
  color: #f5f5f5;
  white-space: nowrap;
}
</style>
