<template>
  <div class="spell-item">
    <div class="spell-info-item" @click="() => emits('switchDescription', spellInfo._id)">
      <div class="level-icon">
        {{ spellInfo.等级 }}
      </div>
      {{ spellInfo.法术名称 }}
    </div>
    <div class="spell-info-description" v-if="showDescription">
      {{ spellInfo.法术说明 }}
      <div style="color: #333">
        <b> {{ spellInfo.专注 }} {{ spellInfo.仪式 }} </b>
        &nbsp;
        <span style="color: #ccc; float: right">成分：{{ spellInfo.法术成分 }}</span>
      </div>
      <div style="color: #999" v-if="spellInfo.法术升阶">升阶：{{ spellInfo.法术升阶 }}</div>
    </div>
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
  const colors = [
    "#ddd",
    "#bcd52d",
    "#77bd41",
    "#1cad6e",
    "#23bad2",
    "#006fb9",
    "#412b8b",
    "#9b0d81",
    "#df412b",
    "#f28a17",
  ];
  const level = props.spellInfo.等级;

  return colors[level] ?? colors[0];
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
