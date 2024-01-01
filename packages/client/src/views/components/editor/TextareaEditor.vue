<template>
  <div class="textarea-cell edit-cell">
    <div class="title-panel">{{ title }} <slot></slot></div>
    <textarea
      ref="textareaRef"
      :value="modelValue"
      @input="updateData"
      @blur="handleComplete"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, ref, watch } from "vue";

const props = defineProps({
  title: String,
  modelValue: String,
});
const emits = defineEmits(["update:modelValue"]);

function updateData(e: Event) {
  let value: string | number = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
  emits("update:modelValue", value);
}

const textareaHeight = ref(0);
const textareaRef = ref<HTMLTextAreaElement>();
nextTick(() => {
  watch(
    () => props.modelValue,
    () => {
      textareaHeight.value = textareaRef.value?.scrollHeight ?? 0;
    },
    {
      immediate: true,
    }
  );
});

const onBlurInjection = inject("edit-cell-on-blur", () => {});
function handleComplete() {
  if (onBlurInjection) {
    onBlurInjection();
  }
}

const width = computed(() => {
  return String(props.modelValue).length + 3 + "em";
});
</script>

<style lang="less" scoped>
.textarea-cell {
  display: flex;
  font-size: 14px;
  white-space: nowrap;
  margin: 2px 4px;
  flex-direction: column;
  margin-bottom: 10px;
  .title-panel {
    background-color: #ddd;
    font-weight: bold;
    padding: 2px 4px;
    border-radius: 2px;
  }
}

textarea {
  border: none;
  padding: 0 2px;
  &:focus {
    outline: 2px solid #999;
  }

  min-height: 40px;
  width: calc(100% - 4px);
  height: v-bind('textareaHeight + "px"');
  overflow: hidden;
}
</style>
