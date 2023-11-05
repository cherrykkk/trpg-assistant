import { useSocketStore } from "@/stores/useSocketStore";
import type {
  CanvasMap,
  CharacterDoc,
  ClientScene,
  EntityInfo,
  FeatureDoc,
  ResourceBlob,
  ResourceType,
  SceneDoc,
} from "@trpg/shared";
import { ElMessage } from "element-plus";

export function updateCharacterInfo(data: CharacterDoc) {
  useSocketStore().socket.emit("update: character", data);
}

export function updateSceneInfo(data: SceneDoc | ClientScene) {
  data = { ...data, children: undefined };

  useSocketStore().socket.emit("update: scene", data);
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

export function updateCanvasMap(mapData: CanvasMap, cb?: (_id: string) => void) {
  useSocketStore().socket.emit("operator: updateCanvasMap", mapData, cb);
}

export function updateEntityInfo(data: EntityInfo) {
  useSocketStore().socket.emit("update: entity", data);
  ElMessage("已保存");
}

export function updateFeatureInfo(data: FeatureDoc) {
  useSocketStore().socket.emit("update: feature", data);
  ElMessage("已保存");
}
