export interface ClientEvents {
  "login: password": (password: string) => void;
  "operator: rollDice": (characterId: string | "DM", value: number) => void;
  "operator: createCharacterInfo": (value: CharacterInfo) => void;
  "operator: updateCharacterInfo": (characterId: string, value: Partial<CharacterInfo>) => void;
  "operator: updateSceneInfo": (characterId: string, value: Partial<Scene>) => void;
  "operator: updateSpellInfo": (characterId: string, value: Partial<SpellInfo>) => void;
  "operator: deleteCharacterInfo": (characterId: string) => void;
  "operator: changeHP": (characterId: string, value: number) => void;
  "operator: abilityCheck": (characterId: string, ability: string, skill: string) => void;
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
  id: string;
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
  spellsKnown: SpellOnCharacter[];
  spellsPrepared: SpellOnCharacter[];
  appearance: "";
  speed: 30;
  location: { sceneName: string; x: number; y: number };
}

export interface SpellOnCharacter {
  spellId: string;
  reason: string;
}

export interface SpellInfo {
  id: string;
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
  id: string;
  content: string;
}

export interface Scene {
  id: string;
  name: string;
  father?: string;
  description?: string;
  areaX?: number;
  areaY?: number;
  picture?: string;
  children: Scene[];
}
