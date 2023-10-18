import { defineStore } from "pinia";
import { Socket } from "socket.io-client";
import type {
  ServerEvents,
  ClientEvents,
  Message,
  CharacterInfo,
  SceneInfo,
  CanvasMap,
  ClientScene,
} from "@trpg/shared";
import { ElMessage } from "element-plus";
import { getSceneTreeAndClientScenes } from "@/utils";
import { getReactiveCollections } from "@/utils/getReactiveCollections";

const localStorageAllScenes = JSON.parse(
  localStorage.getItem("data: allScenes") ?? "[]"
) as SceneInfo[];

const { topSceneTreeList, clientScenes } = getSceneTreeAndClientScenes(localStorageAllScenes);

export const useSocketStore = defineStore("socket", {
  state: () => ({
    connectedSocket: null as Socket<ServerEvents, ClientEvents> | null,
    playerCharacterInfo: null as CharacterInfo | null,
    messageList: [] as Message[],
    allCanvasMap: [] as CanvasMap[],
    canvasMapReady: false,
    allClientScenes: clientScenes,
    currentMap: null as CanvasMap | null,
    gameInstanceId: "",
    handbook: {
      itemObjects: [{}],
    },
    currentScene: null as ClientScene | null,
    clientSceneTree: topSceneTreeList,
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
  },
});
