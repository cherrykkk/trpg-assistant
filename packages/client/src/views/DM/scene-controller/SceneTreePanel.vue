<template>
  <el-tree
    :data="treeData"
    node-key="_id"
    default-expand-all
    :props="{ label: 'name' }"
    :highlight-current="true"
    @node-click="(scene: ClientScene)=>$emit('select',scene)"
    :expand-on-click-node="false"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <button class="edit-icon" @click="sceneToEdit = data">改</button>
        <div class="edit-panel" v-if="sceneToEdit && data === sceneToEdit">
          <button class="ok-icon" @click="handleOK(sceneToEdit)">ok</button>
          <ElInput v-model="sceneToEdit.name"></ElInput>
          <div class="edit-scene-header">
            <ElTreeSelect
              v-model="sceneToEdit.fatherId"
              placeholder="所属"
              :data="treeData"
              node-key="_id"
              filterable
              :props="{ label: 'name' }"
              check-on-click-node
              @node-click="(scene) => handleChangeSceneFather(scene)"
            />
          </div>
        </div>
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { updateSceneInfo } from "@/api/socket-tasks";
import type { ClientScene, SceneInfo } from "@trpg/shared";
import { ElInput, ElTreeSelect } from "element-plus";
import { ref, type PropType } from "vue";

const props = defineProps({
  treeData: {
    type: Array as PropType<ClientScene[]>,
    required: true,
  },
});
const emit = defineEmits<{ (event: "select", scene: ClientScene): void }>();

const sceneToEdit = ref<ClientScene | null>(null);

function handleChangeSceneFather(scene: ClientScene) {
  if (sceneToEdit.value) sceneToEdit.value.fatherId = scene._id;
}
function handleOK(scene: ClientScene) {
  updateSceneInfo(scene._id, scene);
  sceneToEdit.value = null;
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex-grow: 1;
  position: relative;
  text-align: left;
}
:deep(.el-tree-node__content) {
  height: auto;
  .edit-icon {
    display: none;
    right: 0;
    top: 0;
    position: absolute;
  }
  &:hover {
    .edit-icon {
      display: block;
    }
  }
}

.edit-panel {
  position: relative;
  z-index: 1;
  .ok-icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
