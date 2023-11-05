import { defineStore } from "pinia";
import { Socket } from "socket.io-client";
import type {
  ServerEvents,
  ClientEvents,
  Message,
  CharacterDoc,
  CanvasMap,
  ClientScene,
} from "@trpg/shared";
import { ElMessage } from "element-plus";
import { getSceneTreeAndClientScenes } from "@/utils";
import { getReactiveCollections } from "@/utils/getReactiveCollections";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    connectedSocket: null as Socket<ServerEvents, ClientEvents> | null,
    playerCharacterInfo: null as CharacterDoc | null,
    allCanvasMap: [] as CanvasMap[],
    canvasMapReady: false,
    currentMap: null as CanvasMap | null,
    gameInstanceId: "",
    currentScene: null as ClientScene | null,
    editTarget: null as null | "path" | "story",
    collections: {} as ReturnType<typeof getReactiveCollections>,
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
    flatClientScenes(state) {
      return getSceneTreeAndClientScenes(state.collections.scene).clientScenes;
    },
    clientSceneTree(state) {
      return getSceneTreeAndClientScenes(state.collections.scene).topSceneTreeList;
    },
  },
});
