<template>
  <div>
    <button @click="() => rollDice(20)">20面骰子</button>
    <button @click="() => rollDice(12)">12面骰子</button>
    <button @click="() => rollDice(6)">6面骰子</button>
    <button @click="() => rollDice(4)">4面骰子</button>
  </div>
</template>

<script lang="ts" setup>
import { useSocketStore } from "@/stores/useSocketStore";

const emit = defineEmits<{ (event: "doRollDice", diceType: number): void }>();

function rollDice(diceType: number) {
  emit("doRollDice", diceType);
  useSocketStore().socket.emit("operator: rollDice", -1, diceType);
}
</script>
