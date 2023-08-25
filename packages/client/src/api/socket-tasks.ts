import { useSocketStore } from "@/stores/useSocketStore";
import type { CharacterInfo, Scene, SpellInfo } from "@trpg/shared";

export function updateCharacterInfo(characterId: string, property: Partial<CharacterInfo>) {
  useSocketStore().socket.emit("operator: updateCharacterInfo", characterId, property);
}

export function updateSceneInfo(id: string, data: Scene) {
  if (!id) {
    createSceneInfo(data);
  } else {
    useSocketStore().socket.emit("operator: updateSceneInfo", id, data);
  }
}
export function createSceneInfo(data: Scene) {
  useSocketStore().socket.emit("operator: createSceneInfo", data);
}

export function updateSpellInfo(id: string, data: SpellInfo) {
  useSocketStore().socket.emit("operator: updateSpellInfo", id, data);
}

export function createCharacterInfo(data: CharacterInfo) {
  useSocketStore().socket.emit("operator: createCharacterInfo", data);
}

export function deleteCharacterInfo(characterId: string) {
  useSocketStore().socket.emit("operator: deleteCharacterInfo", characterId);
}

export function sendMessage(message: string) {
  useSocketStore().socket.emit("message: sendMessage", message);
}

export function signInAsPlayer(characterId: string) {
  useSocketStore().socket.emit("signIn: signInAsPlayer", characterId);
}
