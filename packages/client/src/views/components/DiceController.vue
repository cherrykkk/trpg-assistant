<template>
  <div>
    <button @click="() => rollDice(20)">d20</button>
    <button @click="() => rollDice(12)">d12</button>
    <button @click="() => rollDice(10)">d10</button>
    <button @click="() => rollDice(8)">d8</button>
    <button @click="() => rollDice(6)">d6</button>
    <button @click="() => rollDice(4)">d4</button>
  </div>
</template>

<script lang="ts" setup>
import { useSocketStore } from "@/stores/useSocketStore";

const props = defineProps({
  characterId: {
    type: String,
  },
});

function rollDice(diceType: number) {
  useSocketStore().socket.emit("operator: rollDice", props.characterId || "DM", diceType);
}
</script>
