import { Binary } from "mongodb";

export interface CollectionStructure {
  character: CharacterDoc;
  scene: SceneDoc;
  entity: EntityInfo;
  canvas: CanvasMap;
  game: GameInstance;
  message: Message;
  feature: FeatureDoc;
  spell: SpellDoc;
}
export type CollectionKey = keyof CollectionStructure;

export type CharacterDoc = CharacterInfo & BasicCollectionStructure;
export type FeatureDoc = FeatureInfo & BasicCollectionStructure;
export type SceneDoc = SceneInfo & BasicCollectionStructure;
export type SpellDoc = SpellInfo & BasicCollectionStructure;

export interface CharacterInfo {
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
  fakeHP: number;
  hitPointRule: string;
  armorClass?: string;
  spellDifficultyClass?: string;
  spellcastingAbility?: string;
  backgroundStory?: string;
  proficiencies?: ProficiencyObject[];
  proficiencyNames?: string;
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
  equippedFeatures?: EquippedFeature[];
}

export interface EquippedFeature {
  featureId: string;
  reason: string;
}

export interface ProficiencyObject {
  type: "skill" | "armor" | "weapon" | "tool" | "save";
  name: string;
  description: string;
  active: boolean;
}

interface SceneInfo {
  gameInstanceId: string;
  name: string;
  fatherId: string | null;
  richTextDescription: any;
  relatedMapId: string;
  storage: StoredStackData[];
}

interface SpellInfo {
  level: number;
  name: string;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  concentration: boolean;
  ritual: boolean;
  material: string;
  description: string;
  higherLevel: string;
}

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

interface FeatureInfo {
  name: string;
  description: string;
  expendedSpellList?: string[];
  expendedFeatureList?: string[];
}

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
