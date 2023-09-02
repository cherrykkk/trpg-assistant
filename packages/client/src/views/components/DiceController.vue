<template>
  <div v-show="panelType === 'simple'">
    <button @click="() => rollDice(20)">d20</button>
    <button @click="() => rollDice(12)">d12</button>
    <button @click="() => rollDice(10)">d10</button>
    <button @click="() => rollDice(8)">d8</button>
    <button @click="() => rollDice(6)">d6</button>
    <button @click="() => rollDice(4)">d4</button>
    <button @click="panelType = 'complex'">更多操作</button>
  </div>
  <div v-show="panelType === 'complex'" class="complex-dice-controller">
    <div class="dice-to-roll-table">
      <span v-for="(d, i) in diceToRoll" :key="i">{{ i === 0 ? "" : " + " }}1d{{ d }}</span>
    </div>
    <button v-for="d in diceTypeList" :key="d" @click="() => diceToRoll.push(d)">+1d{{ d }}</button>
    <div class="operator-panel">
      <button @click="diceToRoll = []">清除</button>
      <button @click="panelType = 'simple'">收起</button>
      <button @click="diceToRoll.pop()">回退</button>
      <button @click="() => rollDice()">掷骰</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";

const emits = defineEmits<{ (event: "roll-dice", diceType: number | number[]): void }>();

const panelType = ref<"simple" | "complex">("complex");
const diceTypeList = [4, 6, 8, 10, 12, 20];

const diceToRoll = ref<number[]>([]);
function rollDice(diceType?: number) {
  if (diceType) {
    emits("roll-dice", diceType);
  } else {
    if (diceToRoll.value.length === 0) {
      ElMessage(`请选择骰子类型`);
      return;
    }
    emits("roll-dice", diceToRoll.value);
  }
}
</script>

<style lang="less" scoped>
.dice-to-roll-table {
  min-height: 40px;
}
.complex-dice-controller {
  border: 1px solid #ccc;
  border-radius: 2px;
  .operator-panel {
    float: right;
    margin-top: 10px;
  }
}

button {
  line-height: 20px;
}
</style>
