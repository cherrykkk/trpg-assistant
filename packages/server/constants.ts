import type { CharacterInfo, Message, Scene } from "@trpg/shared";
import { ObjectId } from "mongodb";

export interface ClientEvents {
  "login: password": (password: string) => void;
  "operator: rollDice": (characterId: ObjectId | "DM", value: number) => void;
  "operator: createCharacterInfo": (value: Partial<CharacterInfo>) => void;
  "operator: updateCharacterInfo": (characterId: ObjectId, value: Partial<CharacterInfo>) => void;
  "operator: changeHP": (characterId: ObjectId, value: number) => void;
  "operator: abilityCheck": (characterId: ObjectId, ability: string, skill: string) => void;
}
export interface ServerEvents {
  "data: allCharactersInfo": (data: CharacterInfo[]) => void;
  "data: allMessage": (data: Message[]) => void;
  "data: allScenes": (data: Scene[]) => void;
  "message: system": (message: string) => void;
  "message: player": (message: string) => void;
  "message: DM": (message: string) => void;
}

