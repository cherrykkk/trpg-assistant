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
    <SpellSelect
      v-if="showSpellList"
      :spell-database="useSocketStore().allSpellInfo"
      @select="handleAddSpell"
      :default-class-option="character.class"
    />
  </div>
</template>
<script lang="ts" setup>
import { type PropType, computed, nextTick, ref } from "vue";
import type { CharacterInfo } from "@trpg/shared";
import SpellItem from "@/views/components/SpellItem.vue";
import { useSocketStore } from "@/stores/useSocketStore";
import TapToEditDescription from "./TapToEditDescription.vue";
import { turnToSpellsInfo } from "@/utils";
import SpellSelect from "@/views/components/SpellSelect.vue";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo>,
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
  if (knownOrPrepared.value === "prepared") {
    props.character.spellsPrepared.push({ spellId, reason: "" });
  } else {
    props.character.spellsKnown.push({ spellId, reason: "" });
  }
}

function handleDeleteSpell(spellId: string) {
  if (knownOrPrepared.value === "prepared") {
    props.character.spellsPrepared = props.character.spellsPrepared.filter(
      (e) => e.spellId !== spellId
    );
  } else {
    props.character.spellsKnown = props.character.spellsKnown.filter((e) => e.spellId !== spellId);
  }
}

const spellIdToShowDescription = ref<string[]>([]);
const showSpellList = ref(false);

const spellsOnCharacter = computed(() => {
  return knownOrPrepared.value === "prepared"
    ? props.character.spellsPrepared
    : props.character.spellsKnown;
  // const result: { spellInfo: SpellInfo, reason: string }[] = []
  // props.character.spellsKnown.forEach(e => {
  //   const spellInfo = useSocketStore().allSpellInfo.find(spellInfo => spellInfo.id === e.spellId)
  //   if (!spellInfo) {
  //     console.log(`无法找到 id 为 ${e.spellId} 的法术`)
  //     return
  //   }
  //   result.push({
  //     spellInfo,
  //     reason: e.reason
  //   })
  // })
  // return result
});

const spellInfoToShowInLeftList = computed(() => {
  return turnToSpellsInfo(spellsOnCharacter.value);
});

function getSpellOnCharacterInfo(id: string) {
  const result = spellsOnCharacter.value.find((e) => e.spellId === id);
  if (!result) {
    throw Error("未找到法术" + id);
  } else {
    return result;
  }
}

// function removeSpell(spellName: string) {
//   props.character.spells.splice(props.character.spells.indexOf(spellName), 1);
//   // updateCharacterInfo(props.character.id, { spells: props.character.spells });
// }
</script>
<style lang="less" scoped>
.spells-of-character-content {
  display: flex;
  border: 2px solid #ccc;
  position: relative;
  height: 400px;
  padding: 10px;
}

.spells-of-character {
  width: 100%;
  overflow: auto;

  .switch-button {
    margin: 20px;
  }

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
