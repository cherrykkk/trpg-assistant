<template>
  <div class="spell-select">
    <div class="filter-option">
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
import { type PropType, computed, ref } from "vue";
import SpellItem from "@/views/components/SpellItem.vue";
import type { SpellInfo, SpellOnCharacter } from "@trpg/shared";

const props = defineProps({
  spellDatabase: {
    type: Array as PropType<SpellInfo[]>,
    default: [],
  },
  existSpell: {
    type: Array as PropType<SpellOnCharacter[]>,
    default: [],
  },
  defaultClassOption: {
    type: String,
  },
  hideAddButton: Boolean,
});

type ClassOption = keyof SpellInfo | "全部";

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

// filter
const classOption = ["全部", "诗人", "牧师", "德鲁伊", "圣武士", "游侠", "术士", "邪术士", "法师"];
const filterClass = ref<keyof SpellInfo | "全部">("全部");
(function initFilterClass() {
  if (classOption.includes(props.defaultClassOption ?? "")) {
    filterClass.value = props.defaultClassOption as ClassOption;
  } else if (props.defaultClassOption === "吟游诗人") {
    filterClass.value = "诗人";
  } else if (props.defaultClassOption === "邪术师") {
    filterClass.value = "邪术士";
  }
})();

function handleSelectClass(e: Event) {
  filterClass.value = (e.target as HTMLSelectElement).value as ClassOption;
}

const filteredSpellDatabase = computed(() => {
  let result = props.spellDatabase;
  const fc = filterClass.value;
  if (fc !== "全部") {
    result = props.spellDatabase.filter((e) => e[fc]);
  }
  return result.sort((a, b) => a.等级 - b.等级);
});
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
  overscroll-behavior: contain;
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
