<template>
  <div class="DM-layout">
    <div class="tab-pages-container">
      <el-menu mode="horizontal" :default-active="routeName" @select="handleSelect">
        <AccountIcon />
        <el-menu-item index="characterControl">角色编辑</el-menu-item>
        <el-menu-item index="sceneControl">场景演绎</el-menu-item>
      </el-menu>
      <div class="router-page"><router-view /></div>
    </div>
    <ResizablePanel resize-direction="left" :default-width="200">
      <MessageRoom />
    </ResizablePanel>
  </div>
</template>
<script lang="ts" setup>
import { createSocketAndInitAbility } from "@/api/socket-client";
import { useRoute, useRouter } from "vue-router";
import MessageRoom from "../components/MessageRoom.vue";
import AccountIcon from "../components/AccountIcon.vue";
import { ref } from "vue";
import ResizablePanel from "../components/ResizablePanel.vue";
const router = useRouter();
const route = useRoute();

function getGameInstanceId() {
  const idFromRoute = route.params.id as string;
  if (idFromRoute) {
    return idFromRoute;
  } else {
    const gameInstanceId = localStorage.getItem("gameInstanceId") || "";
    return gameInstanceId;
  }
}
const gameInstanceId = getGameInstanceId();
console.log("gameInstanceId", gameInstanceId);
if (!gameInstanceId) {
  router.push({ name: "notFound" });
}

const socket = createSocketAndInitAbility("DM", gameInstanceId);
const routeName = ref((route.name as string) ?? "");
if (!["characterControl", "sceneControl"].includes(routeName.value)) {
  routeName.value = "characterControl";
  router.push({ name: "characterControl" });
}

function handleSelect(name: string) {
  router.push({ name });
}
</script>
<style lang="less" scoped>
.DM-layout {
  display: flex;
  position: relative;
  height: 100%;
  overflow: hidden;
  .tab-pages-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .router-page {
    height: 100%;
    overflow: hidden;
  }

  .el-menu {
    align-items: center;
  }
}
</style>
