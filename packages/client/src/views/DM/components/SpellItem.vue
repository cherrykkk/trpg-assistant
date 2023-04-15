<template>
  <div class="spell-info-item">
    <div class="level-icon">
      {{ spellInfo.等级 }}
    </div>
    {{ spellInfo.法术名称 }}
  </div>
</template>

<script lang="ts" setup>
import { SpellInfo } from "@trpg/shared";
import { computed } from "vue";
import { PropType, ref } from "vue";

const props = defineProps({
  spellInfo: {
    type: Object as PropType<SpellInfo>,
    required: true,
  },
});

const mainColor = computed(() => {
  const level = props.spellInfo.等级;
  let mainColor = "#ddd";
  if (level == 0) {
    mainColor = "#ddd";
  } else if (level <= 2) {
    mainColor = "#aedff7";
  } else if (level <= 4) {
    mainColor = "#ff9ceca1";
  } else if (level <= 6) {
    mainColor = "#c4d01e";
  } else if (level <= 8) {
    mainColor = "#ff8d00";
  } else {
    mainColor = "#ff5961";
  }

  return mainColor;
});
</script>
<style lang="less" scoped>
.spell-info-item {
  text-align: left;
  border: 1px solid v-bind(mainColor);
  border-radius: 2px;
  margin: 2px;
  padding: 2px;
  display: flex;
  align-items: center;
  .level-icon {
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    background: var(--main-color);
    font-size: 12px;
    text-align: center;
    margin: 0 4px;
    color: white;
  }
}
</style>
