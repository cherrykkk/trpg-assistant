<template>
  <div class="spell-select">
    <div class="filter-option">
      <input @input="onNameInputChange" />
      <select @change="handleSelectClass">
        <option v-for="e in classOption" :selected="filterClass === e">{{ e }}</option>
      </select>
    </div>
    <div class="spells-in-database">
      <div v-for="spellInfo in filteredSpellDatabase" :key="spellInfo._id">
        <SpellItem
          :spell-info="spellInfo"
          :show-description="spellIdToShowDescription.includes(spellInfo._id)"
          @switch-description="handleSwitchDescription"
        />
        <div v-if="!hideAddButton && spellIdToShowDescription.includes(spellInfo._id)">
          <div v-if="existSpell.map((e) => e.spellId).includes(spellInfo._id)" class="add-button">
            ~
          </div>
          <div v-else class="add-button" @click="() => handleAddSpell(spellInfo._id)">+</div>
        </div>
      </div>
    </div>
    <div class="quick-operator">
      <button v-if="spellIdToShowDescription.length === 0" @click="expandAll">全部展开</button>
      <button v-else @click="spellIdToShowDescription = []">全部收起</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PropType, ref } from "vue";
import SpellItem from "@/views/components/SpellItem.vue";
import { type SpellOnCharacter } from "@trpg/shared";
import { useSpellFilter } from "@/stores/hooks";

const props = defineProps({
  existSpell: {
    type: Array as PropType<SpellOnCharacter[]>,
    default: [],
  },
  defaultClassOption: {
    type: String,
  },
  hideAddButton: Boolean,
});

const emits = defineEmits<{
  (event: "select", id: string): void;
}>();

function handleSwitchDescription(id: string) {
  if (spellIdToShowDescription.value.includes(id)) {
    spellIdToShowDescription.value = spellIdToShowDescription.value.filter((e) => e !== id);
  } else {
    spellIdToShowDescription.value.push(id);
  }
}

function expandAll() {
  spellIdToShowDescription.value = filteredSpellDatabase.value.map((e) => e._id);
}

function handleAddSpell(spellId: string) {
  emits("select", spellId);
}

const spellIdToShowDescription = ref<string[]>([]);

const { filteredSpellDatabase, classOption, handleSelectClass, filterClass, onNameInputChange } =
  useSpellFilter("全部");
</script>
<style lang="less" scoped>
.spell-select {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  border-left: 1px solid #ddd;
  margin-right: -8px;
}
.spells-in-database {
  overflow: auto;
  // overscroll-behavior: contain;
  > div {
    position: relative;
    .add-button {
      background-color: #8fc58f;
      color: white;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 24px;
      width: 1em;
      line-height: 1em;
      border-radius: 50%;
      margin: 2px 3px 0 0;
      font-weight: 900;
    }
  }
}

.delete-button {
  background-color: #e18989;
  color: white;
  width: 24px;
  border-radius: 50%;
}
.quick-operator {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
</style>
