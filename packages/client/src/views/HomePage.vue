<template>
  <div class="home-page">
    <div v-if="localAccounts.length === 0">暂无账号，请先通过某种方法访问特定地址</div>
    <div v-for="account in localAccounts" class="account-item" @click="handleClickAccount(account)">
      <b>
        {{ account.role }}
      </b>
      {{ account.name }}
      <span>上次登录: {{ new Date(account.lastTime).toLocaleString() }}</span>
      <!-- TODO: remove item button-->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { localAccounts, type Account } from "@/stores/accounts";
import { useRouter } from "vue-router";

const router = useRouter();

function handleClickAccount(a: Account) {
  if (a.role === "master") {
    router.push({ path: `/DM/${a.id}/sceneControl` });
  } else if (a.role === "player") {
    router.push({ path: `/player/${a.id}` });
  }
}
</script>
<style lang="less" scoped>
.home-page {
  margin-top: 40px;
}
.account-item {
  border: 1px solid #333;
  padding: 10px;
  margin: 10px;
  &:hover {
    cursor: pointer;
    background-color: rgb(168, 220, 168);
  }
}
</style>
