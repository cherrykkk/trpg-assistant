<template>
  <div class="tip-popover">
    <div @click="handleClick">?</div>
    <div ref="popoverRef" popover class="popover-wrapper"><ProficiencyBonus /></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ProficiencyBonus from "./ProficiencyBonus.vue";
const popoverRef = ref<HTMLElement>();

function handleClick() {
  // @ts-ignore
  popoverRef.value?.showPopover();
}
</script>
<style lang="less" scoped>
.tip-popover {
  :deep(.popover-wrapper) {
    text-align: left;
    font-size: 14px;
  }
}
</style>
