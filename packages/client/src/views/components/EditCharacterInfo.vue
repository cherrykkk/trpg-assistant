<template>
  <div class="character-info-edit-form">
    <ElRadioGroup v-model="editedData.scope" size="large" style="margin-bottom: 10px">
      <ElRadioButton label="PC" />
      <ElRadioButton label="NPC" />
      <ElRadioButton label="monster" />
      <ElRadioButton label="template" />
    </ElRadioGroup>
    <br />
    <div class="base-info-list">
      <StringInput v-model="editedData.name" title="姓名" />
      <StringInput v-model="editedData.titles" title="头衔" />
      <StringInput v-model="editedData.sex" title="性别" />
      <NumberInput v-model="editedData.age" title="年龄" />
      <StringInput v-model="editedData.class" title="职业" />
      <StringInput v-model="editedData.race" title="种族" />
      <StringInput v-model="editedData.subRace" title="亚种" />
      <StringInput v-model="editedData.language" title="语言" />
      <StringInput v-model="editedData.alignment">
        <TipPopover>
          <template #reference>？阵营</template>
          <TipAlignment />
        </TipPopover>
      </StringInput>
      <NumberInput v-model="editedData.experience"
        >经验（等级：{{ levelAndConfig.level }}）</NumberInput
      >
      <NumberInput v-model="editedData.maxHP" title="最大血量" />
      <NumberInput v-model="editedData.currentHP" title="当前血量" />
      <StringInput v-model="editedData.hitPointRule" title="血量规则" />
      <NumberInput v-model="editedData.speed" title="速度" />
      <StringInput v-model="editedData.armorClass" title="AC" />
      <StringInput v-model="editedData.spellDifficultyClass" title="法术豁免" />
      <StringInput v-model="editedData.spellcastingAbility">
        <TipPopover>
          <template #reference>？施法关键属性</template>
          <TipSpellcastingAbility />
        </TipPopover>
      </StringInput>
    </div>
    <SkillsPanel :character-info="editedData" />
    <div class="ability-and-proficiencies-area">
      <div class="ability-info-panel">
        <NumberInput v-model="editedData.strength">
          <TipPopover>
            <template #reference>？力量</template>
            <StrengthAbilityVue />
          </TipPopover>
        </NumberInput>
        <NumberInput v-model="editedData.dexterity" title="敏捷" />
        <NumberInput v-model="editedData.constitution" title="体质" />
        <NumberInput v-model="editedData.intelligence" title="智力" />
        <NumberInput v-model="editedData.wisdom" title="感知" />
        <NumberInput v-model="editedData.charisma" title="魅力" />
        <TipPopover>
          <template #reference>tip: 被动检定</template>
          <PassiveChecks />
        </TipPopover>
      </div>
    </div>
    <NumberInput v-model="editedData.proficiencyNames" title="熟练项" />
    <TextareaInput v-model="editedData.appearance" title="角色外貌描述" />
    <TextareaInput v-model="editedData.backgroundStory" title="角色背景故事" />
    <ElTreeSelect
      v-model="editedData.locationSceneId"
      placeholder="所属"
      :data="accessibleScenes"
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
      :database="entitiesDatabase"
      @change="(data) => (editedData.backpack = data)"
    />
  </div>
  <FeaturesBox
    :equipped="character.equippedFeatures ?? []"
    :collection="featuresCollection"
    @change="handleFeatureChange"
  />
  <SpellSlotsPanel
    v-if="levelAndConfig.spellSlotNum.length"
    :max="levelAndConfig.spellSlotNum"
    v-model="editedData.spellSlotNum"
  />
  <CharacterSpellEditor :character="editedData" />
</template>

<script lang="ts" setup>
import { type PropType, reactive, toRef, provide } from "vue";
import TextareaInput from "./editor/TextareaEditor.vue";
import StringInput from "./editor/StringInput.vue";
import NumberInput from "./editor/NumberInput.vue";
import type {
  CharacterDoc,
  ClientScene,
  EntityInfo,
  EquippedFeature,
  FeatureDoc,
} from "@trpg/shared";
import CharacterSpellEditor from "../DM/components/CharacterSpellEditor.vue";
import { ElRadioButton, ElTreeSelect } from "element-plus";
import EntityStorage from "@/views/components/EntityStorage.vue";
import TipPopover from "@/views/components/tip-popovers/TipPopover.vue";
import TipAlignment from "@/views/components/tip-popovers/TipAlignment.vue";
import PassiveChecks from "@/views/components/tip-popovers/PassiveChecks.vue";
import StrengthAbilityVue from "@/views/components/tip-popovers/StrengthAbility.vue";
import SkillsPanel from "@/views/components/SkillsPanel.vue";
import TipSpellcastingAbility from "@/views/components/tip-popovers/TipSpellcastingAbility.vue";
import SpellSlotsPanel from "@/views/components/SpellSlotsPanel.vue";
import { useLevelAndConfig } from "@/stores/hooks";
import { ElRadioGroup } from "element-plus";
import FeaturesBox from "./FeaturesBox.vue";

const props = defineProps({
  character: {
    type: Object as PropType<CharacterDoc>,
    required: true,
  },
  accessibleScenes: {
    type: Array as PropType<ClientScene[]>,
    default() {
      return [];
    },
  },
  entitiesDatabase: {
    type: Array as PropType<EntityInfo[]>,
    default() {
      return [];
    },
  },
  featuresCollection: {
    type: Array as PropType<FeatureDoc[]>,
    default() {
      return [];
    },
  },
});

const emit = defineEmits<{ (event: "change", data: CharacterDoc): void }>();

provide("edit-cell-on-blur", () => {
  emit("change", editedData);
});

defineExpose({
  getEditData: () => {
    return editedData;
  },
});

const editedData = reactive(props.character);

const { levelAndConfig } = useLevelAndConfig(toRef(editedData));

function handleFeatureChange(data: EquippedFeature[]) {
  editedData.equippedFeatures = data;
  emit("change", editedData);
}
</script>

<style lang="less" scoped>
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
