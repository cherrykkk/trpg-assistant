<template>
  <div ref="richTextRef" class="rich-text-editor"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { createRichTextEditor } from "rich-text-component";

const props = defineProps({
  initialValue: {
    type: Array,
    default: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  },
});

console.log("initial", props.initialValue);
defineExpose({
  getData: () => {
    console.log("windowSlate", window.slateEditor);
    return window.slateEditor?.children;
  },
});

const richTextRef = ref();
onMounted(() => {
  if (!richTextRef.value) throw "unexpected no richTextRef";

  createRichTextEditor(richTextRef.value, props.initialValue);

  addEventListener("beforeunload", tryToStopLeavePage);
});

onUnmounted(() => {
  removeEventListener("beforeunload", tryToStopLeavePage);
});

function tryToStopLeavePage(e: BeforeUnloadEvent) {
  e.preventDefault();
  e.returnValue = "自定义文本";
}
</script>
<style lang="less" scoped>
.rich-text-editor {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
  .rich-text-editor > div:nth-child(2) {
    overflow: auto;
  }
}
</style>
