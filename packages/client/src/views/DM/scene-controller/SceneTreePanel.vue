<template>
  <el-tree
    :data="treeData"
    node-key="id"
    default-expand-all
    :props="{ label: 'name' }"
    :highlight-current="true"
    @node-click="(scene: Scene)=>$emit('select',scene)"
    :expand-on-click-node="false"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import type { Scene } from "@trpg/shared";
import type { PropType } from "vue";

const props = defineProps({
  treeData: {
    type: Array as PropType<Scene[]>,
    required: true,
  },
});
const emits = defineEmits<{ (event: "select", scene: Scene): void }>();
</script>
