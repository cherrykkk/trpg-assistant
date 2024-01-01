<template>
  <div class="spell-info-item">
    <div class="level-icon">
      {{ spell.level }}
    </div>
    <div>
      {{ spell.name }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SpellDoc } from "@trpg/shared";
import { type PropType, computed } from "vue";
import { SPELL_LEVEL_COLORS } from "@/constants/spellColors";

const props = defineProps({
  spell: {
    type: Object as PropType<SpellDoc>,
    required: true,
  },
});

const mainColor = computed(() => {
  const level = props.spell.level;

  return SPELL_LEVEL_COLORS[level] ?? SPELL_LEVEL_COLORS[0];
});
</script>
<style lang="less" scoped>
.spell-info-item {
  text-align: left;
  border-radius: 2px;
  padding: 2px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  line-height: 24px;
  .level-icon {
    width: 1.2em;
    height: 1.2em;
    line-height: 1.2em;
    border-radius: 50%;
    background: v-bind(mainColor);
    text-align: center;
    font-size: 12px;
    margin: 0 4px;
    color: white;
    flex-shrink: 0;
    position: relative;
    top: calc((24px - 1.2em) / 2);
  }
}
</style>
