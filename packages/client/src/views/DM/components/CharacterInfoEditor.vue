<template>
  <div class="edit-character-info">
    <div class="page-header">
      <h3 style="display: inline">{{ character?.name || "新增角色" }}</h3>
      <el-button @click="() => emit('closeDialog')" v-if="!character">取消</el-button>
      <el-button @click="handleCreateCharacter" v-if="!character">确认创建新角色</el-button>
      <el-button @click="copyPlayerURL" v-if="character && canCopy">复制角色卡片链接</el-button>
      <el-button @click="handleDeleteCharacter" v-if="character" type="danger"
        >删除角色（需快速双击）</el-button
      >
      <el-button @click="handleUpdateCharacter" v-if="editedData" type="primary">完成</el-button>
    </div>
    <span @click="copyPlayerURL" v-if="character && !canCopy">角色卡链接：{{ playerInfoURL }}</span>
    <div class="character-info-edit-form">
      <el-radio-group v-model="editedData.scope" size="large" style="margin-bottom: 10px">
        <el-radio-button label="PC" />
        <el-radio-button label="NPC" />
        <el-radio-button label="monster" />
      </el-radio-group>
      <br />
      <EditCell v-model="editedData.name" prefix="姓名" />
      <EditCell v-model="editedData.titles" prefix="头衔" />
      <EditCell v-model="editedData.sex" prefix="性别" />
      <EditCell v-model="editedData.age" prefix="年龄" />
      <EditCell v-model="editedData.class" prefix="职业" />
      <EditCell v-model="editedData.race" prefix="种族" />
      <EditCell v-model="editedData.subRace" prefix="亚种" />
      <EditCell v-model="editedData.alignment" prefix="阵营" />
      <EditCell v-model="editedData.experience" prefix="经验" />
      <EditCell v-model="editedData.maxHP" prefix="最大血量" />
      <EditCell v-model="editedData.currentHP" prefix="当前血量" />
      <EditCell v-model="editedData.speed" prefix="速度" />
      <div class="ability-and-skills-area">
        <div>
          <EditCell v-model="editedData.strength" prefix="力量" />
          <el-checkbox-group v-model="editedData.proficiencies">
            <el-checkbox v-for="skill in abilityType.力量" :label="skill">
              {{ skill }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <EditCell v-model="editedData.dexterity" prefix="敏捷" />
          <el-checkbox-group v-model="editedData.proficiencies">
            <el-checkbox v-for="skill in abilityType.敏捷" :label="skill">
              {{ skill }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <EditCell v-model="editedData.constitution" prefix="体质" />
          <el-checkbox-group v-model="editedData.proficiencies">
            <el-checkbox v-for="skill in abilityType.体质" :label="skill">
              {{ skill }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <EditCell v-model="editedData.intelligence" prefix="智力" />
          <el-checkbox-group v-model="editedData.proficiencies">
            <el-checkbox v-for="skill in abilityType.智力" :label="skill">{{ skill }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <EditCell v-model="editedData.wisdom" prefix="感知" />
          <el-checkbox-group v-model="editedData.proficiencies">
            <el-checkbox v-for="skill in abilityType.感知" :label="skill">
              {{ skill }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <EditCell v-model="editedData.charisma" prefix="魅力" />
          <el-checkbox-group v-model="editedData.proficiencies">
            <el-checkbox v-for="skill in abilityType.魅力" :label="skill">
              {{ skill }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <el-input
        v-model="editedData.appearance"
        placeholder="角色外貌描述"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
      />
      <el-input
        v-model="editedData.backgroundStory"
        placeholder="角色背景故事"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 8 }"
      />
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
      <BackpackContent v-if="character" :character-info="character" />
    </div>
    <CharacterSpellEditor v-if="character" :character="character" />
  </div>
</template>

<script lang="ts" setup>
import { PropType, reactive, ref } from "vue";
import { createNewCharacterInfoTemplate } from "@/stores/useCharactersStore";
import { useSceneStore } from "@/stores/useSceneStore";
import { updateCharacterInfo, createCharacterInfo, deleteCharacterInfo } from "@/api/socket-tasks";
import EditCell from "./EditCell.vue";
import type { CharacterInfo } from "@trpg/shared";
import { abilityType } from "@/stores/types";
import CharacterSpellEditor from "./CharacterSpellEditor.vue";
import BackpackContent from "@/views/components/BackpackContent.vue";
import { ElMessage } from "element-plus";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo | null>,
  },
});
const emit = defineEmits(["closeDialog"]);

const editedData = reactive(props.character ?? createNewCharacterInfoTemplate());

function handleCreateCharacter() {
  createCharacterInfo(editedData);
  emit("closeDialog");
}

let deleteLock = true;
function handleDeleteCharacter() {
  if (!props.character) return;
  if (deleteLock === true) {
    deleteLock = false;
    setTimeout(() => {
      deleteLock = true;
    }, 1000);
    return;
  }
  deleteCharacterInfo(props.character?.id);
  emit("closeDialog");
}

function handleUpdateCharacter() {
  if (!props.character) return;
  updateCharacterInfo(props.character.id, editedData);
  emit("closeDialog");
}

const { canCopy, playerInfoURL, copyPlayerURL } = initClipboard();

function initClipboard() {
  const canCopy = Boolean(navigator.clipboard);
  const playerInfoURL = `${location.host}/player/${props.character?.id}`;
  async function copyPlayerURL() {
    navigator.clipboard.writeText(playerInfoURL);
    ElMessage.success("已复制");
  }
  return { canCopy, playerInfoURL, copyPlayerURL };
}
</script>

<style lang="less" scoped>
.edit-character-info {
  --background-color: white;
  position: fixed;
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
.el-form-item {
  margin-bottom: 4px;
}

.ability-and-skills-area > div {
  display: flex;
  align-items: center;
}

.backpack-container {
  margin: 10px 0;
}
</style>
