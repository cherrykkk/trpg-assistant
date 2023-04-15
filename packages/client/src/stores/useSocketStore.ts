import { defineStore } from "pinia";
import { Message } from "@/types";
import { Socket } from "socket.io-client";
import { ServerEvents, ClientEvents, SpellInfo } from "@/types";
import { ElMessage } from "element-plus";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    connectedSocket: null as Socket<ServerEvents, ClientEvents> | null,
    messageList: [] as Message[],
    allSpellInfo: [] as SpellInfo[],
  }),
  getters: {
    socket(state) {
      if (state.connectedSocket) {
        return state.connectedSocket;
      } else {
        ElMessage.error("未连接上服务器");
        throw Error("未连接服务器");
      }
    },
  },
});