<template>
  <div ref="richTextRef" class="rich-text-editor"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, toRaw, toValue, unref } from "vue";
import { createRichTextEditor } from "rich-text-component";
import { downloadImage, uploadImage } from "@/api/socket-tasks";

const props = defineProps({
  initialValue: {
    type: Array,
  },
});

let editorUtils: ReturnType<typeof createRichTextEditor>;
defineExpose({
  getData: async () => {
    // @ts-ignore
    return editorUtils.getData();
  },
});

const richTextRef = ref();
onMounted(() => {
  if (!richTextRef.value) throw "unexpected no richTextRef";

  // @ts-ignore
  editorUtils = createRichTextEditor(richTextRef.value, toRaw(props.initialValue) as any, {
    downloadImage,
    uploadImage,
  });

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
