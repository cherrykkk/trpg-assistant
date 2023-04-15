<template>
  <div>{{}}</div>
</template>
<script lang="ts" setup>
import { Character } from "@/stores/useCharactersStore";
import { PropType, ref } from "vue";

const props = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const equipmentsInBackpack = ref([]);
const activeEquipments = ref([]);
</script>
