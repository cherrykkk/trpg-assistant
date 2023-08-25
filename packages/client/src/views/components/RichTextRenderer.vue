<template>
  <div class="scene-story-renderer">
    <div ref="richTextRendererRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { createRichTextRenderer } from "rich-text-component";

const props = defineProps({
  initialValue: {
    type: Array,
    required: true,
    default: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  },
});

console.log(props.initialValue);
const richTextRendererRef = ref();
onMounted(() => {
  if (!richTextRendererRef.value) throw "unexpected no richTextRendererRef";

  createRichTextRenderer(richTextRendererRef.value, props.initialValue);
});
</script>

<style lang="less" scoped>
.scene-story-renderer {
  position: inherit;
  overflow: auto;
  height: 100%;
}
</style>
