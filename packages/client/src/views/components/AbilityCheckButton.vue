<template>
  <span style="font-size: 12px">被动 {{ passiveCheckValue }}</span>
  <el-button style="margin: 10px; width: 200px">开始检定</el-button>
  <div>
    <el-radio-group v-model="checkType.ability" style="margin-bottom: 4px">
      <el-radio-button v-for="(e, i) in checkTypeList" :label="e.ability" />
    </el-radio-group>
    <br />
    <el-radio-group v-model="checkType.skill" size="small" style="margin-bottom: 4px">
      <el-radio-button v-for="(e, i) in skillsList" :label="e" />
    </el-radio-group>
  </div>
</template>
<script lang="ts" setup>
import { computed, PropType, reactive, ref, watch, watchEffect } from "vue";
import { CharacterInfo } from "@trpg/shared";

const props = defineProps({
  characterInfo: {
    type: Object as PropType<CharacterInfo>,
    required: true,
  },
});

const checkType = reactive({
  ability: "力量",
  skill: "运动",
});

const passiveCheckValue = computed(() => {
  return props.characterInfo[checkType.ability];
});

const skillsList = ref<string[]>([]);

const checkTypeList = [
  {
    ability: "力量",
    skills: ["运动"],
  },
  {
    ability: "敏捷",
    skills: ["体操", "巧手", "隐匿"],
  },
  {
    ability: "智力",
    skills: ["奥秘", "历史", "调查", "自然", "宗教"],
  },
  {
    ability: "感知",
    skills: ["驯兽", "洞悉", "医药", "察觉", "求生"],
  },
  {
    ability: "魅力",
    skills: ["欺瞒", "威吓", "表演", "游说"],
  },
];

watch(
  () => checkType.ability,
  () => {
    const abilityGroup = checkTypeList.find((e) => e.ability === checkType.ability);
    if (!abilityGroup) throw Error();

    skillsList.value = [abilityGroup.ability, ...abilityGroup.skills];
    checkType.skill = abilityGroup.ability;
  },
  { immediate: true }
);
</script>
