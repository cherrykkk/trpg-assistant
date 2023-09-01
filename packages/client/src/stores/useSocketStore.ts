import { defineStore } from "pinia";
import { Socket } from "socket.io-client";
import type {
  ServerEvents,
  ClientEvents,
  SpellInfo,
  Message,
  CharacterInfo,
  Scene,
  CanvasMap,
} from "@trpg/shared";
import { ElMessage } from "element-plus";
import type { ItemInfo } from "@trpg/shared";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    connectedSocket: null as Socket<ServerEvents, ClientEvents> | null,
    playerCharacterInfo: null as CharacterInfo | null,
    messageList: [] as Message[],
    allSpellInfo: [] as SpellInfo[],
    allCanvasMap: [] as CanvasMap[],
    currentMap: null as CanvasMap | null,
    gameInstanceId: "",
    handbook: {
      itemObjects: [{}],
    },
    currentScene: {} as Scene | {},
    allCharacters: [] as CharacterInfo[],

    allOtherType: {
      customAdventuringGears: [],
    } as { customAdventuringGears: ItemInfo[] } & {
      [name in string]: any;
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
