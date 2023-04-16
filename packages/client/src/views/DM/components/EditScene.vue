<template>
  <div>
    <el-input v-model="editedScene.name" placeholder="请输入唯一场景名" />
    <el-input type="textarea" v-model="editedScene.description" placeholder="请输入场景描述" autosize />
    <el-upload drag :on-change="handleChangePicture" :auto-upload="false" class="picture-upload">
      <div>放入场景图</div>
    </el-upload>
    上级场景
    <el-select v-model="editedScene.father" placeholder="Select" style="width: 115px">
      <el-option v-for="scene in useSceneStore().scenes" :key="scene.name" :value="scene.name" />
    </el-select>
  </div>
  <el-button type="primary" @click="updateEdit">确认修改</el-button>
  <el-button type="primary" @click="useSceneStore().isEditing = false">取消</el-button>
</template>

<script lang="ts" setup>
import { useSceneStore } from "@/stores/useSceneStore";
import { PropType, reactive } from "vue";
import { updateSceneInfo } from '@/api/socket-tasks'
import type { Scene } from '@trpg/shared'

const props = defineProps({
  scene: Object as PropType<Scene>,
});

const editedScene = reactive<{ [key: string]: any }>({
  picture: null,
  name: null,
  description: null,
  father: null,
  areaX: null,
  areaY: null,
});

if (props.scene) {
  for (let e in editedScene) {
    if (props.scene[e] && e !== "id") editedScene[e] = props.scene[e];
  }
}

function handleChangePicture(uploadFile: any) {
  const scene = useSceneStore().currentScene;
  const reader = new FileReader();
  reader.readAsDataURL(uploadFile.raw);
  reader.onload = () => {
    if (scene) {
      scene.picture = reader.result as string;
      useSceneStore().updateScene({ picture: reader.result }, scene.id);
    }
  };
}

function updateEdit() {
  if (!editedScene.father) {
    console.log("请选择父级场景");
    return;
  }
  if (props.scene) {
    updateSceneInfo(props.scene.id, editedScene)
  } else {
    useSceneStore().createNewScene(editedScene);
  }
  useSceneStore().isEditing = false;
}
</script>
<style lang="less" scoped>
.picture-upload {
  height: 200;
  width: 200;
}
</style>
