<template>
  <HitSliderEditor
    :full-hit="20"
    :fake-hit="currentFakeHit"
    :current-hit="currentHit"
    @change="currentHit = $event"
    @change-fake="currentFakeHit = $event"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import HitSliderEditor from "../src/HitSliderEditor.vue";

const currentHit = ref(10);
const currentFakeHit = ref(0);
</script>
<style lang="less" scoped>
.hit-slider-editor {
  position: absolute;
  right: 0;
}
</style>
