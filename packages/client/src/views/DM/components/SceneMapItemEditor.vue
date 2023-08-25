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
      <div v-if="isEditing && chosenItem">
        <el-form>
          <el-form-item label="名称：">
            <el-input v-model="chosenItem.name" />
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" v-model="chosenItem.description" />
          </el-form-item>
          <el-form-item label="点位：">
            <div v-for="point in chosenItem.points">
              {{ point.x }},{{ point.y }}
              <el-button @click="() => deletePoint(point)">删除</el-button>
            </div>
            <el-input v-model="lastPoint.x" />
            <el-input v-model="lastPoint.y" />
            <el-button @click="handleAddPoint">添加点</el-button>
          </el-form-item>
          <el-form-item label="PL可见：">
            <el-switch v-model="chosenItem.showForPlayer" />
          </el-form-item>
          <el-form-item label="颜色：">
            <el-color-picker v-model="chosenItem.backgroundColor" />
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
import { updateSceneInfo } from "@/api/socket-tasks";
import type { SceneItem, Scene } from "@trpg/shared";
import {} from "@trpg/shared";
import { ElMessage } from "element-plus";
import { type PropType, ref } from "vue";

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
const lastPoint = ref({ x: 0, y: 0 });
const isEditing = ref(false);

function handleClickItem(item: SceneItem) {
  if (isEditing.value) {
    handleOk();
  }
  if (chosenItem.value?.id === item.id) {
    chosenItem.value = null;
    isEditing.value = false;
  } else {
    chosenItem.value = item;
    isEditing.value = false;
  }
}

function handleAddItem() {
  isEditing.value = true;

  let maxId = 0;
  props.sceneInfo.items.forEach((e) => {
    if (e.id > maxId) {
      maxId = e.id;
    }
  });

  chosenItem.value = {
    id: maxId + 1,
    name: "",
    points: [],
    description: "",
    backgroundColor: "#ccc",
    showForPlayer: false,
  };
  props.sceneInfo.items.push(chosenItem.value);
}

function handleEditButton() {
  isEditing.value = true;
}

function handleAddPoint() {
  if (chosenItem.value) {
    const isPointExist = chosenItem.value.points.find(
      (e) => e.x === lastPoint.value.x && e.y === lastPoint.value.y
    );
    if (isPointExist) {
      ElMessage.info("点已存在");
      return;
    }
    chosenItem.value.points.push({ ...lastPoint.value });
  }
}
function deletePoint(point: { x: number; y: number }) {
  if (!chosenItem.value) return;
  console.log(chosenItem.value.points);
  chosenItem.value.points = chosenItem.value.points.filter(
    (e) => e.x !== point.x && e.y !== point.y
  );
}

function handleOk() {
  if (chosenItem.value) {
    updateSceneInfo(props.sceneInfo._id, props.sceneInfo);
  }
  isEditing.value = false;
}

function handleCancel() {
  isEditing.value = false;
}

function handleDeleteItem() {
  if (chosenItem.value) {
    props.sceneInfo.items = props.sceneInfo.items.filter((e) => e.id !== chosenItem.value?.id);
  }

  chosenItem.value = null;
  isEditing.value = false;

  updateSceneInfo(props.sceneInfo._id, props.sceneInfo);
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
