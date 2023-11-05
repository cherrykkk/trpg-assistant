<template>
  <div class="spell-item">
    <div class="spell-info-item" @click="() => emits('switchDescription', spellInfo._id)">
      <div class="level-icon">
        {{ spellInfo.level }}
      </div>
      {{ spellInfo.name }}
    </div>
    <div class="spell-info-description" v-if="showDescription">
      {{ spellInfo.description }}
      <div style="color: #333">
        <b>
          <span v-if="spellInfo.concentration">专注 </span>
          <span v-if="spellInfo.ritual">仪式</span>
          {{ spellInfo.duration }}
          {{ spellInfo.school }} {{ spellInfo.castingTime }} {{ spellInfo.range }}
        </b>
        &nbsp;
        <span style="color: #ccc">
          <span v-if="spellInfo.material">成分：{{ spellInfo.material }} </span>
        </span>
      </div>
      <div style="color: #999" v-if="spellInfo.higherLevel">升阶：{{ spellInfo.higherLevel }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SpellDoc } from "@trpg/shared";
import { computed, type PropType } from "vue";
import { SPELL_LEVEL_COLORS } from "@/constants/spellColors";

const props = defineProps({
  spellInfo: {
    type: Object as PropType<SpellDoc>,
    required: true,
  },
  showDescription: {
    type: Boolean,
  },
});

const emits = defineEmits(["switchDescription"]);

const mainColor = computed(() => {
  const level = props.spellInfo.level;

  return SPELL_LEVEL_COLORS[level] ?? SPELL_LEVEL_COLORS[0];
});
</script>
<style lang="less" scoped>
.spell-item {
  border: 1px solid v-bind(mainColor);
  margin: 2px;
}
.spell-info-item {
  text-align: left;
  border-radius: 2px;
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
  margin-top: 2px;
  text-align: left;
  font-size: 13px;
  color: #666;
  line-height: 22px;
}
</style>
