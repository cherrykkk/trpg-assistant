<template>
  <div class="spells-of-character-content">
    <div class="spells-of-character">
      <div v-for="s in spellInfoToShowInLeftList" :key="s._id">
        <SpellItem
          :spell-info="s"
          :show-description="spellIdToShowDescription.includes(s._id)"
          @switch-description="handleSwitchDescription"
        />
        <div v-if="spellIdToShowDescription.includes(s._id)" class="spell-on-character-info">
          <TapToEditDescription v-model="getSpellOnCharacterInfo(s._id).reason" />
          <div class="delete-button" @click="() => handleDeleteSpell(s._id)">-</div>
        </div>
      </div>
      <el-button class="switch-button" @click="() => (showSpellList = !showSpellList)">
        {{ showSpellList ? `关闭列表` : `打开列表` }}
      </el-button>
    </div>
    <div>
      <SpellSelect
        v-if="showSpellList"
        :exist-spell="character.spells"
        @select="handleAddSpell"
        :default-class-option="character.class"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PropType, computed, nextTick, ref } from "vue";
import type { CharacterDoc } from "@trpg/shared";
import SpellItem from "@/views/components/SpellItem.vue";
import TapToEditDescription from "./TapToEditDescription.vue";
import { turnToSpellsInfo } from "@/stores/utils";
import SpellSelect from "@/views/components/spell/SpellSelect.vue";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterDoc>,
    required: true,
  },
});

//已知法术/已准备法术
const knownOrPrepared = ref<"known" | "prepared">("known");

function handleSwitchDescription(id: string) {
  if (spellIdToShowDescription.value.includes(id)) {
    spellIdToShowDescription.value = spellIdToShowDescription.value.filter((e) => e !== id);
  } else {
    spellIdToShowDescription.value.push(id);
  }
}

function handleAddSpell(spellId: string) {
  props.character.spells.push({ spellId, reason: "" });
}

function handleDeleteSpell(spellId: string) {
  props.character.spells = props.character.spells.filter((e) => e.spellId !== spellId);
}

const spellIdToShowDescription = ref<string[]>([]);
const showSpellList = ref(false);

const spellInfoToShowInLeftList = computed(() => {
  return turnToSpellsInfo(props.character.spells.map((e) => e.spellId));
});

function getSpellOnCharacterInfo(id: string) {
  const result = props.character.spells.find((e) => e.spellId === id);
  if (!result) {
    throw Error("未找到法术" + id);
  } else {
    return result;
  }
}
</script>
<style lang="less" scoped>
.spells-of-character-content {
  display: flex;
  border: 2px solid #ccc;
  position: relative;
  min-height: 200px;
  max-height: 600px;
  padding: 10px;
}

.spells-of-character {
  width: 100%;
  overflow: auto;
  overscroll-behavior: contain;

  .spell-on-character-info {
    display: flex;
    justify-content: space-between;
    margin: 2px;
    line-height: 24px;
  }
}

.delete-button {
  background-color: #e18989;
  color: white;
  width: 24px;
  border-radius: 50%;
}

.add-button {
  background-color: #8fc58f;
  color: white;
  margin: 0 10px 10px 10px;
  cursor: pointer;
}
</style>
