<template>
  <div class="backpack-content">
    <h1 class="background-text">区域物品</h1>
    <div class="items-list">
      <div
        v-for="(item, i) in sceneInfo.items"
        :key="item.id"
        @click="() => handleClickItem(item)"
        class="item-in-backpack"
        :class="{ 'item-chosen': chosenItem === item }"
      >
        {{ item.name }}
      </div>
      <div class="add-item-button" @click="handleAddItem">+</div>
    </div>
    <div class="item-information">
      <div v-if="!isEditing && chosenItem">
        <el-descriptions :title="chosenItem.name">
          <el-descriptions-item label="描述">{{ chosenItem.description }}</el-descriptions-item>
          <el-descriptions-item label="PL可见：">{{
            chosenItem.showForPlayer
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-if="isEditing && itemInfoInEdit">
        <el-form>
          <el-form-item label="名称：">
            <el-input v-model="itemInfoInEdit.name" />
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" v-model="itemInfoInEdit.description" />
          </el-form-item>
          <el-form-item label="点位：">
            <el-input v-model="itemInfoInEdit.points" />
          </el-form-item>
          <el-form-item label="PL可见：">
            <el-switch v-model="itemInfoInEdit.showForPlayer" />
          </el-form-item>
          <el-form-item label="颜色：">
            <el-color-picker v-model="itemInfoInEdit.backgroundColor" />
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
      <div class="button-area">
        <el-button v-if="!isEditing && chosenItem" @click="handleEditButton" size="small"
          >修改</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { updateCharacterInfo, updateSceneInfo } from "@/api/socket-tasks";
import { SceneItem } from "@trpg/shared";
import { Scene } from "@trpg/shared";
import { ElMessage } from "element-plus";
import { PropType, ref } from "vue";

const props = defineProps({
  sceneInfo: {
    type: Object as PropType<Scene>,
    required: true,
  },
});

if (!props.sceneInfo.items) {
  props.sceneInfo.items = [];
}

const chosenItem = ref<SceneItem | null>(null);
const itemInfoInEdit = ref<SceneItem | null>(null);
const isEditing = ref(false);

function handleClickItem(item: SceneItem) {
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
  props.sceneInfo.items.forEach((e) => {
    if (e.id > maxId) {
      maxId = e.id;
    }
  });

  itemInfoInEdit.value = {
    id: maxId + 1,
    name: "",
    points: [],
    description: "",
    backgroundColor: "#ccc",
    showForPlayer: false,
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
    updateSceneInfo(props.sceneInfo.id, props.sceneInfo);
  } else if (itemInfoInEdit.value) {
    props.sceneInfo.items.push(itemInfoInEdit.value);
    updateCharacterInfo(props.sceneInfo.id, props.sceneInfo);
  }
  isEditing.value = false;
}

function handleCancel() {
  itemInfoInEdit.value = null;
  isEditing.value = false;
}

function handleDeleteItem() {
  if (itemInfoInEdit.value) {
    props.sceneInfo.items = props.sceneInfo.items.filter((e) => e.id !== itemInfoInEdit.value?.id);
  }

  itemInfoInEdit.value = null;
  chosenItem.value = null;
  isEditing.value = false;

  updateCharacterInfo(props.sceneInfo.id, props.sceneInfo);
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
.button-area {
  display: flex;
  justify-content: space-around;
}
</style>
