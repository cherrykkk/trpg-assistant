import { defineStore } from "pinia";
import { Socket } from "socket.io-client";
import type {
  ServerEvents,
  ClientEvents,
  SpellInfo,
  Message,
  CharacterInfo,
  GameInstance,
} from "@trpg/shared";
import { ElMessage } from "element-plus";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    connectedSocket: null as Socket<ServerEvents, ClientEvents> | null,
    playerCharacterInfo: null as CharacterInfo | null,
    messageList: [] as Message[],
    allSpellInfo: [] as SpellInfo[],
    gameInstanceId: "",
    handbook: {
      itemObjects: [{}],
    },
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
