<template>
  <el-popover width="300px">
    <template #reference>
      <el-tag :closable="closable" @close="removeSpell">
        {{ spellName }}
        <span v-if="spellData">({{ spellData.等级 }})</span>
      </el-tag>
    </template>
    <div v-if="spellData">
      <p>{{ spellData.法术说明 }}</p>
      <p>{{ spellData.法术成分 }}</p>
      <p>{{ spellData.法术升阶 }}</p>
      <p>{{ spellData.专注 }} {{ spellData.仪式 }}</p>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { useSpellsStore } from "@/stores/useSpellsStore";

const props = defineProps({
  spellName: {
    type: String,
    required: true,
  },
  closable: Boolean,
});

const emits = defineEmits(["removeSpell"]);

function removeSpell() {
  emits("removeSpell", props.spellName);
}

const spellData = useSpellsStore().spellDictionary.find((e) =>
  e.法术名称.includes(props.spellName)
);
</script>
