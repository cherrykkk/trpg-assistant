<template>
  <div ref="popoverRef">
    <div @click="showModel = true">
      <slot name="reference"> </slot>
    </div>
    <ElDialog v-model="showModel" :append-to-body="true" :show-close="false">
      <slot></slot>
    </ElDialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElDialog } from "element-plus";

const showModel = ref(false);
</script>
<style lang="less" scoped>
.tip-popover {
  :deep(.popover-wrapper) {
    text-align: left;
    font-size: 14px;
  }
}
.el-popover {
  overflow: auto;
}
</style>
