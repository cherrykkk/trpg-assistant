<template>
  <div class="input-cell">
    <div class="title-panel">{{ title }} <slot></slot></div>
    <input
      ref="inputContainerRef"
      :value="modelValue"
      @change="updateData"
      @blur="handleComplete"
      @keydown.enter="handleComplete"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from "vue";

const props = defineProps({
  title: String,
  modelValue: String,
});
const emits = defineEmits(["update:modelValue"]);

function updateData(e: Event) {
  let value: string | number = (e.target as HTMLInputElement | HTMLTextAreaElement).value;

  emits("update:modelValue", value);
}

const inputContainerRef = ref<HTMLElement>();
const onBlurInjection = inject("edit-cell-on-blur", () => {});
function handleComplete() {
  if (onBlurInjection) {
    onBlurInjection();
  }
  if (inputContainerRef.value) {
    inputContainerRef.value.blur();
  }
}

const width = computed(() => {
  return String(props.modelValue).length + 3 + "em";
});
</script>

<style lang="less" scoped>
.input-cell,
.textarea-cell {
  display: flex;
  font-size: 14px;
  white-space: nowrap;
  margin: 2px 4px;
  .title-panel {
    background-color: #ddd;
    font-weight: bold;
    padding: 2px 4px;
    border-radius: 2px;
  }
}
.input-cell {
  input {
    width: v-bind(width);
  }
}

input {
  border: none;
  padding: 0 2px;
  &:focus {
    outline: 2px solid #999;
  }
  border: none;
}
</style>
