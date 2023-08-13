<template>
  <div class="backpack-content">
    <h1 class="background-text">背包(物品信息)</h1>
    <div style="display: flex; justify-content: space-between">
      <span style="text-align: left">总重量 {{ totalWeight }}</span>
      <span>
        <el-button v-if="!isEditing" @click="enterEditMode" size="small">编辑</el-button>
        <el-button v-else @click="() => (isEditing = false)" size="small">完成</el-button>
      </span>
    </div>
    <div class="items-list">
      <div
        v-for="(item, i) in backpackInfo"
        :key="item.id"
        @click="clickItem(item)"
        class="item-in-backpack"
        :class="{ 'item-chosen': chosenStackInfo?.stackId === item.stackId }"
      >
        <div>{{ item.name }}{{ (item.num ?? 1) === 1 ? "" : `*${item.num}` }}</div>
        <span
          v-if="chosenStackInfo?.stackId === item.stackId"
          class="delete-button"
          @click.stop="() => deleteItem(item)"
          :class="{ 'delete-button-unlock': !deleteLock }"
          >删除</span
        >
      </div>
      <div class="add-item-button">
        <ElSelect placeholder="+" @change="handleAddItem">
          <ElOption v-for="item in ENTITY_DATABASE" :key="item.id" :label="item.name" :value="item"
        /></ElSelect>
      </div>
    </div>
    <div class="item-information" v-if="chosenStackInfo">
      <div>
        <el-descriptions>
          <template #title>
            {{ chosenStackInfo.name
            }}{{ (chosenStackInfo.num ?? 1) === 1 ? "" : `*${chosenStackInfo.num}` }}
            <span style="font-weight: 500; font-size: 14px; margin: 40px">{{
              calculateWeight(chosenStackInfo)
            }}</span>
          </template>
          <el-descriptions-item>{{ chosenStackInfo.description }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="isEditing" class="item-object-editor">
        <el-form>
          <el-form-item label="额外描述：">
            <el-input type="textarea" v-model="chosenStackInfo.stackDescription" />
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number label="数量" v-model="chosenStackInfo.num" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ENTITY_DATABASE, type CharacterInfo, type ItemInfo } from "@trpg/shared";
import { PropType, computed, ref } from "vue";
import { EntityStack, SingleEntityManager } from "general-model";
import { ElOption, ElSelect } from "element-plus";

EntityStack.INFO_DATABASE = ENTITY_DATABASE;

const props = defineProps({
  characterInfo: {
    type: Object as PropType<CharacterInfo>,
    required: true,
  },
});

const manager = new SingleEntityManager<ItemInfo>();

type StackInfo = ReturnType<SingleEntityManager<ItemInfo>["listAllStackWithInfo"]>[number];

const backpackInfo = ref<StackInfo[]>([]);
function putInManager(id: number, num = 1, description = "") {
  const entity = new EntityStack<ItemInfo>(id, num);
  entity.stackDescription = description;
  manager.putInEntity(entity);
  backpackInfo.value = manager.listAllStackWithInfo();
  emitChange();
}
props.characterInfo.backpack.forEach((e) => {
  putInManager(e.id, e.num, e.description);
});

function deleteStackOfManager(stackId: number) {
  manager.storage = manager.storage.filter((e) => e.stackId !== stackId);
  backpackInfo.value = manager.listAllStackWithInfo();
  emitChange();
}

if (!props.characterInfo.backpack) {
  props.characterInfo.backpack = [];
}

const totalWeight = computed(() => {
  return calculateWeight(backpackInfo.value);
});

const chosenStackInfo = ref<StackInfo | null>(null);
function clickItem(stackInfo: StackInfo) {
  chosenStackInfo.value = stackInfo;
  deleteLock.value = true;
}

const isEditing = ref(true);
function enterEditMode() {
  isEditing.value = true;
  if (!chosenStackInfo.value) {
    chosenStackInfo.value = backpackInfo.value[0];
  }
}

function handleAddItem(info: ItemInfo) {
  isEditing.value = true;
  putInManager(info.id, 1);
  chosenStackInfo.value = backpackInfo.value[backpackInfo.value.length - 1];
}

const deleteLock = ref(true);
function deleteItem(item: StackInfo) {
  if (deleteLock.value) {
    deleteLock.value = false;
    return;
  }
  deleteStackOfManager(item.stackId);
  chosenStackInfo.value = null;
  emitChange();
}

function emitChange() {
  props.characterInfo.backpack = manager.storage.map((e) => ({
    id: e.id,
    num: e.num,
    description: e.stackDescription,
  }));
}

function calculateWeight(items: StackInfo | StackInfo[]) {
  if (!Array.isArray(items)) {
    items = [items];
  }

  let ounce = 0,
    pound = 0;
  items.forEach((e) => {
    const count = e.num ?? 1;
    ounce += e.ounce * count;
    pound += e.pound * count;
  });
  pound += Math.floor(ounce / 16);
  ounce = Math.round(ounce % 16);
  if (pound === 0) {
    return `${ounce} 盎司`;
  } else if (ounce === 0) {
    return `${pound} 磅`;
  } else {
    return ` ${pound} 磅 ${ounce} 盎司`;
  }
}
</script>

<style lang="less" scoped>
.backpack-content {
  position: relative;
  border: 2px solid #ccc;
  padding: 5px 10px;
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
  min-height: 100px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
}
.item-in-backpack,
.add-item-button {
  position: relative;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #666;
  margin: 2px;
  padding: 2px;
  height: 50px;
  min-width: 50px;
  max-width: 100px;
  cursor: pointer;
}
.item-chosen {
  border: 2px solid red;
  margin: 1px;
  .delete-button {
    bottom: 0;
    color: #ddd;
    position: absolute;
    &:hover {
      color: red;
    }
  }
  .delete-button-unlock {
    color: red;
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
