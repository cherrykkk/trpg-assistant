import { useSocketStore } from "@/stores/useSocketStore";
import { CharacterInfo } from "@trpg/shared";
import type { ObjectId } from 'mongodb'

export function updateCharacterInfo(characterId: String, property: Partial<CharacterInfo>) {
  useSocketStore().socket.emit("operator: updateCharacterInfo", characterId, property);
}

export function createCharacterInfo(data: Partial<CharacterInfo>) {
  useSocketStore().socket.emit("operator: createCharacterInfo", data);
}

export function deleteChcaracterInfo(characterId: ObjectId) {
  useSocketStore().socket.emit("operator: deleteCharacterInfo", characterId)
}