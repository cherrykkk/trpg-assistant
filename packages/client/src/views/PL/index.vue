<template>
  <DiceController @do-roll-dice="handleRollDice" />
  <MessageRoom />
</template>

<script lang="ts" setup>
import DiceController from "../components/DiceController.vue";
import { createPlayerSocketClient } from "@/api/socket-client";
import MessageRoom from "../components/MessageRoom.vue";

const socket = createPlayerSocketClient("DM");

function handleRollDice(diceType: number) {
  socket.emit("operator: rollDice", -1, diceType);
}
</script>
