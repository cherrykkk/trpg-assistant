<template>
  <p><b>法术豁免 DC</b> = 8 + 你的熟练加值 + 施法关键属性调整值</p>
  <p><b>法术攻击调整值</b> = 你的熟练加值 + 施法关键属性调整值</p>
  <div v-for="e in SPELLCASTING_ABILITY">{{ e[0] }}： {{ e[1] }}</div>
</template>
<script lang="ts" setup>
const SPELLCASTING_ABILITY = [
  ["吟游诗人", "魅力"],
  ["牧师", "感知"],
  ["德鲁伊", "感知"],
  ["战士（奥法骑士）", "智力"],
  ["圣武士", "魅力"],
  ["游侠", "感知"],
  ["游荡者", "智力"],
  ["术士", "魅力"],
  ["邪术师", "魅力"],
  ["法师", "智力"],
];
</script>
