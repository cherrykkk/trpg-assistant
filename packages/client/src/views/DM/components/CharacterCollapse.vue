<template>
  <el-collapse v-model="chosenCharacter" accordion>
    <el-collapse-item v-for="character in characters" :key="character._id" class="character-item">
      <template #title>
        <div class="collapse-title">
          <span>{{ character.name }}</span>
          <span>{{ character.sex }}</span>
          <span>{{ character.race }}</span>
          <span>{{ character.class }}</span>
          <span>{{ character.alignment }}</span>
        </div>
        <span class="character-location">{{ character.location.sceneName }}</span>
      </template>
      <div v-if="character.titles">
        <el-tag size="small" v-for="e in character.titles.split(' ')">{{ e }}</el-tag>
      </div>
      <div>{{ character.backgroundStory }}</div>
      <el-button @click="emit('editStory', character)" size="small">编辑信息</el-button>
      <el-button
        @click="useCharactersStore().createCharacter(character)"
        v-if="character.scope === 'monster'"
        size="small"
      >
        复制角色
      </el-button>
      <el-divider />
      <div>
        <span v-for="item in character.equipment">{{ item }}</span>
      </div>
      <el-divider />
      <div>
        <span v-for="item in character.spells">{{ item }}</span>
        <el-button @click="emit('editSpell', character)" size="small">详细</el-button>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { PropType } from "vue";
import { useCharactersStore } from "@/stores/useCharactersStore";
import { CharacterInfo } from "@/types";

const chosenCharacter = ref();
const props = defineProps({
  characters: { type: Array as PropType<CharacterInfo[]>, required: true },
});
const emit = defineEmits<{
  (event: "editStory", character: CharacterInfo): void;
  (event: "editSpell", character: CharacterInfo): void;
  (event: "editAbility", character: CharacterInfo): void;
}>();
</script>

<style lang="less" scoped>
.character-item {
  span {
    margin: 10px;
  }
  .collapse-title {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
  }
  .character-location {
    position: absolute;
    right: 20px;
  }
  .el-divider {
    margin: 4px;
  }
}
</style>
