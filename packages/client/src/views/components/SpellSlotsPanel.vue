<template>
  <div class="spell-slots-panel">
    法术位：
    <template v-for="(balls, i) in slotBalls">
      <div v-if="i !== 0">|</div>
      <div
        v-for="b in balls.balls"
        class="slot-ball"
        :style="{ 'background-color': b.color }"
        @click="handleClickBall(balls.level)"
        @click.right.prevent="handleRightClickBall(balls.level)"
      >
        {{ balls.level }}
      </div>
    </template>
    <button v-if="editable" @click="recoverAll">恢复</button>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, type PropType } from "vue";
import { SPELL_LEVEL_COLORS } from "@/constants/spellColors";

const props = defineProps({
  max: {
    type: Array as PropType<number[]>,
    required: true,
  },
  modelValue: {
    type: Array as PropType<number[]>,
    default: [],
  },
  editable: {
    type: Boolean,
    default: true,
  },
});

const current = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const slotBalls = computed(() => {
  interface LevelBalls {
    level: number;
    balls: { color: string }[];
  }

  const _balls: LevelBalls[] = [];

  for (let level = 1; level < props.max.length; level++) {
    const currentLevelBalls: LevelBalls = { level, balls: [] };
    const maxNum = props.max[level - 1];
    if (maxNum <= 0) continue;
    const currentNum = current.value[level - 1];
    for (let i = 0; i < maxNum; i++) {
      currentLevelBalls.balls.push({
        color: i < currentNum ? SPELL_LEVEL_COLORS[level] ?? "#ccc" : "#ccc",
      });
    }

    _balls.push(currentLevelBalls);
  }

  return _balls;
});

function handleClickBall(level: number) {
  if (!props.editable) return;
  if (current.value[level - 1] > 0) {
    current.value[level - 1]--;
    emit("update:modelValue", current.value);
  }
}

function handleRightClickBall(level: number) {
  if (!props.editable) return;
  if (current.value[level - 1] < props.max[level - 1]) {
    current.value[level - 1]++;
    emit("update:modelValue", current.value);
  }
}

function recoverAll() {
  current.value = [...props.max];
  emit("update:modelValue", current.value);
}
</script>
<style lang="less" scoped>
.spell-slots-panel {
  font-size: 12px;
  display: flex;
  line-height: 1.4em;
  text-align: center;
  button {
    line-height: calc(1.4em - 2px);
    height: 1.4em;
    padding: 0;
    margin-left: 10px;
  }
}
.slot-ball {
  border-radius: 50%;
  width: 1.4em;
  height: 1.4em;
  color: white;
  cursor: v-bind("editable? `pointer`: `default`");
}
</style>
