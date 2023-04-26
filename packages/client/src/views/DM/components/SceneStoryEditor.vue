<template>
  <div class="scene-story-editor">
    <div class="header">
      <el-input v-model="editedScene.name" placeholder="请输入唯一场景名">
        <template #append>
          <el-select v-model="editedScene.father" placeholder="所属" style="width: 115px">
            <el-option
              v-for="scene in useSceneStore().scenes"
              :key="scene.name"
              :value="scene.name"
            />
          </el-select>
        </template>
      </el-input>
      <el-button @click="useSceneStore().isEditing = false">取消</el-button>
      <el-button type="primary" @click="updateEdit">保存</el-button>
    </div>
    <div ref="richTextRef" class="rich-text-ref"></div>
  </div>
</template>

<script lang="ts" setup>
import { useSceneStore } from "@/stores/useSceneStore";
import { PropType, onMounted, onUnmounted, reactive, ref } from "vue";
import { createSceneInfo, updateSceneInfo } from "@/api/socket-tasks";
import type { Scene } from "@trpg/shared";
import { createRichTextEditor } from "@trpg/rich-text";

const props = defineProps({
  scene: Object as PropType<Scene | null>,
});

const richTextRef = ref();
onMounted(() => {
  if (!richTextRef.value) throw "unexpect no richTextRef";

  const initialValue = props.scene?.richTextDescription
    ? props.scene?.richTextDescription
    : [
        {
          type: "paragraph",
          children: [{ text: props.scene?.description || "" }],
        },
      ];

  console.log("onMounted");
  createRichTextEditor(richTextRef.value, initialValue);

  addEventListener("beforeunload", tryToStopLeavePage);
});

onUnmounted(() => {
  removeEventListener("beforeunload", tryToStopLeavePage);
});

function tryToStopLeavePage(e: BeforeUnloadEvent) {
  e.preventDefault();
  e.returnValue = "自定义文本";
}

const editedScene = reactive<Scene>(
  props.scene || {
    id: "",
    gameInstanceId: " ",
    picture: undefined,
    name: "",
    description: "",
    richTextDescription: [],
    father: undefined,
    areaX: 10,
    areaY: 10,
    items: [],
    children: [],
  }
);

function updateEdit() {
  const richTextDescription = window.slateEditor?.children;
  if (richTextDescription) {
    editedScene.richTextDescription = richTextDescription;
  }

  if (!editedScene.father) {
    console.log("请选择父级场景");
    return;
  }
  if (props.scene) {
    updateSceneInfo(props.scene.id, editedScene);
  } else {
    createSceneInfo(editedScene);
  }
  useSceneStore().isEditing = false;
}
</script>
<style lang="less" scoped>
.scene-story-editor {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  .el-select {
    flex-shrink: 0;
  }
  .el-button {
    margin: 0 0 0 6px;
  }
}
:deep(.rich-text-ref) {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  > div:nth-child(2) {
    overflow: auto;
  }
}
</style>
