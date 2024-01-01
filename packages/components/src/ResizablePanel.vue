<template>
  <div
    class="resizable-panel"
    :class="[handlerHighlight ? 'high-light' : '']"
    :style="{ width: `${currentWidth}px`, 'user-select': startPoint ? 'none' : 'auto' }"
  >
    <div class="slot-container">
      <slot></slot>
    </div>
    <div
      class="resize-handler"
      :class="[resizeDirection === 'left' ? 'resize-handler-left' : 'resize-handler-right']"
      @pointerdown="handlePointerdown"
      @pointerover="isResizable = true"
      @pointerleave="isResizable = false"
    ></div>
  </div>
  <div v-if="currentWidth === 0" @click="handleUnfold" class="unfold-button">《</div>
</template>

<script lang="ts" setup>
import { type PropType, ref, computed, onUnmounted } from "vue";

const props = defineProps({
  defaultWidth: {
    type: Number,
    default: 300,
  },
  maxWidth: {
    type: Number,
    default: 400,
  },
  minWidth: {
    type: Number,
    default: 200,
  },
  resizeDirection: {
    type: String as PropType<"left" | "right">,
    default: "right",
  },
  foldable: {
    type: Boolean,
    default: false,
  },
});

const isResizable = ref(false);
const handlerHighlight = computed(() => {
  return isResizable.value || startPoint.value;
});

const startPoint = ref<{ x: number; y: number } | null>(null);

function handlePointerdown(e: MouseEvent) {
  startPoint.value = e;
  isResizable.value = true;
}
function handleOnMouseMove(e: MouseEvent) {
  if (startPoint.value) {
    const offset = e.x - startPoint.value.x;
    if (props.resizeDirection === "right") {
      currentWidth.value += offset;
    } else {
      currentWidth.value -= offset;
    }

    if (props.foldable && currentWidth.value < props.minWidth) {
      currentWidth.value = 0;
      return;
    }

    currentWidth.value = Math.max(props.minWidth, currentWidth.value);
    currentWidth.value = Math.min(props.maxWidth, currentWidth.value);

    startPoint.value = e;
  }
}
function handleOnMouseUp(e: MouseEvent) {
  startPoint.value = null;
  isResizable.value = false;
}

function handleUnfold() {
  currentWidth.value = props.defaultWidth;
}

addEventListener("pointermove", handleOnMouseMove);
addEventListener("pointerup", handleOnMouseUp);
onUnmounted(() => {
  removeEventListener("pointermove", handleOnMouseMove);
  removeEventListener("pointerup", handleOnMouseUp);
});

const currentWidth = ref(props.defaultWidth);
</script>

<style lang="less" scoped>
.resizable-panel {
  position: relative;
  z-index: 100;
  display: flex;
  flex-shrink: 0;
  background-color: white;
  overflow: hidden;
  --resize-handler-width: 2px;
  .slot-container {
    width: 100%;
    overflow: auto;
  }
  .resize-handler {
    flex-shrink: 0;
    width: 2px;
    height: 100%;
    cursor: ew-resize;
    position: absolute;
    right: 0;
    color: #ccc;
  }
  .resize-handler-right {
    border-right: var(--resize-handler-width) solid;
    right: 0;
  }
  .resize-handler-left {
    border-left: var(--resize-handler-width) solid;
    left: 0;
  }
  .unfold-button {
    position: absolute;
    cursor: pointer;
  }
}

.high-light {
  --resize-handler-width: 4px;
  .resize-handler {
    color: #699dfe;
  }
}
</style>
