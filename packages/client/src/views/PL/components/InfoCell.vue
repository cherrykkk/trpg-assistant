<template>
  <div class="info-cell">
    <div class="prefix">{{ prefix }}</div>
    <div>{{ text || (text === "" ? "暂无" : "") }}</div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  prefix: String,
  text: String,
  size: String as PropType<"small" | "large">,
});
</script>

<style lang="less" scoped>
.info-cell {
  border: 1px solid #ccc;
  margin: 10px 0;
}
.prefix {
  background-color: #ccc;
}
</style>
