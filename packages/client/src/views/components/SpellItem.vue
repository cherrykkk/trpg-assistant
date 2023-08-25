<template>
  <div>
    <div class="spell-info-item" @click="() => emits('switchDescription', spellInfo._id)">
      <div class="level-icon">
        {{ spellInfo.等级 }}
      </div>
      {{ spellInfo.法术名称 }}
    </div>
    <div class="spell-info-description" v-if="showDescription">{{ spellInfo.法术说明 }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { SpellInfo } from "@trpg/shared";
import { computed, type PropType } from "vue";

const props = defineProps({
  spellInfo: {
    type: Object as PropType<SpellInfo>,
    required: true,
  },
  showDescription: {
    type: Boolean,
  },
});

const emits = defineEmits(["switchDescription"]);

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
  cursor: pointer;

  .level-icon {
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    background: v-bind(mainColor);
    font-size: 12px;
    text-align: center;
    margin: 0 4px;
    color: white;
  }
}

.spell-info-description {
  background-color: #eee;
  padding: 10px;
  margin: 2px;
}
</style>
