import { ObjectId } from "mongodb";

export interface ClientEvents {
  "login: password": (password: string) => void;
  "operator: rollDice": (characterId: ObjectId | "DM", value: number) => void;
  "operator: createCharacterInfo": (value: Partial<CharacterInfo>) => void;
  "operator: updateCharacterInfo": (characterId: ObjectId, value: Partial<CharacterInfo>) => void;
  "operator: deleteCharacterInfo": (characterId: ObjectId) => void;
  "operator: changeHP": (characterId: ObjectId, value: number) => void;
  "operator: abilityCheck": (characterId: ObjectId, ability: string, skill: string) => void;
}
export interface ServerEvents {
  "data: allCharactersInfo": (data: CharacterInfo[]) => void;
  "data: allSpellInfo": (data: SpellInfo[]) => void;
  "data: allMessage": (data: Message[]) => void;
  "data: allScenes": (data: Scene[]) => void;
  "message: system": (message: string) => void;
  "message: player": (message: string) => void;
  "message: DM": (message: string) => void;
}

export interface CharacterInfo {
  _id: ObjectId;
  scope: "monster" | "NPC" | "PC";
  name: string;
  titles: string; //头衔
  alignment: "";
  sex: string;
  age: number;
  class: string; //职业
  race: string;
  subRace: string; //亚种
  currentHP: number;
  maxHP: number;
  backgroundStory: string;
  技能熟练项: string[];
  experience: 0;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charism: number;
  equipment: string[];
  spells: string[];
  appearance: "";
  speed: 30;
  location: { sceneName: string; x: number; y: number };
}

export interface SpellInfo {
  _id: ObjectId;
  等级: number;
  法术名称: string;
  派系: string;
  施法时间: string;
  施法距离: string;
  法术成分: string;
  持续时间: string;
  专注: boolean;
  豁免: boolean;
  仪式: boolean;
  施法材料: string;
  法术说明: string;
  法术升阶: string;
  诗人: "";
  牧师: "";
  德鲁伊: "";
  圣武士: "";
  游侠: "";
  术士: "术士";
  邪术士: "";
  法师: "法师";
}

export interface Message {
  _id: ObjectId;
  content: string;
}

export interface Scene {
  _id: ObjectId;
  name: string;
  father?: string;
  description?: string;
  areaX?: number;
  areaY?: number;
  picture?: string;
  children: Scene[];
}
