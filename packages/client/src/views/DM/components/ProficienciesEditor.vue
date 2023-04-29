<template>
  <div class="proficiencies-editor">
    <div>熟练项（技能、武器、护甲、工具）</div>
    <div style="text-align: left">熟练加值：3</div>
    <div class="items-list">
      <div
        v-for="(p, i) in characterInfo.proficiencies"
        :key="p.name"
        @click="() => handleClickItem(p)"
        :class="{ 'item-chosen': itemInfoInEdit === p }"
      >
        <span style="font-size: 14px">{{ p.name }}</span>
        <span style="font-size: 12px; color: #333; font-weight: 200">{{
          ProficiencyType[p.type]
        }}</span>
      </div>
      <div @click="handleAddItem">+</div>
    </div>
    <div class="item-object-editor" v-if="itemInfoInEdit">
      <el-radio-group v-model="itemInfoInEdit.type" size="small">
        <el-radio-button label="skill">技能</el-radio-button>
        <el-radio-button label="armor">护甲</el-radio-button>
        <el-radio-button label="weapon">武器</el-radio-button>
        <el-radio-button label="tool">工具</el-radio-button>
        <el-radio-button label="save">豁免</el-radio-button>
      </el-radio-group>
      <EditCell v-model="itemInfoInEdit.name" prefix="名称" />
      <EditCell v-model="itemInfoInEdit.bonus" prefix="熟练加值" />
      <EditCell v-model="itemInfoInEdit.description" prefix="描述" />
      <button @click="handleDeleteItem">删除</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { updateCharacterInfo } from "@/api/socket-tasks";
import { CharacterInfo, ProficiencyObject, ProficiencyType } from "@trpg/shared";
import { PropType, computed, onMounted, ref, watch } from "vue";
import EditCell from "./EditCell.vue";

const props = defineProps({
  characterInfo: {
    type: Object as PropType<CharacterInfo>,
    required: true,
  },
});

if (!props.characterInfo.proficiencies) {
  props.characterInfo.proficiencies = [];
}

const itemInfoInEdit = ref<ProficiencyObject | null>(props.characterInfo.proficiencies[0]);
watch(
  itemInfoInEdit,
  () => {
    if (!itemInfoInEdit.value) {
      handleAddItem();
    }
  },
  { immediate: true }
);
function handleClickItem(item: ProficiencyObject) {
  itemInfoInEdit.value = item;
}

function handleAddItem() {
  itemInfoInEdit.value = {
    type: "skill",
    name: "",
    description: "",
    bonus: 0,
  };
  props.characterInfo.proficiencies.push(itemInfoInEdit.value);
}

function handleDeleteItem() {
  let previous = props.characterInfo.proficiencies[0];
  for (let e of props.characterInfo.proficiencies) {
    if (e !== itemInfoInEdit.value) {
      previous = e;
    } else {
      break;
    }
  }

  props.characterInfo.proficiencies = props.characterInfo.proficiencies.filter(
    (e) => e !== itemInfoInEdit.value
  );
  itemInfoInEdit.value = previous;
}

function makeNameUnique(arrayData: { name: string }[]) {
  arrayData.forEach((e, i) => {
    const sameNameTarget = arrayData.find((e2) => e2.name === e.name);
    if (sameNameTarget !== e) {
      e.name = `${e.name}'`;
    }
  });
}

function getRidOfNullProficiency(arrayData: ProficiencyObject[]) {
  return arrayData.filter((e) => e.name || e.description);
}

onMounted(() => {
  props.characterInfo.proficiencies = getRidOfNullProficiency(props.characterInfo.proficiencies);
  makeNameUnique(props.characterInfo.proficiencies);
});
</script>

<style lang="less" scoped>
.proficiencies-editor {
  position: relative;
  border: 2px solid #ccc;
  padding: 5px 10px;
  height: 100%;
  box-sizing: border-box;
  .background-text {
    position: absolute;
    line-height: 100px;
    color: #ccc;
    text-align: center;
    margin: 0;
    width: 100%;
    z-index: -1;
  }
}
.items-list {
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  > div {
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #666;
    margin: 2px;
    padding: 2px;
    min-width: 50px;
    max-width: 100px;
    cursor: pointer;
    > span {
      margin: 2px;
    }
  }
  .item-chosen {
    border: 1px solid red;
    color: #a60a0a;
  }
}
.add-item-button {
  background-color: rgb(73, 169, 73);
  color: white;
}

.item-description {
  font-size: 12px;
}
.item-object-editor {
  .el-input-number {
    margin: 0 10px 0 30px;
  }
}
</style>
