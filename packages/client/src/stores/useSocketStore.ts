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
  EntityInfo,
  FeatureInfo,
} from "@trpg/shared";
import { ElMessage } from "element-plus";
import { getSceneTreeAndClientScenes } from "@/utils";

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
    allCharacters: [] as CharacterInfo[],
    allEntityInfo: [] as EntityInfo[],
    allFeatureInfo: [] as FeatureInfo[],
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
