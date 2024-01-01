<template>
  <div class="spell-item">
    <SpellTitle @click="() => emits('switchDescription', spellInfo._id)" :spell="spellInfo" />
    <div class="spell-info-description" v-if="showDescription">
      <TextRender :text="spellInfo.description" />
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
import TextRender from "./TextRender.vue";
import SpellTitle from "./spell/SpellTitle.vue";
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
