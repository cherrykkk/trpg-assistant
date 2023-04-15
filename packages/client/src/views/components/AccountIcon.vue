<template>
  <div class="account-icon" @click="() => (accountList = true)">
    <div v-if="accountList"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const accountList = ref(false);
</script>

<style lang="less" scoped>
.account-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #aaa;
  margin: 10px;
}
</style>
