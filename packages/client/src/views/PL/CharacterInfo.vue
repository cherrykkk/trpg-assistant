<template>
  <div class="character-info-edit-form">
    <el-descriptions>
      <el-descriptions-item label="姓名">{{ characterInfo.name }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ characterInfo.sex }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ characterInfo.age }}</el-descriptions-item>
      <el-descriptions-item label="职业">{{ characterInfo.class }}</el-descriptions-item>
      <el-descriptions-item label="种族">{{ characterInfo.race }}</el-descriptions-item>
      <el-descriptions-item label="亚种">{{ characterInfo.subRace }}</el-descriptions-item>
      <el-descriptions-item label="阵营">{{ characterInfo.alignment }}</el-descriptions-item>
      <el-descriptions-item label="经验">{{ characterInfo.experience }}</el-descriptions-item>
      <el-descriptions-item label="速度">{{ characterInfo.speed }}</el-descriptions-item>
      <el-descriptions-item label="HP"
        >{{ characterInfo.currentHP }}/{{ characterInfo.maxHP }}</el-descriptions-item
      >
      <el-descriptions-item label="力量">{{ characterInfo.strength }}</el-descriptions-item>
      <el-descriptions-item label="敏捷">{{ characterInfo.dexterity }}</el-descriptions-item>
      <el-descriptions-item label="体质">{{ characterInfo.constitution }}</el-descriptions-item>
      <el-descriptions-item label="智力">{{ characterInfo.intelligence }}</el-descriptions-item>
      <el-descriptions-item label="感知">{{ characterInfo.wisdom }}</el-descriptions-item>
      <el-descriptions-item label="魅力">{{ characterInfo.charisma }}</el-descriptions-item>
    </el-descriptions>
    <InfoCell prefix="熟练项">
      <div style="text-align: left">
        <div>
          技能熟练项：{{
            characterInfo.proficiencies
              .filter((p) => p.active && p.type === "skill")
              .map((e) => e.name)
              .join("，") || "无"
          }}
        </div>
        <div>
          武器熟练项：{{
            characterInfo.proficiencies
              .filter((p) => p.active && p.type === "weapon")
              .map((e) => e.name)
              .join("，") || "无"
          }}
        </div>
        <div>
          护甲熟练项：{{
            characterInfo.proficiencies
              .filter((p) => p.active && p.type === "armor")
              .map((e) => e.name)
              .join("，") || "无"
          }}
        </div>
        <div>
          豁免熟练项：{{
            characterInfo.proficiencies
              .filter((p) => p.active && p.type === "save")
              .map((e) => e.name)
              .join("，") || "无"
          }}
        </div>
        <div>
          工具熟练项：{{
            characterInfo.proficiencies
              .filter((p) => p.active && p.type === "tool")
              .map((e) => e.name)
              .join("，") || "无"
          }}
        </div>
      </div>
    </InfoCell>
    <SpellSlotsPanel
      :max="levelAndConfig.spellSlotNum"
      v-model="characterInfo.spellSlotNum"
      :editable="false"
    />
    <InfoCell prefix="法术">
      <SpellItem
        v-for="e in spellAndInfo"
        :spell-info="e"
        @switch-description="switchDescription"
        :show-description="spellToShowDescription === e._id"
      ></SpellItem>
    </InfoCell>
    <InfoCell prefix="外貌描述" :text="characterInfo.appearance"></InfoCell>
    <InfoCell prefix="角色背景">
      <p
        style="text-align: left; margin: 0 0 10px 0"
        v-for="e in `${characterInfo.backgroundStory ?? ''}`.split('\n')"
      >
        {{ e }}
      </p>
    </InfoCell>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, computed, ref, toRef } from "vue";
import InfoCell from "./components/InfoCell.vue";
import type { CharacterDoc } from "@trpg/shared";
import SpellItem from "../components/SpellItem.vue";
import { turnToSpellsInfo } from "@/stores/utils";
import SpellSlotsPanel from "../components/SpellSlotsPanel.vue";
import { useLevelAndConfig } from "@/stores/hooks";

const props = defineProps({
  characterInfo: { type: Object as PropType<CharacterDoc>, required: true },
});

const spellAndInfo = computed(() => {
  console.log(turnToSpellsInfo(props.characterInfo.spells));
  return turnToSpellsInfo(props.characterInfo.spells);
});

const spellToShowDescription = ref<string | null>(null);
function switchDescription(id: string) {
  if (spellToShowDescription.value === id) {
    spellToShowDescription.value = null;
  } else {
    spellToShowDescription.value = id;
  }
}
console.log(props.characterInfo);

const { levelAndConfig } = useLevelAndConfig(toRef(props.characterInfo));
</script>

<style lang="less" scoped>
.character-info-edit-form {
  overflow: auto;
  padding: 5%;
  :deep(.el-descriptions__label) {
    white-space: nowrap;
  }
}
.el-form-item {
  margin-bottom: 4px;
}

.ability-and-skills-area > div {
  display: flex;
  align-items: center;
}
</style>
