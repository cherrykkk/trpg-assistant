<template>
  <div
    class="resizable-panel"
    :style="{ width: `${currentWidth}px`, 'user-select': startPoint ? 'none' : 'auto' }"
  >
    <div class="slot-container">
      <slot></slot>
    </div>
    <div
      class="resize-handler"
      :class="[resizeDirection === 'left' ? 'resize-handler-left' : 'resize-handler-right']"
      @mousedown="handleOnMouseDown"
    ></div>
  </div>
  <div v-if="currentWidth === 0" @click="handleUnfold" class="unfold-button">《</div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";

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

let startPoint: { x: number; y: number } | null = null;

function handleOnMouseDown(e: MouseEvent) {
  startPoint = e;
}
function handleOnMouseMove(e: MouseEvent) {
  if (startPoint) {
    const offset = e.x - startPoint.x;
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

    startPoint = e;
  }
}
function handleOnMouseUp(e: MouseEvent) {
  if (startPoint) {
    startPoint = null;
  }
}

function handleUnfold() {
  currentWidth.value = props.defaultWidth;
}

addEventListener("mousemove", handleOnMouseMove);
addEventListener("mouseup", handleOnMouseUp);

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
  }
  .resize-handler-right {
    border-right: 2px solid #ccc;
    right: 0;
  }
  .resize-handler-left {
    border-left: 2px solid #ccc;
    left: 0;
  }
  .unfold-button {
    position: absolute;
    cursor: pointer;
  }
}
</style>
