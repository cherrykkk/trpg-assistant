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
    <div class="character-info-edit-form">
      <el-radio-group v-model="editedData.scope" size="large" style="margin-bottom: 10px">
        <el-radio-button label="PC" />
        <el-radio-button label="NPC" />
        <el-radio-button label="template" />
        <el-radio-button label="monster" />
      </el-radio-group>
      <br />
      <div class="base-info-list">
        <EditCell v-model="editedData.name" title="姓名" />
        <EditCell v-model="editedData.titles" title="头衔" />
        <EditCell v-model="editedData.sex" title="性别" />
        <EditCell v-model="editedData.age" title="年龄" />
        <EditCell v-model="editedData.class" title="职业" />
        <EditCell v-model="editedData.race" title="种族" />
        <EditCell v-model="editedData.subRace" title="亚种" />
        <EditCell v-model="editedData.language" title="语言" />
        <TipPopover>
          <template #reference>？</template>
          <TipAlignment />
        </TipPopover>
        <EditCell v-model="editedData.alignment" title="阵营" />

        <EditCell v-model="editedData.experience" title="经验" />
        <EditCell v-model="editedData.maxHP" title="最大血量" />
        <EditCell v-model="editedData.currentHP" title="当前血量" />
        <EditCell v-model="editedData.speed" title="速度" />
        <EditCell v-model="editedData.armorClass" title="AC" />
      </div>
      <div class="ability-and-proficiencies-area">
        <div class="ability-info-panel">
          <EditCell v-model="editedData.strength" title="力量" />
          <EditCell v-model="editedData.dexterity" title="敏捷" />
          <EditCell v-model="editedData.constitution" title="体质" />
          <EditCell v-model="editedData.intelligence" title="智力" />
          <EditCell v-model="editedData.wisdom" title="感知" />
          <EditCell v-model="editedData.charisma" title="魅力" />
          <TipPopover>
            <template #reference>tip: 被动检定</template>
            <PassiveChecks />
          </TipPopover>
        </div>
        <div style="padding: 5px; min-width: 300px">
          <ProficienciesEditor :character-info="editedData" />
        </div>
      </div>

      <EditCell :textarea="true" v-model="editedData.appearance" title="角色外貌描述" />
      <EditCell :textarea="true" v-model="editedData.backgroundStory" title="角色背景故事" />
      <el-input v-model="editedData.location.sceneName">
        <template #prepend>所处地点</template>
        <template #append>
          <el-select
            v-model="editedData.location.sceneName"
            placeholder="Select"
            style="width: 115px"
          >
            <el-option
              v-for="scene in useSceneStore().scenes"
              :key="scene.name"
              :value="scene.name"
            />
          </el-select>
        </template>
      </el-input>
    </div>
    <div class="backpack-container">
      <EntityStorage :init-stored-stack-data="editedData.backpack" ref="backpackRef" />
    </div>
    <CharacterSpellEditor :character="editedData" />
  </div>
</template>

<script lang="ts" setup>
import { type PropType, onBeforeUnmount, reactive, ref } from "vue";
import { createNewCharacterInfoTemplate } from "@/utils/index";
import { useSceneStore } from "@/stores/useSceneStore";
import { updateCharacterInfo, createCharacterInfo, deleteCharacterInfo } from "@/api/socket-tasks";
import EditCell from "../../components/EditCell.vue";
import type { CharacterInfo } from "@trpg/shared";
import CharacterSpellEditor from "./CharacterSpellEditor.vue";
import { ElMessage } from "element-plus";
import ProficienciesEditor from "./ProficienciesEditor.vue";
import EntityStorage from "@/views/components/EntityStorage.vue";
import TipPopover from "@/views/components/tip-popovers/TipPopover.vue";
import TipAlignment from "@/views/components/tip-popovers/TipAlignment.vue";
import PassiveChecks from "@/views/components/tip-popovers/PassiveChecks.vue";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo | null>,
  },
});
const emit = defineEmits(["closeDialog"]);

const editedData = reactive(props.character ?? createNewCharacterInfoTemplate());

const scene = useSceneStore().currentScene;
if (!props.character && scene) {
  editedData.location.sceneName = scene.name;
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
  const playerInfoURL = `${location.host}/player/${props.character?._id}`;
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

const backpackRef = ref<typeof EntityStorage>();
function saveChanges() {
  if (backpackRef.value) {
    editedData.backpack = backpackRef.value.getData();
  }
  if (!props.character) {
    createCharacterInfo(editedData);
  } else {
    updateCharacterInfo(props.character._id, editedData);
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
  position: absolute;
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
.base-info-list {
  display: flex;
  flex-wrap: wrap;
}
.el-form-item {
  margin-bottom: 4px;
}

.ability-and-proficiencies-area {
  display: flex;

  .ability-info-panel {
    :deep(input) {
      width: 3em;
    }
  }
}

.backpack-container {
  margin: 10px 0;
  position: relative;
  z-index: 1;
  border: 2px solid #ccc;
}
</style>
