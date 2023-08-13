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
  scope: "monster" | "NPC" | "PC" | "template";
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
  proficiencies: ProficiencyObject[];
  proficiencyBonus: number;
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
  backpack: { id: number; num: number; description: string }[];
}

export interface ProficiencyObject {
  type: "skill" | "armor" | "weapon" | "tool" | "save";
  name: string;
  description: string;
  active: boolean;
}

export const ProficiencyType = {
  skill: "技能",
  weapon: "武器",
  tool: "工具",
  armor: "护甲",
  save: "豁免",
};

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
  richTextDescription: any;
  description?: string;
  areaX?: number;
  areaY?: number;
  picture?: string;
  items: SceneItem[];
  children: Scene[];
  relatedMapIDs: String[];
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

export interface CanvasMap {
  id: string;
  mapName: string;
  layers: LayerInfo[];
  width: number;
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}
export interface LayerInfo {
  layerName: string;
  playerVisible: boolean;
  brushActions: BrushAction[];
}

export interface BrushAction {
  brushType: "line";
  points: Point[];
  color: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface ItemInfo {
  id: number;
  name: string;
  description: string;
  ounce: number;
  pound: number;
}
export const ENTITY_DATABASE: ItemInfo[] = [
  {
    id: 0,
    name: "未定义",
    description: "未定义",
    ounce: 0,
    pound: 0,
  },
  {
    id: 1,
    name: "金币",
    description:
      "一枚金币可以购买一个腰包 ， 50 尺的优质绳索或一头山羊。一名纯熟（ 但并不杰出 ）的工匠每日就可以挣取一枚金币 。 尽管金币并不经常直接用于交易 ， 但却是度量财富的常用单位 。 当商人们商谈价值千百金币的货物或服务时 ， 其交易通常并不包含个别货币的交换 。 某种程度上金币只是衡量价值的一个标准 ， 而实际交易中通常是使用金条 ， 信用状或其他值钱的商品 。",
    ounce: 0.33,
    pound: 0,
  },
  {
    id: 2,
    name: "银币",
    description:
      "一枚金币值十枚银币 ， 而银币则是普通人之间最流行的货币 。一枚银币可以雇佣一名苦力工作半日 ， 可以购买一罐灯油 ， 或是让你在一家简陋的旅馆休息一夜 。",
    ounce: 0.33,
    pound: 0,
  },
  {
    id: 3,
    name: "铜币",
    description:
      "一枚银币值十枚铜币 ， 而铜币则常在乞丐与苦力中流通 。一枚铜币能买一根蜡烛 ， 一支火把或是一块粉笔 。",
    ounce: 0.33,
    pound: 0,
  },
];
