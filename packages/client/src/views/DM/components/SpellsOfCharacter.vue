<template>
  <div class="spells-of-character-content">
    <div class="spells-of-character">
      <div v-for="s in spellsOnCharacter" :key="s.spellId">
        <SpellItem :spell-info="getSpellInfoById(s.spellId)"
          :show-description="spellIdToShowDescription.includes(s.spellId)"
          @switch-description="handleSwitchDescription" />
        <div v-if="spellIdToShowDescription.includes(s.spellId)" class="spell-on-character-info">
          <TapToEditDescription v-model="s.reason" />
          <div class="delete-button" @click="() => handleDeleteSpell(s.spellId)">-</div>
        </div>
      </div>
      <el-button class="switch-button" @click="() => (showSpellList = !showSpellList)">
        {{ showSpellList ? `关闭列表` : `打开列表` }}
      </el-button>
    </div>
    <div class="spells-in-database" v-show="showSpellList">
      <div v-for="spellInfo in useSocketStore().allSpellInfo" :key="spellInfo.id">
        <SpellItem :spell-info="spellInfo" :show-description="spellIdToShowDescription.includes(spellInfo.id)"
          @switch-description="handleSwitchDescription" />
        <div v-if="spellIdToShowDescription.includes(spellInfo.id)">
          <div v-if="spellsOnCharacter.map(e => e.spellId).includes(spellInfo.id)">
            该法术已存在列表中
          </div>
          <div v-else class="add-button" @click="() => handleAddSpell(spellInfo.id)">+</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, computed, nextTick, ref } from "vue";
import { CharacterInfo } from "@trpg/shared";
import SpellItem from "./SpellItem.vue";
import { useSocketStore } from "@/stores/useSocketStore";
import TapToEditDescription from "./TapToEditDescription.vue";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo>,
    required: true,
  },
});

//已知法术/已准备法术
const knownOrPrepared = ref<"known" | "prepared">("known")

function handleSwitchDescription(id: string) {
  if (spellIdToShowDescription.value.includes(id)) {
    spellIdToShowDescription.value = spellIdToShowDescription.value.filter(e => e !== id)
  } else {
    spellIdToShowDescription.value.push(id)
  }
}

function handleAddSpell(spellId: string) {
  if (knownOrPrepared.value === 'prepared') {
    props.character.spellsPrepared.push({ spellId, reason: '' })
  } else {
    props.character.spellsKnown.push({ spellId, reason: '' })
  }
}

function handleDeleteSpell(spellId: string) {
  if (knownOrPrepared.value === 'prepared') {
    props.character.spellsPrepared = props.character.spellsPrepared.filter(e => e.spellId !== spellId)
  } else {
    props.character.spellsKnown = props.character.spellsKnown.filter(e => e.spellId !== spellId)
  }
}

const reasonInputRef = ref()
function handleEditReason(spellId: string) {
  isEditingReasonOfSpellId.value = spellId
  nextTick(() => {
    document.getElementById("reason_input")?.focus()
  })
}

const spellIdToShowDescription = ref<string[]>([])
const showSpellList = ref(false);
const isEditingReasonOfSpellId = ref<string | null>(null);

const spellsOnCharacter = computed(() => {

  return knownOrPrepared.value === "prepared" ? props.character.spellsPrepared : props.character.spellsKnown
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
})

function getSpellInfoById(spellId: string) {
  const spellInfo = useSocketStore().allSpellInfo.find(spellInfo => spellInfo.id === spellId)
  if (!spellInfo) {
    console.log(`无法找到 id 为 ${spellId} 的法术`)
    throw `无法找到 id 为 ${spellId} 的法术`
  }
  return spellInfo
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
    margin: 20px
  }

  .spell-on-character-info {
    display: flex;
    justify-content: space-between;
    margin: 2px;
    line-height: 24px;
  }

}

.spells-in-database {
  width: 100%;
  max-height: 400px;
  overflow: auto;
  border-left: 1px solid #ddd;
  margin-right: -8px;
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
