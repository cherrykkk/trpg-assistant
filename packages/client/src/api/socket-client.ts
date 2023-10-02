import { io, Socket } from "socket.io-client";
import type { ClientEvents, ServerEvents } from "@trpg/shared";
import { useSocketStore } from "@/stores/useSocketStore";
import { ElMessage } from "element-plus";
import { getSceneTreeAndClientScenes } from "@/utils";

export function createSocketAndInitAbility(role: "DM" | "player", password: string) {
  const socket: Socket<ServerEvents, ClientEvents> = io(`${location.hostname}:3333`);

  socket.on("connect", () => {
    if (role === "DM") {
      socket.emit("signIn: signInAsDM", password);
    } else {
      socket.emit("signIn: signInAsPlayer", password);
      socket.on("data: playerCharacter", (characterInfo) => {
        useSocketStore().playerCharacterInfo = characterInfo;
      });
      socket.on("data: playerCanvasMapData", (data) => {
        useSocketStore().currentMap = data;
      });
    }
    useSocketStore().connectedSocket = socket;
  });
  socket.on("disconnect", () => {
    useSocketStore().connectedSocket = null;
  });

  socket.on("data: allCharactersInfo", (data) => {
    useSocketStore().allCharacters = data;
    localStorage.setItem("data: allCharactersInfo", JSON.stringify(data));
  });

  socket.on("data: allScenes", (data) => {
    const { topSceneTreeList, clientScenes } = getSceneTreeAndClientScenes(data);
    useSocketStore().clientSceneTree = topSceneTreeList;
    useSocketStore().allClientScenes = clientScenes;
    try {
      localStorage.setItem("data: allScenes", JSON.stringify(data));
    } catch (err) {
      ElMessage("写入缓存失败：" + err);
    }
  });

  socket.on("data: allMessage", (data) => {
    useSocketStore().messageList = data;
  });

  socket.on("data: allCanvasMap", (data) => {
    useSocketStore().allCanvasMap = data;
    useSocketStore().canvasMapReady = true;
  });

  socket.on("data: allOtherTypes", (data) => {
    data.forEach((e) => (useSocketStore().allOtherType[e.name] = e.data));
  });

  return socket;
}
