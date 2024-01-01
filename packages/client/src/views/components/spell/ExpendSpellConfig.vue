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
          <div class="delete-button" @click="() => handleDeleteSpell(s._id)">-</div>
        </div>
      </div>
    </div>
    <div class="spells-in-database" v-if="showSpellList">
      <div v-for="spellInfo in filteredSpellDatabase" :key="spellInfo._id">
        <SpellItem
          :spell-info="spellInfo"
          :show-description="spellIdToShowDescription.includes(spellInfo._id)"
          @switch-description="handleSwitchDescription"
        />
        <div v-if="!hideAddButton && spellIdToShowDescription.includes(spellInfo._id)">
          <div v-if="existSpellIds.includes(spellInfo._id)" class="add-button">~</div>
          <div v-else class="add-button" @click="() => handleAddSpell(spellInfo._id)">+</div>
        </div>
      </div>
    </div>
    <div class="quick-operator">
      <div class="filter-option" v-if="showSpellList">
        <input @input="onNameInputChange" />
        <select @change="handleSelectClass">
          <option v-for="e in classOption" :selected="filterClass === e">{{ e }}</option>
        </select>
      </div>
      <button v-if="spellIdToShowDescription.length === 0" @click="expandAll">全部展开</button>
      <button v-else @click="spellIdToShowDescription = []">全部收起</button>
      <button v-if="!showSpellList" @click="() => (showSpellList = !showSpellList)">
        打开可选
      </button>
      <button v-if="showSpellList" @click="() => (showSpellList = !showSpellList)">收起可选</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PropType, computed, ref } from "vue";
import SpellItem from "@/views/components/SpellItem.vue";
import { turnToSpellsInfo } from "@/stores/utils";
import { useSpellFilter } from "@/stores/hooks";

const props = defineProps({
  existSpellIds: {
    type: Array as PropType<string[]>,
    default: [],
  },
  defaultClassOption: {
    type: String,
  },
  hideAddButton: Boolean,
});

function expandAll() {
  spellIdToShowDescription.value = filteredSpellDatabase.value.map((e) => e._id);
}

const spellIdToShowDescription = ref<string[]>([]);

const { filteredSpellDatabase, classOption, handleSelectClass, filterClass, onNameInputChange } =
  useSpellFilter("全部");

function handleSwitchDescription(id: string) {
  if (spellIdToShowDescription.value.includes(id)) {
    spellIdToShowDescription.value = spellIdToShowDescription.value.filter((e) => e !== id);
  } else {
    spellIdToShowDescription.value.push(id);
  }
}

const emit = defineEmits<{ (event: "update", data: string[]): void }>();

function handleAddSpell(spellId: string) {
  emit("update", [...props.existSpellIds, spellId]);
}

function handleDeleteSpell(spellId: string) {
  emit(
    "update",
    props.existSpellIds.filter((e) => e !== spellId)
  );
}

const showSpellList = ref(props.existSpellIds.length === 0);

const spellInfoToShowInLeftList = computed(() => {
  return turnToSpellsInfo(props.existSpellIds);
});
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

.spells-in-database {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-left: 1px solid #ddd;
  margin-right: -8px;
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

.quick-operator {
  position: absolute;
  top: 0;
  right: 0;
  * > {
    float: right;
  }
  cursor: pointer;
}
</style>
