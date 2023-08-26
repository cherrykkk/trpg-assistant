<template>
  <div v-if="textarea" class="textarea-cell edit-cell">
    <div class="title-panel">{{ title }} <slot></slot></div>
    <textarea ref="textareaRef" :value="modelValue" @input="updateData"></textarea>
  </div>
  <div class="input-cell edit-cell" v-else>
    <div class="title-panel">{{ title }} <slot></slot></div>
    <input v-if="isNumber" type="number" :value="modelValue" @change="updateData" />
    <input v-else :value="modelValue" @change="updateData" />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";

const props = defineProps({
  title: String,
  modelValue: [String, Number],
  textarea: Boolean,
});
const isNumber = false;
// const isNumber = typeof props.modelValue == "number";
const emits = defineEmits(["update:modelValue"]);

function updateData(e: Event) {
  let value: string | number = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
  if (isNumber) {
    value = Number(value);
  }
  emits("update:modelValue", value);
}

const textareaHeight = ref(0);
const textareaRef = ref<HTMLTextAreaElement>();
if (props.textarea) {
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
}
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

input,
textarea {
  border: none;
  padding: 0 2px;
  &:focus {
    outline: 2px solid #999;
  }
}
input {
  border: none;
}
textarea {
  min-height: 40px;
  width: 100%;
  height: v-bind('textareaHeight + "px"');
  overflow: hidden;
}
.textarea-cell {
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
