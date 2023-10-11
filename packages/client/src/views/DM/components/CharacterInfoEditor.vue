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
        <el-radio-button label="monster" />
        <el-radio-button label="template" />
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
        <EditCell v-model="editedData.alignment">
          <TipPopover>
            <template #reference>？阵营</template>
            <TipAlignment />
          </TipPopover>
        </EditCell>
        <EditCell v-model="editedData.experience"
          >经验（等级：{{ levelAndConfig.level }}）</EditCell
        >
        <EditCell v-model="editedData.maxHP" title="最大血量" />
        <EditCell v-model="editedData.currentHP" title="当前血量" />
        <EditCell v-model="editedData.speed" title="速度" />
        <EditCell v-model="editedData.armorClass" title="AC" />
        <EditCell v-model="editedData.spellDifficultyClass" title="法术豁免" />
        <EditCell v-model="editedData.spellcastingAbility">
          <TipPopover>
            <template #reference>？施法关键属性</template>
            <TipSpellcastingAbility />
          </TipPopover>
        </EditCell>
      </div>
      <!-- <SkillsPanel :character-info="editedData" /> -->
      <div class="ability-and-proficiencies-area">
        <div class="ability-info-panel">
          <EditCell v-model="editedData.strength">
            <TipPopover>
              <template #reference>？力量</template>
              <StrengthAbilityVue />
            </TipPopover>
          </EditCell>
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
      <ElTreeSelect
        v-model="editedData.locationSceneId"
        placeholder="所属"
        :data="useSocketStore().clientSceneTree"
        node-key="_id"
        filterable
        :props="{ label: 'name' }"
        check-on-click-node
        @node-click="(scene) => (editedData.locationSceneId = scene._id)"
      />
    </div>
    <div class="backpack-container">
      <EntityStorage
        :init-stored-stack-data="editedData.backpack"
        :database="useSocketStore().allEntityInfo"
        ref="backpackRef"
      />
    </div>
    <SpellSlotsPanel
      v-if="levelAndConfig.spellSlotNum.length"
      :max="levelAndConfig.spellSlotNum"
      v-model="editedData.spellSlotNum"
    />
    <CharacterSpellEditor :character="editedData" />
  </div>
</template>

<script lang="ts" setup>
import { type PropType, onBeforeUnmount, reactive, ref, toRef } from "vue";
import { useSocketStore } from "@/stores/useSocketStore";
import { updateCharacterInfo, createCharacterInfo, deleteCharacterInfo } from "@/api/socket-tasks";
import EditCell from "../../components/EditCell.vue";
import { createNewCharacterInfoTemplate, type CharacterInfo } from "@trpg/shared";
import CharacterSpellEditor from "./CharacterSpellEditor.vue";
import { ElMessage, ElTreeSelect } from "element-plus";
import ProficienciesEditor from "./ProficienciesEditor.vue";
import EntityStorage from "@/views/components/EntityStorage.vue";
import TipPopover from "@/views/components/tip-popovers/TipPopover.vue";
import TipAlignment from "@/views/components/tip-popovers/TipAlignment.vue";
import PassiveChecks from "@/views/components/tip-popovers/PassiveChecks.vue";
import StrengthAbilityVue from "@/views/components/tip-popovers/StrengthAbility.vue";
import SkillsPanel from "@/views/components/SkillsPanel.vue";
import TipSpellcastingAbility from "@/views/components/tip-popovers/TipSpellcastingAbility.vue";
import SpellSlotsPanel from "@/views/components/SpellSlotsPanel.vue";
import { useLevelAndConfig } from "@/stores/hooks";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo | null>,
  },
});
const emit = defineEmits(["closeDialog"]);

const editedData = reactive(props.character ?? createNewCharacterInfoTemplate());

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

const backpackRef = ref<typeof EntityStorage>();
function saveChanges() {
  if (backpackRef.value) {
    editedData.backpack = backpackRef.value.getData();
  }
  if (!props.character || !props.character._id) {
    createCharacterInfo(editedData);
  } else {
    updateCharacterInfo(props.character._id, editedData);
    ElMessage.success("已保存");
  }
}

const { levelAndConfig } = useLevelAndConfig(toRef(editedData));

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
