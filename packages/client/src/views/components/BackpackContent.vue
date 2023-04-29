<template>
  <div class="backpack-content">
    <h1 class="background-text">背包(物品信息)</h1>
    <div style="text-align: left">总重量 {{ totalWeight }}</div>
    <div class="items-list">
      <div
        v-for="(item, i) in characterInfo.backpack"
        :key="item.id"
        @click="() => handleClickItem(item)"
        class="item-in-backpack"
        :class="{ 'item-chosen': chosenItem === item }"
      >
        {{ item.name }}{{ (item.count ?? 1) === 1 ? "" : `*${item.count}` }}
      </div>
      <div class="add-item-button" @click="handleAddItem">+</div>
    </div>
    <div class="item-information">
      <div v-if="!isEditing && chosenItem">
        <el-descriptions>
          <template #title>
            {{ chosenItem.name }}{{ (chosenItem.count ?? 1) === 1 ? "" : `*${chosenItem.count}` }}
            <span style="font-weight: 500; font-size: 14px; margin: 40px">{{
              calaculateWeight(chosenItem)
            }}</span>
          </template>
          <template #extra>
            <el-button v-if="!isEditing && chosenItem" @click="handleEditButton" size="small"
              >修改</el-button
            >
          </template>
          <el-descriptions-item>{{ chosenItem.description }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="isEditing && itemInfoInEdit" class="item-object-editor">
        <el-form>
          <el-form-item label="名称：">
            <el-input v-model="itemInfoInEdit.name" />
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" v-model="itemInfoInEdit.description" />
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number label="数量" v-model="itemInfoInEdit.count" />
          </el-form-item>
          <el-form-item label="单重">
            <el-input-number v-model="itemInfoInEdit.pound" />磅
            <el-input-number v-model="itemInfoInEdit.ounce" />盎司
          </el-form-item>
          <el-form-item>
            <el-button v-if="isEditing" @click="handleDeleteItem" size="small">删除</el-button>
            <el-button v-if="isEditing" @click="handleCancel" size="small">取消</el-button>
            <el-button v-if="isEditing" @click="handleOk" size="small" type="primary"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { updateCharacterInfo } from "@/api/socket-tasks";
import { CharacterInfo, ItemObject } from "@trpg/shared";
import { ElMessage } from "element-plus";
import { PropType, computed, ref } from "vue";

const props = defineProps({
  characterInfo: {
    type: Object as PropType<CharacterInfo>,
    required: true,
  },
});

if (!props.characterInfo.backpack) {
  props.characterInfo.backpack = [];
}

const totalWeight = computed(() => {
  return calaculateWeight(props.characterInfo.backpack);
});

const chosenItem = ref<ItemObject | null>(null);
const itemInfoInEdit = ref<ItemObject | null>(null);
const isEditing = ref(false);

function handleClickItem(item: ItemObject) {
  if (isEditing.value && itemInfoInEdit.value?.name) {
    ElMessage.error("请先保存或取消修改");
  } else if (chosenItem.value?.id === item.id) {
    chosenItem.value = null;
  } else {
    chosenItem.value = item;
    itemInfoInEdit.value = null;
    isEditing.value = false;
  }
}

function handleAddItem() {
  isEditing.value = true;
  chosenItem.value = null;

  let maxId = 0;
  props.characterInfo.backpack.forEach((e) => {
    if (e.id > maxId) {
      maxId = e.id;
    }
  });

  itemInfoInEdit.value = {
    id: maxId + 1,
    name: "",
    count: 1,
    description: "",
    ounce: 0,
    pound: 0,
  };
}

function handleEditButton() {
  if (chosenItem.value) {
    isEditing.value = true;
    itemInfoInEdit.value = { ...chosenItem.value };
  }
}

function handleOk() {
  if (chosenItem.value && itemInfoInEdit.value) {
    Object.assign(chosenItem.value, itemInfoInEdit.value);
    updateCharacterInfo(props.characterInfo.id, props.characterInfo);
  } else if (itemInfoInEdit.value) {
    props.characterInfo.backpack.push(itemInfoInEdit.value);
    updateCharacterInfo(props.characterInfo.id, props.characterInfo);
  }
  isEditing.value = false;
}

function handleCancel() {
  itemInfoInEdit.value = null;
  isEditing.value = false;
}

function handleDeleteItem() {
  if (itemInfoInEdit.value) {
    props.characterInfo.backpack = props.characterInfo.backpack.filter(
      (e) => e.id !== itemInfoInEdit.value?.id
    );
  }

  itemInfoInEdit.value = null;
  chosenItem.value = null;
  isEditing.value = false;

  updateCharacterInfo(props.characterInfo.id, props.characterInfo);
}

function calaculateWeight(items: ItemObject | ItemObject[]) {
  if (!Array.isArray(items)) {
    items = [items];
  }

  let ounce = 0,
    pound = 0;
  items.forEach((e) => {
    const count = e.count ?? 1;
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
  background-color: #111;
  color: white;
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
