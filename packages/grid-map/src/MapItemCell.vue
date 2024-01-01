<template>
  <div class="map-item-container" :class="[name]"></div>
</template>
<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
<style lang="less" scoped>
.map-item-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wall {
  box-sizing: border-box;
  background-image: url(./assets/wall.svg);
  background-size: 100%;
}
.human {
  box-sizing: border-box;
  background-image: url(./assets/human.svg);
  background-size: 100%;
}
</style>
