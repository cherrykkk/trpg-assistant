<template>
  <CharacterInfo v-if="characterInfo" :character-info="characterInfo" />
  <MessageRoom v-if="showMessageRoom" />
</template>

<script lang="ts" setup>
import { createSocketAndInitAbility } from "@/api/socket-client";
import MessageRoom from "../components/MessageRoom.vue";
import { useRoute } from "vue-router";
import CharacterInfo from "./CharacterInfo.vue";
import { storeToRefs } from "pinia";
import { useSocketStore } from "../../stores/useSocketStore";
import { ref } from "vue";

const showMessageRoom = ref(false);

const route = useRoute();
const characterId = route.params.id as string;
const { playerCharacterInfo: characterInfo } = storeToRefs(useSocketStore());
const socket = createSocketAndInitAbility(characterId);
</script>
