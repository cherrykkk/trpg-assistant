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
        v-for="(item, i) in characterInfo.backpack"
        :key="item.id"
        @click="clickItem(item)"
        class="item-in-backpack"
        :class="{ 'item-chosen': chosenItem === item }"
      >
        <div>{{ item.name }}{{ (item.count ?? 1) === 1 ? "" : `*${item.count}` }}</div>
        <span
          v-if="chosenItem === item"
          class="delete-button"
          @click.stop="() => deleteItem(item)"
          :class="{ 'delete-button-unlock': !deleteLock }"
          >删除</span
        >
      </div>
      <div class="add-item-button" @click="handleAddItem">+</div>
    </div>
    <div class="item-information" v-if="chosenItem">
      <div v-if="!isEditing">
        <el-descriptions>
          <template #title>
            {{ chosenItem.name }}{{ (chosenItem.count ?? 1) === 1 ? "" : `*${chosenItem.count}` }}
            <span style="font-weight: 500; font-size: 14px; margin: 40px">{{
              calaculateWeight(chosenItem)
            }}</span>
          </template>
          <el-descriptions-item>{{ chosenItem.description }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="isEditing" class="item-object-editor">
        <el-form>
          <el-form-item label="名称：">
            <el-input v-model="chosenItem.name" />
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" v-model="chosenItem.description" />
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number label="数量" v-model="chosenItem.count" />
          </el-form-item>
          <el-form-item label="单重">
            <el-input-number v-model="chosenItem.pound" />磅
            <el-input-number v-model="chosenItem.ounce" />盎司
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
function clickItem(item: ItemObject) {
  chosenItem.value = item;
  deleteLock.value = true;
}

const isEditing = ref(false);
function enterEditMode() {
  isEditing.value = true;
  if (!chosenItem.value) {
    chosenItem.value = props.characterInfo.backpack[0];
  }
  if (!chosenItem.value) {
    handleAddItem();
  }
}

function handleAddItem() {
  isEditing.value = true;

  let maxId = 0;
  props.characterInfo.backpack.forEach((e) => {
    if (e.id > maxId) {
      maxId = e.id;
    }
  });

  const newItem = {
    id: maxId + 1,
    name: "",
    count: 1,
    description: "",
    ounce: 0,
    pound: 0,
  };

  chosenItem.value = newItem;
  props.characterInfo.backpack.push(newItem);
}

const deleteLock = ref(true);
function deleteItem(item: ItemObject) {
  if (deleteLock.value) {
    deleteLock.value = false;
    return;
  }

  props.characterInfo.backpack = props.characterInfo.backpack.filter((e) => e !== item);
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
