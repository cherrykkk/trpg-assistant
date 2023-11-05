export const ProficiencyType = {
  skill: "技能",
  weapon: "武器",
  tool: "工具",
  armor: "护甲",
  save: "豁免",
};

export interface SceneItem {
  id: number;
  name: string;
  description: string;
  points: { x: number; y: number }[];
  showForPlayer: boolean;
  backgroundColor: string;
}

export const ABILITY_SKILL_ZN = {
  力量: ["运动"],
  敏捷: ["体操", "巧手", "隐匿"],
  体质: [] as string[],
  智力: ["奥秘", "历史", "调查", "自然", "宗教"],
  感知: ["驯兽", "洞悉", "医药", "察觉", "求生"],
  魅力: ["欺瞒", "威吓", "表演", "游说"],
};

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

export const ABILITY_PROPERTY_TRANSLATION = {
  strength: "力量",
  dexterity: "敏捷",
  constitution: "体质",
  intelligence: "智力",
  wisdom: "感知",
  charisma: "魅力",
};

export const ABILITY_PROPERTY_TRANSLATION_2 = {
  力量: "strength",
  敏捷: "dexterity",
  体质: "constitution",
  智力: "intelligence",
  感知: "wisdom",
  魅力: "charisma",
};

export interface ItemInfo {
  id: number;
  name: string;
  description?: string;
  ounce?: number;
  pound?: number;
  price?: string;
}
