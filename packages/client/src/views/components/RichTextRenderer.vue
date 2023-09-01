<template>
  <div class="scene-story-renderer">
    <div ref="richTextRendererRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRaw } from "vue";
import { createRichTextRenderer } from "rich-text-component";
import { downloadImage } from "@/api/socket-tasks";

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

const richTextRendererRef = ref();
onMounted(() => {
  if (!richTextRendererRef.value) throw "unexpected no richTextRendererRef";

  createRichTextRenderer(richTextRendererRef.value, toRaw(props.initialValue), {
    downloadImage,
    uploadImage: () => {
      return Promise.resolve("");
    },
  });
});
</script>

<style lang="less" scoped>
.scene-story-renderer {
  position: inherit;
  overflow: auto;
  height: 100%;
}
</style>
