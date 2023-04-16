<template>
  <div class="character-info-edit-form">
    <el-radio-group v-model="characterInfo.scope" size="large" style="margin-bottom: 10px">
      <el-radio-button label="PC" />
      <el-radio-button label="NPC" />
      <el-radio-button label="monster" />
    </el-radio-group>
    <br />
    <EditCell v-model="characterInfo.name" prefix="姓名" />
    <EditCell v-model="characterInfo.titles" prefix="头衔" />
    <EditCell v-model="characterInfo.sex" prefix="性别" />
    <EditCell v-model="characterInfo.age" prefix="年龄" />
    <EditCell v-model="characterInfo.class" prefix="职业" />
    <EditCell v-model="characterInfo.race" prefix="种族" />
    <EditCell v-model="characterInfo.subRace" prefix="亚种" />
    <EditCell v-model="characterInfo.alignment" prefix="阵营" />
    <EditCell v-model="characterInfo.experience" prefix="经验" />
    <EditCell v-model="characterInfo.maxHP" prefix="最大血量" />
    <EditCell v-model="characterInfo.currentHP" prefix="当前血量" />
    <EditCell v-model="characterInfo.speed" prefix="速度" />
    <div class="ability-and-skills-area">
      <div>
        <EditCell v-model="characterInfo.strength" prefix="力量" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.力量" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <EditCell v-model="characterInfo.dexterity" prefix="敏捷" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.敏捷" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <EditCell v-model="characterInfo.constitution" prefix="体质" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.体质" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <EditCell v-model="characterInfo.intelligence" prefix="智力" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.智力" :label="skill">{{ skill }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <EditCell v-model="characterInfo.wisdom" prefix="感知" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.感知" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <EditCell v-model="characterInfo.charism" prefix="魅力" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.魅力" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <el-input
      v-model="characterInfo.appearance"
      placeholder="角色外貌描述"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
    />
    <el-input
      v-model="characterInfo.backgroundStory"
      placeholder="角色背景故事"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 8 }"
    />
    <el-input v-model="characterInfo.location.sceneName">
      <template #prepend>所处地点</template>
      <template #append>
        <el-select
          v-model="characterInfo.location.sceneName"
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
  <EditCell prefix="装备" />
  <SpellsOfCharacter v-if="character" :character="character" />
  <div>
    <el-button @click="handleCreateCharacter" v-if="!character">确认创建新角色</el-button>
    <el-button @click="handleDeleteCharacter" v-if="character">删除角色（需快速双击）</el-button>
    <el-button @click="handleUpdateCharacter" v-if="character">确认修改角色</el-button>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, reactive, ref } from "vue";
import { createNewCharacterInfoTemplate } from "@/stores/useCharactersStore";
import { useSceneStore } from "@/stores/useSceneStore";
import { updateCharacterInfo, createCharacterInfo, deleteChcaracterInfo } from "@/api/updateCharacterInfo";
import EditCell from "./EditCell.vue";
import { CharacterInfo } from "@trpg/shared";
import { ElMessage } from "element-plus";
import { abilityType } from "@/stores/types";
import SpellsOfCharacter from "./SpellsOfCharacter.vue";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterInfo | null>,
  },
});
const emit = defineEmits(["closeDialog"]);

const characterInfo = reactive<CharacterInfo>(props.character ?? createNewCharacterInfoTemplate());

const otherProperty = reactive({
  技能熟练项: [] as string[],
});
function changeSkill(skills: string[]) {
  otherProperty.技能熟练项 = skills;
}

const uploadData = computed(() => {
  return Object.assign(characterInfo, otherProperty);
});

function handleCreateCharacter() {
  createCharacterInfo(characterInfo);
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
  deleteChcaracterInfo(props.character?._id)
  emit("closeDialog");
}

function handleUpdateCharacter() {
  if (!props.character) return;
  updateCharacterInfo(props.character._id, uploadData.value);
  emit("closeDialog");
}
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 4px;
}
.ability-and-skills-area > div {
  display: flex;
  align-items: center;
}
</style>
