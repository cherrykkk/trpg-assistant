<template>
  <div class="edit-character-info">
    <div class="page-header">
      <h3 style="display: inline">{{ character?.name || "新增角色" }}</h3>
      <el-button @click="() => emit('closeDialog')" v-if="!character">取消</el-button>
      <el-button @click="handleCreateCharacter" v-if="!character">新建角色</el-button>
      <el-button @click="copyPlayerURL" v-if="character && canCopy">复制角色卡片链接</el-button>
      <el-button @click="handleDeleteCharacter" v-if="character" type="danger">删除角色</el-button>
      <el-button @click="handleClose" v-if="editedData" type="primary">关闭</el-button>
    </div>
    <span @click="copyPlayerURL" v-if="character && !canCopy">角色卡链接：{{ playerInfoURL }}</span>
    <EditCharacterInfo
      ref="editCharacterInfoRef"
      :character="editedData"
      :accessible-scenes="useSocketStore().clientSceneTree"
      :entities-database="useSocketStore().collections.entity"
    />
  </div>
</template>

<script lang="ts" setup>
import { type PropType, onBeforeUnmount, reactive, ref } from "vue";
import { useSocketStore } from "@/stores/useSocketStore";
import { updateCharacterInfo, createCharacterInfo, deleteCharacterInfo } from "@/api/socket-tasks";
import { createNewCharacterInfoTemplate, type CharacterInfo } from "@trpg/shared";
import { ElMessage } from "element-plus";
import EditCharacterInfo from "@/views/components/EditCharacterInfo.vue";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo | null>,
  },
});
const emit = defineEmits(["closeDialog"]);

const editedData = reactive(props.character ?? createNewCharacterInfoTemplate());
const editCharacterInfoRef = ref<InstanceType<typeof EditCharacterInfo>>();

const scene = useSocketStore().currentScene;
if (!props.character && scene) {
  editedData.locationSceneId = scene._id;
}

let deleteLock = true;
function handleDeleteCharacter() {
  if (!props.character) return;
  if (deleteLock === true) {
    deleteLock = false;
    setTimeout(() => {
      deleteLock = true;
      ElMessage("请快速双击");
    }, 1000);
    return;
  }
  deleteCharacterInfo(props.character?._id);
  emit("closeDialog");
}

function handleClose() {
  emit("closeDialog");
}

const { canCopy, playerInfoURL, copyPlayerURL } = initClipboard();

function initClipboard() {
  const canCopy = Boolean(navigator.clipboard);
  const playerInfoURL = `${location.host}/#/player/${props.character?._id}`;
  async function copyPlayerURL() {
    navigator.clipboard.writeText(playerInfoURL);
    ElMessage.success("已复制");
  }
  return { canCopy, playerInfoURL, copyPlayerURL };
}

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // 阻止默认行为，即保存网页
    saveChanges();
  }
});

function handleCreateCharacter() {
  saveChanges();
  emit("closeDialog");
}

function saveChanges() {
  const newData = editCharacterInfoRef.value?.getEditData();
  if (!newData) return;

  if (!props.character || !props.character._id) {
    createCharacterInfo(newData);
  } else {
    updateCharacterInfo(props.character._id, newData);
    ElMessage.success("已保存");
  }
}

onBeforeUnmount(() => {
  saveChanges();
});
</script>

<style lang="less" scoped>
.edit-character-info {
  --background-color: white;
  width: 100%;
  height: 100%;
  top: 0;
  background: var(--background-color);
  z-index: 10;
  overflow: auto;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  .page-header {
    position: sticky;
    top: 0;
    background: var(--background-color);
    z-index: 20;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
