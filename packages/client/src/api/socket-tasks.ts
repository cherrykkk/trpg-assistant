import { useSocketStore } from "@/stores/useSocketStore";
import type {
  CharacterInfo,
  ClientScene,
  ResourceBlob,
  ResourceType,
  SceneInfo,
} from "@trpg/shared";

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

export async function uploadImage(base64: string): Promise<string> {
  const blob = await base64DataUrlToBlob(base64);
  return uploadBlob("image", await blob.arrayBuffer(), blob.type);
}

export async function downloadImage(key: string): Promise<string> {
  const blob = await downloadBlob(key);
  return URL.createObjectURL(blob);
}

async function base64DataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return await res.blob();
}

async function uploadBlob(
  resourceType: ResourceType,
  buffer: ArrayBuffer,
  mimeType: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = useSocketStore().socket;
    socket.emit("request: uploadBlob", resourceType, buffer, mimeType, (blobId: string) => {
      resolve(blobId);
    });
  });
}

function downloadBlob(blobId: string): Promise<Blob> {
  const socket = useSocketStore().socket;
  return new Promise((resolve, reject) => {
    socket.emit("request: downloadBlob", blobId, (rb: ResourceBlob | null) => {
      if (rb) {
        resolve(new Blob([rb.data], { type: rb.mimeType }));
      } else {
        reject(`下载Blob[${blobId}]失败`);
      }
    });
  });
}

export function rollDice(characterId: string, diceType: number | number[]) {
  useSocketStore().socket.emit("operator: rollDice", characterId, diceType);
}
