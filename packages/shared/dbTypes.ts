import { Binary } from "mongodb";

export interface CollectionStructure {
  character: CharacterInfo;
  scene: SceneInfo;
  entity: EntityInfo;
  canvas: CanvasMap;
  game: GameInstance;
  message: Message;
  feature: FeatureInfo;
}
export type CollectionKey = keyof CollectionStructure;

export type CharacterInfo = {
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
  language?: string;
  currentHP: number;
  maxHP: number;
  armorClass?: string;
  spellDifficultyClass?: string;
  spellcastingAbility?: string;
  backgroundStory?: string;
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
  spellSlotNum?: number[];
  spells: SpellOnCharacter[];
  appearance: string;
  speed: number;
  currentInitiative: number;
  backpack: StoredStackData[];
  locationSceneId: string;
} & BasicCollectionStructure;

export interface ProficiencyObject {
  type: "skill" | "armor" | "weapon" | "tool" | "save";
  name: string;
  description: string;
  active: boolean;
}

export type SceneInfo = {
  gameInstanceId: string;
  name: string;
  fatherId: string | null;
  richTextDescription: any;
  relatedMapId: string;
  storage: StoredStackData[];
} & BasicCollectionStructure;

export interface SpellOnCharacter {
  spellId: string;
  reason: string;
}

export interface StoredStackData {
  infoId: string;
  num: number;
  note: string;
}

export type CanvasMap = {
  gameInstanceId: string;
  mapName: string;
  layers: LayerInfo[];
  gridSize: number;
  width: number;
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
} & BasicCollectionStructure;

export interface LayerInfo {
  key: number;
  layerName: string;
  playerVisible: boolean;
  brushActions: BrushAction[];
  isSelected: boolean;
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

export type GameInstance = {
  name: string;
  description: string;
} & BasicCollectionStructure;

export type Message = {
  gameInstanceId: string;
  content: string;
  time: string;
} & BasicCollectionStructure;

export type ResourceType = "image";

interface BaseResourceBlob {
  _id: string;
  gameInstanceId: string;
  resourceType: ResourceType;
  mimeType: string;
}

export type ResourceBlob = BaseResourceBlob & {
  data: ArrayBuffer;
};

export type ResourceBlobEntity = BaseResourceBlob & {
  data: Binary;
};

export type EntityInfo = {
  name: string;
  description: string;
  ounce: number;
  pound: number;
  price?: string;
  isCustom: boolean;
} & BasicCollectionStructure;

export type FeatureInfo = {
  _id: string;
  name: string;
  description: string;
} & BasicCollectionStructure;

export type ChangeLog<T> = Omit<T, "changeLogs"> & {
  changeTime: number;
  // characterId(PL) or gameInstanceId(DM)
  changerId: string;
  changerName: string;
};
export interface BasicCollectionStructure {
  _id: string;
  changeLogs?: ChangeLog<this>[];
}
