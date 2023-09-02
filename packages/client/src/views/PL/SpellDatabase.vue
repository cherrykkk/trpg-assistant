<template>
  <div class="spell-database-page">
    <SpellSelect
      :spell-database="useSocketStore().allSpellInfo"
      :hide-add-button="true"
      :default-class-option="useSocketStore().playerCharacterInfo?.class"
    />
  </div>
</template>
<script lang="ts" setup>
import { useSocketStore } from "@/stores/useSocketStore";
import SpellSelect from "../components/SpellSelect.vue";
</script>

<style lang="less" scoped>
.spell-database-page {
  position: absolute;
  height: 100%;
  width: 100%;
  padding-top: 20px;
  overflow: auto;
  :deep(.quick-operator) {
    left: 0;
    right: auto;
  }
}
</style>
