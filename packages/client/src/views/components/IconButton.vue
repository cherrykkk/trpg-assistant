<template>
  <button class="icon-button"><img v-if="icon" :src="`/${icon}`" /> {{ label }}</button>
</template>
<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
  },
  label: {
    type: String,
  },
  size: {
    type: Number,
    default: 14,
  },
});
</script>

<style lang="less" scoped>
.icon-button {
  --size: v-bind('size + "px"');
  cursor: pointer;
  font-size: var(--size);
  border-radius: 2px;
  display: flex;
  align-items: center;
  img {
    height: var(--size);
  }
}
</style>
