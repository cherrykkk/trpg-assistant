export type Ability = keyof typeof abilityType;
export const abilityType = {
  力量: ["运动"],
  敏捷: ["体操", "巧手", "隐匿"],
  体质: [],
  智力: ["奥秘", "历史", "调查", "自然", "宗教"],
  感知: ["驯兽", "洞悉", "医药", "察觉", "求生"],
  魅力: ["欺瞒", "威吓", "表演", "游说"],
};

export type Race = "提夫林" | "半精灵" | "龙裔";

export const raceData = [
  { race: "提夫林", charisma: 2, intelligence: 1, speed: 30 },
  { race: "半精灵", charisma: 2, intelligence: 1, speed: 30 },
  { race: "龙裔", charisma: 2, intelligence: 1, speed: 30 },
];
