<template>
  <p v-for="line in lines">{{ line }}</p>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  text: String,
});

const lines = computed(() => {
  return props.text?.split("\n");
});
</script>
<style lang="less" scoped>
p {
  line-height: 1.5em;
  text-align: left;
  margin-block: 0.5em;
}
</style>
