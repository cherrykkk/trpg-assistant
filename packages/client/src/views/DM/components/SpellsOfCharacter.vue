<template>
  <div class="spells-of-character-content">
    <div class="spells-of-character">
      <SpellItem :spell-info="useSocketStore().allSpellInfo[0]" />
      <div @click="() => (showSpellList = true)">add</div>
    </div>
    <div class="spells-info-list">
      <div v-show="showSpellList" v-for="spellInfo in useSocketStore().allSpellInfo">
        <SpellItem :spell-info="spellInfo" />
      </div>
    </div>
    <div class="spell-info-description">{{ useSocketStore().allSpellInfo[0].法术说明 }}</div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, PropType, ref } from "vue";
import { CharacterInfo } from "@trpg/shared";
import SpellItem from "./SpellItem.vue";
import { useSocketStore } from "@/stores/useSocketStore";
const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo>,
    required: true,
  },
});

const showSpellList = ref(false);

const isAdding = ref(false);
const InputRef = ref();
const isRemoving = ref(false);
const newSpellName = ref("");

const showInput = () => {
  isAdding.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  // if (newSpellName.value) {
  //   props.character.spells.push(newSpellName.value);
  //   updateCharacterInfo(props.character.id, { spells: props.character.spells });
  // }
  isAdding.value = false;
  newSpellName.value = "";
};

function removeSpell(spellName: string) {
  props.character.spells.splice(props.character.spells.indexOf(spellName), 1);
  // updateCharacterInfo(props.character.id, { spells: props.character.spells });
}
</script>
<style lang="less" scoped>
.spells-of-character-content {
  display: flex;
  border: 2px solid #ccc;
  position: relative;
  min-height: 400px;
}
.spells-of-character {
  width: 50%;
}
.spells-info-list {
  max-height: 400px;
  overflow: auto;
  width: 50%;
  border-left: 1px solid #ddd;
  margin: 10px;
}
.spell-info-description {
  position: absolute;
  width: 40%;
  height: 80%;
  min-height: 200px;
  background-color: #eee;
  padding: 10px;
}
</style>
