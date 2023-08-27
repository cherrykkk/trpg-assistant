<template>
  <div class="scene-detail" v-if="scene">
    <ScenePath />
    <div class="scene-info-container" :key="scene._id" v-if="!isCombating && scene">
      <template v-if="useSceneStore().editTarget !== 'story'">
        <RichTextRenderer :initial-value="scene.richTextDescription" />
        <IconButton
          class="rich-text-button"
          icon="icon-edit.svg"
          label="编辑"
          @click="useSceneStore().editTarget = 'story'"
        />
      </template>
      <template v-else>
        <RichTextEditor ref="richTextEditorRef" :initial-value="scene.richTextDescription" />
        <IconButton
          class="rich-text-button"
          icon="icon-edit.svg"
          label="保存"
          @click="updateEdit"
        />
      </template>
    </div>
    <div class="scene-info-container" :key="scene._id" v-if="isCombating">
      <!-- <CanvasMapEditor v-if="isCombating" :map-info="mapInfo">
        <template #characters> <CharactersPanel /></template
      ></CanvasMapEditor> -->
    </div>
    <div style="border-top: 2px solid #ccc; border-radius: 0">
      <EntityStorage
        :key="scene._id"
        :init-stored-stack-data="scene.storage ?? []"
        @change="
          (data) => {
            if (!scene) return;
            updateSceneInfo(scene._id, { ...scene, storage: data });
          }
        "
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PropType, ref } from "vue";
import type { Scene } from "@trpg/shared";
import RichTextRenderer from "@/views/components/RichTextRenderer.vue";
import CanvasMapEditor from "@/views/components/CanvasMapEditor.vue";
import EntityStorage from "@/views/components/EntityStorage.vue";
import { updateSceneInfo } from "@/api/socket-tasks";
import { storeToRefs } from "pinia";
import { useSceneStore } from "@/stores/useSceneStore";
import IconButton from "@/views/components/IconButton.vue";
import RichTextEditor from "@/views/components/RichTextEditor.vue";
import ScenePath from "./ScenePath.vue";

const props = defineProps({
  path: { type: Array as PropType<Scene[]>, required: true },
});

const { currentScene: scene } = storeToRefs(useSceneStore());
const emits = defineEmits(["change-scene"]);
const isCombating = ref(false);

const richTextEditorRef = ref<InstanceType<typeof RichTextEditor>>();
function updateEdit() {
  if (!scene.value) return;
  scene.value.richTextDescription = richTextEditorRef.value?.getData();

  updateSceneInfo(scene.value._id, scene.value);

  // createSceneInfo(editedScene);

  useSceneStore().editTarget = null;
}
</script>

<style lang="less" scoped>
.scene-detail {
  margin-top: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: left;

  p {
    text-align: left;
  }

  :deep(.character-drawer) {
    text-align: left;

    :deep(.el-drawer__body) {
      p {
        text-align: left;
      }
    }
  }
}
.scene-header {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

.scene-info-container {
  position: relative;
  padding: 10px;
  flex-grow: 1;
  overflow: hidden;
}
.rich-text-button {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>
