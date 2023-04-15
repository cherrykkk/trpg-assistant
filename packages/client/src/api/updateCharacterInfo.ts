import { useSocketStore } from "@/stores/useSocketStore";
import { CharacterInfo } from "@trpg/shared";

export function updateCharacterInfo(characterId: String, property: Partial<CharacterInfo>) {
  useSocketStore().socket.emit("operator: updateCharacterInfo", characterId, property);
}

export function createCharacterInfo(data: Partial<CharacterInfo>) {
  useSocketStore().socket.emit("operator: createCharacterInfo", data);
}
