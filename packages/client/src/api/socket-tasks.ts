import { useSocketStore } from "@/stores/useSocketStore";
import type { CharacterInfo, ClientScene, SceneInfo } from "@trpg/shared";

export function updateCharacterInfo(characterId: string, property: Partial<CharacterInfo>) {
  useSocketStore().socket.emit("operator: updateCharacterInfo", characterId, property);
}

export function updateSceneInfo(id: string, data: SceneInfo | ClientScene) {
  data = { ...data, children: undefined };
  if (!id) {
    createSceneInfo(data);
  } else {
    useSocketStore().socket.emit("operator: updateSceneInfo", id, data);
  }
}
export function createSceneInfo(data: SceneInfo) {
  useSocketStore().socket.emit("operator: createSceneInfo", data);
}

export function updateOtherTypeInfo(name: string, data: unknown) {
  useSocketStore().socket.emit("operator: updateOtherTypes", name, data);
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

export function uploadImage(base64: string): Promise<string> {
  const socket = useSocketStore().socket;
  return new Promise((resolve, reject) => {
    socket.emit("request: uploadImage", base64, (key) => {
      resolve(key);
    });
  });
}

export function downloadImage(key: string): Promise<string> {
  const socket = useSocketStore().socket;
  return new Promise((resolve, reject) => {
    socket.emit("request: downloadImage", key, (data) => {
      resolve(data);
    });
  });
}

export function rollDice(characterId: string, diceType: number | number[]) {
  useSocketStore().socket.emit("operator: rollDice", characterId, diceType);
}
