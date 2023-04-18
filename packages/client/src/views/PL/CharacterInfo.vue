<template>
  <div class="character-info-edit-form">
    <el-descriptions>
      <el-description-item>
        <InfoCell :value="characterInfo.name" prefix="姓名" />
        <InfoCell :value="characterInfo.titles" prefix="头衔" />
        <InfoCell :value="characterInfo.sex" prefix="性别" />
        <InfoCell :value="characterInfo.age" prefix="年龄" />
        <InfoCell :value="characterInfo.class" prefix="职业" />
        <InfoCell :value="characterInfo.race" prefix="种族" />
        <InfoCell :value="characterInfo.subRace" prefix="亚种" />
        <InfoCell :value="characterInfo.alignment" prefix="阵营" />
        <InfoCell :value="characterInfo.experience" prefix="经验" />
        <InfoCell :value="characterInfo.maxHP" prefix="最大血量" />
        <InfoCell :value="characterInfo.currentHP" prefix="当前血量" />
      </el-description-item>
    </el-descriptions>

    <div class="ability-and-skills-area">
      <div>
        <InfoCell v-model="characterInfo.strength" prefix="力量" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.力量" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <InfoCell v-model="characterInfo.dexterity" prefix="敏捷" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.敏捷" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <InfoCell v-model="characterInfo.constitution" prefix="体质" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.体质" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <InfoCell v-model="characterInfo.intelligence" prefix="智力" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.智力" :label="skill">{{ skill }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <InfoCell v-model="characterInfo.wisdom" prefix="感知" />
        <el-checkbox-group v-model="characterInfo.技能熟练项">
          <el-checkbox v-for="skill in abilityType.感知" :label="skill">
            {{ skill }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <InfoCell v-model="characterInfo.charisma" prefix="魅力" />
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
  <InfoCell v-model="characterInfo.speed" prefix="速度" />
  <InfoCell prefix="技能熟练项" />
  <InfoCell prefix="装备" />
  <InfoCell prefix="法术" />
</template>

<script lang="ts" setup>
import { computed, PropType, reactive, ref } from "vue";
import { createNewCharacterInfoTemplate } from "@/stores/useCharactersStore";
import { useSceneStore } from "@/stores/useSceneStore";
import { updateCharacterInfo, createCharacterInfo } from "@/api/socket-tasks";
import InfoCell from "./components/InfoCell.vue";
import { CharacterInfo } from "@trpg/shared";
import { ElMessage } from "element-plus";
import { abilityType } from "@/stores/types";

defineProps({
  characterInfo: { type: Object as PropType<CharacterInfo>, required: true },
});
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
