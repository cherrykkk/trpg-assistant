<template>
  <div class="info-cell">
    <div class="prefix">{{ prefix }}</div>
    <div class="content">
      <div>{{ text || (text === "" ? "暂无" : "") }}</div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PropType } from "vue";

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
.content {
  padding: 5px 10px;
}
</style>
