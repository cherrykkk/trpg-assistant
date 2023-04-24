export interface ClientEvents {
  "signIn: signInAsPlayer": (characterId: string) => void;
  "signIn: signInAsDM": (gameId: string) => void;
  "operator: rollDice": (characterId: string | "DM", value: number) => void;
  // create
  "operator: createCharacterInfo": (value: CharacterInfo) => void;
  "operator: createSceneInfo": (value: Scene) => void;
  // update
  "operator: updateCharacterInfo": (characterId: string, value: Partial<CharacterInfo>) => void;
  "operator: updateSceneInfo": (characterId: string, value: Partial<Scene>) => void;
  "operator: updateSpellInfo": (characterId: string, value: Partial<SpellInfo>) => void;
  // delete
  "operator: deleteCharacterInfo": (characterId: string) => void;
  "operator: deleteSceneInfo": (characterId: string) => void;
  // actions with system message
  "message: sendMessage": (message: string) => void;
  "operator: abilityCheck": (characterId: string, ability: string, skill: string) => void;
}

export interface ServerEvents {
  "data: playerCharacter": (data: CharacterInfo) => void;
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
  gameInstanceId: string;
  scope: "monster" | "NPC" | "PC";
  name: string;
  titles: string; //头衔
  alignment: string;
  sex: string;
  age: number;
  class: string; //职业
  race: string;
  subRace: string; //亚种
  currentHP: number;
  maxHP: number;
  backgroundStory: string;
  proficiencies: string[];
  experience: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  equipment: string[];
  spellsKnown: SpellOnCharacter[];
  spellsPrepared: SpellOnCharacter[];
  appearance: string;
  speed: number;
  location: { sceneName: string; x: number; y: number };
  currentInitiative: number;
  backpack: ItemInBackpack[];
}

export interface ItemInBackpack {
  id: number;
  name: string;
  description: string;
  ounce: number;
  pound: number;
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
  gameInstanceId: string;
  content: string;
}

export interface Scene {
  id: string;
  gameInstanceId: string;
  name: string;
  father?: string;
  description?: string;
  areaX?: number;
  areaY?: number;
  picture?: string;
  items: SceneItem[];
  children: Scene[];
}

export interface SceneItem {
  id: number;
  name: string;
  description: string;
  points: { x: number; y: number }[];
  showForPlayer: boolean;
  backgroundColor: string;
}

export interface GameInstance {
  id: string;
  name: string;
  description: string;
}

// export const AbilityType = {
//   力量: ["运动"],
//   敏捷: ["体操", "巧手", "隐匿"],
//   体质: [],
//   智力: ["奥秘", "历史", "调查", "自然", "宗教"],
//   感知: ["驯兽", "洞悉", "医药", "察觉", "求生"],
//   魅力: ["欺瞒", "威吓", "表演", "游说"],
// };

export const AbilityType = {
  strength: ["运动"],
  dexterity: ["体操", "巧手", "隐匿"],
  constitution: [],
  intelligence: ["奥秘", "历史", "调查", "自然", "宗教"],
  wisdom: ["驯兽", "洞悉", "医药", "察觉", "求生"],
  charisma: ["欺瞒", "威吓", "表演", "游说"],
};

export const AbilityPropertyList = Object.keys(AbilityType) as AbilityProperty[];

export type AbilityProperty = keyof typeof AbilityType;

export const AbilityPropertyToName = {
  strength: "力量",
  dexterity: "敏捷",
  constitution: "体质",
  intelligence: "智力",
  wisdom: "感知",
  charisma: "魅力",
};
