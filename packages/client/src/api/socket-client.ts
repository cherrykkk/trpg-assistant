import { io, Socket } from "socket.io-client";
import { ClientEvents, ServerEvents } from "@trpg/shared";
import { useSocketStore } from "@/stores/useSocketStore";
import { useSceneStore } from "@/stores/useSceneStore";
import { useCharactersStore } from "@/stores/useCharactersStore";

export function createSocketAndInitAbility(role: "DM" | "player", password: string) {
  const socket: Socket<ServerEvents, ClientEvents> = io(`${location.hostname}:3333`);

  socket.on("connect", () => {
    if (role === "DM") {
      socket.emit("signIn: signInAsDM", password);
      useSocketStore().connectedSocket = socket;
    } else {
      socket.emit("signIn: signInAsPlayer", password);
      socket.on("data: playerCharacter", (characterInfo) => {
        useSocketStore().playerCharacterInfo = characterInfo;
      });
    }
  });
  socket.on("disconnect", () => {
    useSocketStore().connectedSocket = null;
  });

  socket.on("data: allCharactersInfo", (data) => {
    useCharactersStore().characters = data;
  });

  socket.on("data: allSpellInfo", (data) => {
    useSocketStore().allSpellInfo = data;
  });

  socket.on("data: allScenes", (data) => {
    useSceneStore().scenes = data;
    useSceneStore().refresh();
  });

  socket.on("data: allMessage", (data) => {
    useSocketStore().messageList = data;
  });

  return socket;
}
