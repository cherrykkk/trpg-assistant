<!--
  移动端上，如果向右展开，会误触滑块，即使在“展开”按钮上拦截了 touchstart，这样似乎有效果，却似乎只有一点点效果。没有找到解决方案，所以只能建议用的时候通过定位让该组件向左展开
-->
<template>
  <div
    class="hit-slider-editor"
    :class="isLock ? 'hit-slider-editor-locked' : ''"
    tabindex="-1"
    ref="containerRef"
  >
    <div class="first-row">
      <span
        v-if="(currentHit !== fullHit || history.length) && !isLock"
        class="text-button"
        style="margin-right: 10px"
        @pointerdown="reset"
        >重置</span
      >
      <ElSlider
        v-model="innerHit"
        :max="fullHit + fakeHit"
        @change="handleChange"
        :format-tooltip="formatTooltip"
        :marks="{ [fullHit]: '' }"
      />
      <span
        v-if="isLock"
        class="text-button"
        @pointerdown="handleClickExpand"
        @touchstart="$event.stopPropagation()"
        style="margin-left: 10px"
        >展开</span
      >
      <span
        v-if="!isLock"
        class="text-button"
        @pointerdown="isLock = true"
        style="margin-left: 10px"
        >收起</span
      >
    </div>
    <div class="second-row">
      <div class="hit-history">
        <span v-for="e in history">{{ e }}</span>
        <span style="font-weight: 600; color: #333">{{ props.currentHit }}</span>
        <span v-if="history.length && !isLock" class="text-button" @pointerdown="undo">撤销</span>
      </div>
      <div v-if="!isLock" class="fake-hit-editor">
        <span>fake:</span><input type="number" :value="innerFakeHit" @change="handleChangeFake" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElSlider } from "element-plus";
import { onUnmounted, ref, watch } from "vue";
const props = defineProps({
  fullHit: {
    type: Number,
    required: true,
  },
  currentHit: {
    type: Number,
    required: true,
  },
  fakeHit: {
    type: Number,
    default: 0,
  },
  lockable: {
    type: Boolean,
    default: true,
  },
});

const isLock = ref(props.lockable);

const innerHit = ref(props.currentHit);
watch(
  () => props.currentHit,
  () => {
    innerHit.value = props.currentHit;
  }
);

const innerFakeHit = ref(props.fakeHit);
watch(
  () => props.fakeHit,
  () => {
    innerFakeHit.value = props.fakeHit;
  }
);

const emit = defineEmits<{
  (event: "change", val: number): void;
  (event: "changeFake", val: number): void;
}>();
const handleChange = (val: number | number[]) => {
  if (val === props.currentHit) return;
  emit("change", val as number);
  history.value.push(props.currentHit);
  isLock.value = true;
};
const handleChangeFake = (e: Event) => {
  emit("changeFake", Number((e.target as HTMLInputElement).value));
};

const handleClickExpand = (e: PointerEvent) => {
  isLock.value = false;
  e.stopPropagation();
};

const formatTooltip = (val: number) => {
  const diff = innerHit.value - props.currentHit;
  if (diff === 0) return val;
  else return `${val} (${diff})`;
};

const history = ref<number[]>([]);
const undo = () => {
  const val = history.value.pop();
  if (val) emit("change", val);
};
const reset = () => {
  history.value = [];
  isLock.value = true;
  emit("change", props.fullHit);
  emit("changeFake", 0);
};

const containerRef = ref<HTMLDivElement>();
function detectBlur(e: FocusEvent) {
  if (!containerRef.value) return;

  if (!e.composedPath().includes(containerRef.value)) {
    isLock.value = true;
  }
}
addEventListener("pointerdown", detectBlur);
onUnmounted(() => {
  removeEventListener("pointerdown", detectBlur);
});
</script>
<style lang="less" scoped>
.hit-slider-editor {
  position: relative;
  width: 100%;
  span {
    border-radius: 2px;
    font-weight: lighter;
    font-size: 12px;
    flex-shrink: 0;
  }
  .first-row,
  .second-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.hit-slider-editor-locked {
  width: 100px;
}
.hit-history {
  text-align: right;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;
  white-space: nowrap;
  span {
    background-color: #f5f5f5;
    margin: 1px;
    padding: 0 2px;
  }
  .text-button {
    background-color: #999;
  }
}

.text-button {
  background-color: #999;
  color: #f5f5f5;
  cursor: pointer;
  padding: 0 4px;
  margin: 4px;
}
.fake-hit-editor {
  flex-shrink: 0;
  padding-left: 10px;
  input {
    width: 40px;
  }
}
</style>
