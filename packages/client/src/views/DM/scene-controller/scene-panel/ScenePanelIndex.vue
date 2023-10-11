<template>
  <div class="scene-detail" v-if="scene">
    <div class="scene-info-container" :key="scene._id" v-if="scene">
      <template v-if="useSocketStore().editTarget !== 'story'">
        <RichTextRenderer :initial-value="scene.richTextDescription" />
        <IconButton
          class="rich-text-button"
          icon="icon-edit.svg"
          label="编辑"
          @click="useSocketStore().editTarget = 'story'"
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
    <div style="border-top: 2px solid #ccc; border-radius: 0">
      <EntityStorage
        :key="scene._id"
        :init-stored-stack-data="scene.storage ?? []"
        :database="useSocketStore().allEntityInfo"
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
import { ref, toRaw } from "vue";
import type { ClientScene } from "@trpg/shared";
import RichTextRenderer from "@/views/components/RichTextRenderer.vue";
import EntityStorage from "@/views/components/EntityStorage.vue";
import { updateSceneInfo } from "@/api/socket-tasks";
import { storeToRefs } from "pinia";
import { useSocketStore } from "@/stores/useSocketStore";
import IconButton from "@/views/components/IconButton.vue";
import RichTextEditor from "@/views/components/RichTextEditor.vue";

const { currentScene: scene } = storeToRefs(useSocketStore());
const emits = defineEmits<{ (event: "change-scene", scene: ClientScene): void }>();

const richTextEditorRef = ref<InstanceType<typeof RichTextEditor>>();
async function updateEdit() {
  if (!scene.value) return;
  scene.value.richTextDescription = await richTextEditorRef.value?.getData();

  updateSceneInfo(scene.value._id, toRaw(scene.value));

  // createSceneInfo(editedScene);

  useSocketStore().editTarget = null;
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
