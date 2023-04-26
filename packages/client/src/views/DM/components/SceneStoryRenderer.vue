<template>
  <div class="scene-story-renderer">
    <div ref="richTextRendererRef"></div>
    <el-divider />
    <el-button
      v-for="scene in useSceneStore().availableScenes"
      :key="scene.id"
      @click="useSceneStore().currentScene = scene"
    >
      {{ scene.name }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, ref } from "vue";
import { useSceneStore } from "@/stores/useSceneStore";
import type { Scene } from "@trpg/shared";
import { createRichTextRenderer } from "@trpg/rich-text";

const props = defineProps({
  scene: {
    type: Object as PropType<Scene>,
    required: true,
  },
});

const richTextRendererRef = ref();
onMounted(() => {
  if (!richTextRendererRef.value) throw "unexpect no richTextRendererRef";

  const initialValue = props.scene?.richTextDescription
    ? props.scene?.richTextDescription
    : [
        {
          type: "paragraph",
          children: [{ text: props.scene?.description || "" }],
        },
      ];
  createRichTextRenderer(richTextRendererRef.value, initialValue);
});
</script>

<style lang="less" scoped>
.scene-story-renderer {
  position: inherit;
  overflow: auto;
  height: 100%;
}
</style>
