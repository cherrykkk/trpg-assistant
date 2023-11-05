import { io, Socket } from "socket.io-client";
import type { ClientEvents, ServerEvents } from "@trpg/shared";
import { useSocketStore } from "@/stores/useSocketStore";
import { getReactiveCollections } from "@/utils/getReactiveCollections";

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

  useSocketStore().collections = getReactiveCollections(
    ["canvas", "character", "entity", "feature", "message", "scene"],
    socket
  );

  socket.on("data: allCanvasMap", (data) => {
    useSocketStore().allCanvasMap = data;
    useSocketStore().canvasMapReady = true;
  });

  return socket;
}
