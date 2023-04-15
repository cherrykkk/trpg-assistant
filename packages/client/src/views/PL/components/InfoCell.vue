<template>
  <div>
    <span>{{ prefix }}</span>
    <span>{{ value }}</span>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  prefix: String,
  value: Object as PropType<any>,
});
</script>
