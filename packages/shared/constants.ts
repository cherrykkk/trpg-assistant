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
  _id: string;
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
  spellsKnown: SpellOnCharacter[];
  spellsPrepared: SpellOnCharacter[];
  appearance: string;
  speed: number;
  location: { sceneName: string; x: number; y: number };
  currentInitiative: number;
  backpack: StoredStackData[];
}

export interface StoredStackData {
  id: number;
  num: number;
  note: string;
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
  _id: string;
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
  诗人: string;
  牧师: string;
  德鲁伊: string;
  圣武士: string;
  游侠: string;
  术士: string;
  邪术士: string;
  法师: string;
}

export interface Message {
  _id: string;
  gameInstanceId: string;
  content: string;
}

export interface Scene {
  _id: string;
  gameInstanceId: string;
  name: string;
  father: string | null;
  richTextDescription: any;
  description?: string;
  areaX?: number;
  areaY?: number;
  picture?: string;
  items: SceneItem[];
  children: Scene[];
  relatedMapIDs: String[];
  storage: StoredStackData[];
}
export function createSceneTemplate(): Scene {
  return {
    _id: "",
    gameInstanceId: " ",
    picture: undefined,
    name: "",
    description: "",
    richTextDescription: undefined,
    father: null,
    areaX: 10,
    areaY: 10,
    items: [],
    children: [],
    relatedMapIDs: [],
    storage: [],
  };
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
  _id: string;
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
  _id: string;
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
  description?: string;
  ounce?: number;
  pound?: number;
  price?: string;
}
export const ENTITY_DATABASE: ItemInfo[] = [
  {
    id: 0,
    name: "未定义",
    description: "未定义",
  },
  {
    id: 1,
    name: "金币",
    description:
      "一枚金币可以购买一个腰包 ， 50 尺的优质绳索或一头山羊。一名纯熟（ 但并不杰出 ）的工匠每日就可以挣取一枚金币 。 尽管金币并不经常直接用于交易 ， 但却是度量财富的常用单位 。 当商人们商谈价值千百金币的货物或服务时 ， 其交易通常并不包含个别货币的交换 。 某种程度上金币只是衡量价值的一个标准 ， 而实际交易中通常是使用金条 ， 信用状或其他值钱的商品 。",
    ounce: 0.33,
  },
  {
    id: 2,
    name: "银币",
    description:
      "一枚金币值十枚银币 ， 而银币则是普通人之间最流行的货币 。一枚银币可以雇佣一名苦力工作半日 ， 可以购买一罐灯油 ， 或是让你在一家简陋的旅馆休息一夜 。",
    ounce: 0.33,
  },
  {
    id: 3,
    name: "铜币",
    description:
      "一枚银币值十枚铜币 ， 而铜币则常在乞丐与苦力中流通 。一枚铜币能买一根蜡烛 ， 一支火把或是一块粉笔 。",
    ounce: 0.33,
  },
  { id: 100, name: "算盘", description: "", price: "2 gp", pound: 2 },
  { id: 101, name: "强酸", description: "", price: "25 gp", pound: 1 },
  { id: 102, name: "炽火胶", description: "", price: "50 gp", pound: 1 },
  { id: 103, name: "箭（20）", description: "弹药", price: "1 gp", pound: 1 },
  { id: 104, name: "吹矢（50）", description: "弹药", price: "1 gp", pound: 1 },
  { id: 105, name: "弩矢（20）", description: "弹药", price: "1 gp", ounce: 8, pound: 1 },
  { id: 106, name: "投石索弹丸（20）", description: "弹药", price: "4 cp", ounce: 8, pound: 1 },

  {
    id: 107,
    name: "抗毒剂",
    description:
      "抗毒剂 Antitoxin。 喝下瓶内液体的生物在 1 小时内进行对抗对毒素的豁免检定时具有优势 。 它无法为不死生物或构装生物提供任何增益 。",
    ounce: 0,
    pound: 0,
    price: "50 gp",
  },
  { id: 108, name: "水晶", description: "奥术法器，crystal", price: "10 gp", pound: 1 },
  { id: 109, name: "法球", description: "奥术法器，orb", price: "20 gp", pound: 3 },
  { id: 110, name: "权杖", description: "奥术法器，rob", price: "10 gp", pound: 2 },
  { id: 111, name: "法杖", description: "staff", price: "5 gp", pound: 4 },
  { id: 112, name: "魔杖", description: "奥术法器，wand", price: "10 gp", pound: 1 },
  { id: 113, name: "背包", description: "", price: "2gp", pound: 5 },
  {
    id: 114,
    name: "滚珠",
    description:
      "滚珠 Ball Bearings 一包1000粒，你可以用一个动作将这些小金属珠从袋子中洒出 ， 并覆盖一片边长 10 尺的方形区域 。 穿过这片区域的生物必须进行一次 DC10 的敏捷豁免 ， 豁免失败则摔至倒地 。以半速穿过该区域的生物不需要进行该豁免 。",
    ounce: 0,
    pound: 2,
    price: "1 gp",
  },
  { id: 115, name: "木桶", description: "", pound: 70 },
  { id: 116, name: "篮子", description: "" },
  { id: 117, name: "铺盖", description: "" },
  { id: 118, name: "铃铛", description: "" },
  { id: 119, name: "毛毯", description: "" },
  {
    id: 120,
    name: "滑轮组",
    description:
      "滑轮组 Block and Tackle 一组滑轮组 ， 其中配有一根绳索绕过轮组中 ， 其上还装着一个系物的钩子 。 滑轮组可以让你提起相当于你正常举重四倍重量的物件 。",
    pound: 5,
    price: "5 gp",
  },

  {
    id: 121,
    name: "书",
    description:
      "书 book 一本书可能写着诗歌 、 故事或是其他的内容 。 里面可能有关于某个特定地区的学识信息 ， 也可能有侏儒语记载的机械图和笔记 ， 或者任何其它能够用文字或图形表达的内容 。 一本载有法术的书则是一本法术书 （ 见后文详述 ） 。",
    price: "28 gp",
    pound: 5,
  },
  { id: 122, name: "玻璃瓶", description: "" },
  { id: 123, name: "水桶", description: "" },
  {
    id: 124,
    name: "铁蒺藜",
    description:
      "铁蒺藜 Caltrops。你可以用一个动作将一包铁蒺藜撒出 ， 并覆盖一块边长 5 尺的方形区域 。 任何进入该区域的生物必须进行一次 DC15 的敏捷豁免 ， 豁免失败则该生物停止移动 ， 并受到 1点穿刺伤害 。 在该生物恢复至少 1 点生命值前 ， 其步行速度将减少 10 尺 。 以半速穿过该区域的生物不需要进行该豁免 。",
    pound: 2,
  },
  {
    id: 125,
    name: "蜡烛",
    description:
      "蜡烛 Candle一只蜡烛可以为其身边 5 尺半径范围提供明亮光照 ， 以及该范围外 5 尺的微光光照 。 蜡烛的照明效果可以持续 1 小时 。",
    price: "1 cp",
    ounce: 0,
    pound: 0,
  },
  {
    id: 126,
    name: "弩矢匣",
    description: "弩矢匣 Case, Crossbow Bolt。一只木匣能装二十支弩矢 。",
  },
  {
    id: 127,
    name: "地图或卷轴匣",
    description:
      "地图或卷轴匣 Case, Map or scroll。 一个圆柱形皮匣能够装上十张卷起的纸或是五张卷起的羊皮纸 。",
  },
  {
    id: 128,
    name: "链条",
    description: "链条 Chain。一根链条有 10 点生命值 。 它可以被一次成功的 DC20 力量检定挣断 。",
    pound: 10,
  },
  { id: 129, name: "粉笔", description: "" },
  { id: 130, name: "木箱", description: "", pound: 25 },
  {
    id: 131,
    name: "攀爬工具",
    description:
      "攀爬工具 Climber's Kit 一套攀爬工具包括特制的岩钉 ，靴子包头 ， 手套和系带 。 你可以用一个动作来运用攀爬工具锚定自己 ： 此时你不会从锚定处摔落超过 25 尺 ， 且在解除锚定前无法从锚定处向外攀爬超过 25 尺 。",
    pound: 12,
  },
  {
    id: 132,
    name: "普通服装",
    description: "",
    pound: 3,
  },
  { id: 133, name: "表演服装", description: "", pound: 4 },
  { id: 134, name: "高档服装", description: "", pound: 6 },
  { id: 135, name: "旅行者服装", description: "", pound: 4 },
  {
    id: 136,
    name: "材料包",
    description:
      "材料包 Component Pouch。 材料包是一个防水的皮质小腰包 ， 其内有间格用以放置各种材料成分以及其它你需要用以施展法术的特殊物品 。 某些有着特定价格的材料不包含在材料包中（ 详见相关法术的描述内容 ） 。",
    pound: 2,
  },
  {
    id: 137,
    name: "撬棍",
    description: "撬棍 crowbar。 在适当的地方使用撬棍时 ， 可以让相应的力量检定具有优势 。",
    pound: 5,
  },
  {
    id: 138,
    name: "槲寄生枝条（德鲁伊法器）",
    description:
      "spring of mistletoe 德鲁伊法器是一件用来引导德鲁伊法术的特殊物品 。 它可以是一枝槲寄生或冬青 ， 一根用紫衫木或其它特殊木材制作的魔杖或节杖 ， 一根从活树上折下的法杖或是一个包含神圣动物身上的羽毛 、 毛皮 、 骨头和牙齿组合成的图腾 。 德鲁伊能将这样的物品用作其施法的法器 。",
  },
  {
    id: 139,
    name: "图腾",
    description:
      "totem 德鲁伊法器是一件用来引导德鲁伊法术的特殊物品 。 它可以是一枝槲寄生或冬青 ， 一根用紫衫木或其它特殊木材制作的魔杖或节杖 ， 一根从活树上折下的法杖或是一个包含神圣动物身上的羽毛 、 毛皮 、 骨头和牙齿组合成的图腾 。 德鲁伊能将这样的物品用作其施法的法器 。",
  },
  {
    id: 140,
    name: "木制法杖（德鲁伊法器）",
    description:
      "wooden staff 德鲁伊法器是一件用来引导德鲁伊法术的特殊物品 。 它可以是一枝槲寄生或冬青 ， 一根用紫衫木或其它特殊木材制作的魔杖或节杖 ， 一根从活树上折下的法杖或是一个包含神圣动物身上的羽毛 、 毛皮 、 骨头和牙齿组合成的图腾 。 德鲁伊能将这样的物品用作其施法的法器 。",
    pound: 4,
  },
  {
    id: 141,
    name: "紫杉魔杖（德鲁伊法器）",
    description:
      "yew wand 德鲁伊法器是一件用来引导德鲁伊法术的特殊物品 。 它可以是一枝槲寄生或冬青 ， 一根用紫衫木或其它特殊木材制作的魔杖或节杖 ， 一根从活树上折下的法杖或是一个包含神圣动物身上的羽毛 、 毛皮 、 骨头和牙齿组合成的图腾 。 德鲁伊能将这样的物品用作其施法的法器 。",
    pound: 1,
    price: "10 gp",
  },
  {
    id: 142,
    name: "渔具",
    description:
      "Fishing Tackle。一套渔具工具包中 ， 装有一根木杆 、丝线 、 软木转轴 、 铅坠 、 天鹅绒饵以及窄眼网 。",
    pound: 4,
  },
  { id: 143, name: "扁瓶或大杯", description: "", pound: 1 },
  { id: 144, name: "爪钩", description: "", pound: 4 },
  { id: 145, name: "铁锤", description: "", pound: 3 },
  { id: 146, name: "大铁锤", description: "", pound: 10 },
  {
    id: 147,
    name: "医疗包",
    description:
      "医疗包 Healer's Kit。一个医疗用小皮包中 ， 装有绷带 、 药膏和夹板 。 医疗包可以使用十次 。 你可以使用一个动作 ， 并花费一次使用次数来为一个生命值为 0 的生物稳定伤势 ， 而无需进行相应的感知 （ 医药 ） 检定 。",
    pound: 3,
  },
  {
    id: 148,
    name: "护符（圣徽）",
    description:
      "一枚圣徽是某个神衹或神系象征 。 它可能是一个描绘有代表一个神衹符号的护身符 ， 相同的符号可能作为一个徽章被仔细地雕刻或镶嵌在一面盾牌上 ， 也可能是一个盛有一块神圣遗物碎片的小盒 。 附录 B 中列举有多元宇宙众神的代表性徵记 。 牧师或圣武士能将圣徽用作其施法的法器 。 使用这些圣徽时 ， 施法着必须将其握在手中 ， 戴在身上可见处 ， 或者将其装在盾上使用 。",
    pound: 1,
  },
  {
    id: 149,
    name: "徽章（圣徽）",
    description:
      "一枚圣徽是某个神衹或神系象征 。 它可能是一个描绘有代表一个神衹符号的护身符 ， 相同的符号可能作为一个徽章被仔细地雕刻或镶嵌在一面盾牌上 ， 也可能是一个盛有一块神圣遗物碎片的小盒 。 附录 B 中列举有多元宇宙众神的代表性徵记 。 牧师或圣武士能将圣徽用作其施法的法器 。 使用这些圣徽时 ， 施法着必须将其握在手中 ， 戴在身上可见处 ， 或者将其装在盾上使用 。",
    pound: 0,
    ounce: 0,
  },
  {
    id: 150,
    name: "圣物匣（圣徽）",
    description:
      "一枚圣徽是某个神衹或神系象征 。 它可能是一个描绘有代表一个神衹符号的护身符 ， 相同的符号可能作为一个徽章被仔细地雕刻或镶嵌在一面盾牌上 ， 也可能是一个盛有一块神圣遗物碎片的小盒 。 附录 B 中列举有多元宇宙众神的代表性徵记 。 牧师或圣武士能将圣徽用作其施法的法器 。 使用这些圣徽时 ， 施法着必须将其握在手中 ， 戴在身上可见处 ， 或者将其装在盾上使用 。",
    pound: 2,
  },
  {
    id: 151,
    name: "圣水",
    description:
      "圣水 Holy Water 你可以用一个动作将这小瓶液体泼溅到你身边 5 尺范围内的一个生物身上 ， 或是将小瓶投到至多 20 尺远的地方 ， 并利用冲击打破它 。 两种情况都可以视为对一个生物或物件发动一次远程攻击 ， 并将圣水视为一件临时武器 。 命中时 ，如果目标是一只邪魔或不死生物 ， 则目标受到 2d6 点光耀伤害 。\n 一名牧师或圣武士能通过主持一种特殊的仪式来创造圣水 。该仪式花费 1 小时进行 ， 且需要花费价值 25gp 的银粉 ， 并消耗施法者一枚 1 环法术位 。",
    pound: 1,
  },
  {
    id: 152,
    name: "沙漏",
    description: "",
    pound: 1,
  },
  {
    id: 153,
    name: "狩猎陷阱",
    description:
      "使用动作设置好该陷阱后 ， 其形成一个锯齿钢圈 ， 并在生物踏上其中央压板时闭合 。 陷阱由一根沉重的链条固定在某处 ， 例如一棵树或是一根钉在地上的钉子 。 任何踩上压板的生物都必须进行一次 DC13 的敏捷豁免 ， 豁免失败则受到 1d4 点穿刺伤害 ， 并停止移动 。 在该生物从陷阱中解脱前 ，其移动范围都被限制在链条的长度内 （ 通常为 3 尺 ） 。 一个生物可以使用动作进行一次 DC13 的力量检定 ， 以解脱自己或其触及范围内的另一生物 。 每次豁免失败时 ， 被困生物都将受到 1 点穿刺伤害 。",
    pound: 25,
  },
  {
    id: 154,
    name: "墨水（1 盎司瓶)",
    description: "",
  },
  {
    id: 155,
    name: "墨水笔",
    description: "",
  },
  {
    id: 156,
    name: "壶或罐",
    description: "",
    pound: 4,
  },
  {
    id: 157,
    name: "爬梯（10尺）",
    description: "",
    pound: 25,
  },
  {
    id: 158,
    name: "油灯 Lamp",
    description:
      "一只油灯可以为其身边 15 尺半径范围提供明亮光照 ， 以及该范围外 30 尺的微光光照 。 点亮的油灯每 6 小时消耗一扁瓶灯油 （ 1 品脱 ） 。",
    pound: 1,
    price: "5 sp",
  },
  {
    id: 159,
    name: "牛眼提灯 Lantern, Bullseye",
    description:
      "一盏牛眼提灯可以为前方 60 尺的锥状区域提供明亮光照 ， 以及该范围外 60 尺的微光光照 。点亮的牛眼提灯每 6 小时消耗一扁瓶的灯油 （ 1 品脱 ） 。",
    price: "10 gp",
    pound: 2,
  },
  {
    id: 160,
    name: "附盖提灯 Lantern, Hooded",
    description:
      "一盏附盖提灯可以为其身边 30 尺半径范围提供明亮光照 ， 以及该范围外 30 尺的微光光照 。 点亮的提灯每 6 小时消耗一扁瓶的灯油 （ 1 品脱 ） 。 你可以使用一个动作放下盖子 ， 使其光照减弱为 5 尺范围的微光照明 。",
    price: "5 gp",
    pound: 2,
  },
  {
    id: 161,
    name: "锁",
    description:
      "每把锁与一把钥匙相配套 。 不使用钥匙时 ， 一个具有盗贼工具熟练项的生物可以通过一次成功的 DC15 敏捷检定撬开这把锁 。 DM 可决定是否能够用更高的价格买到更好的锁 。",
    pound: 1,
  },
  {
    id: 162,
    name: "放大镜",
    description:
      "一枚用以详细观察小物件的透镜 。生火时 ， 你也可以用它代替燧石与铁片 。 使用放大镜聚焦光来生火需要如同阳光般明亮的光照 、 可用的引火物质以及约 5 分钟的时间来完成点燃作业 。 进行估价或是检查某个细小或具有精细细节物件时所作的属性检定可以使用放大镜来获得优势 。",
    price: "100 gp",
  },
  {
    id: 163,
    name: "镣铐",
    pound: 6,
    description:
      "这些金属束具可以困住一只小型或中型体型的生物 。 解开镣铐必须成功通过一次 DC20 的敏捷检定 。 破坏镣铐则必须成功通过一次 DC20 的力量检定 。 每套镣铐配有一把对应的钥匙 。 不用钥匙时 ， 一个具有盗贼工具熟练项的生物可以通过一次成功的 DC15 敏捷检定撬开镣铐的锁 。 镣铐具有 15 点生命值 。",
  },
  {
    id: 164,
    name: "野炊工具",
    description:
      "一个野炊工具锡盒包括一只茶杯和一些简易餐具 。 盒子被夹在一起 ， 并且其中一面能够被用作一只煎锅而另一面则可以作为一只碟子或是浅碗 。",
  },
  {
    id: 165,
    name: "钢面镜 mirror, steel",
    description: "",
    ounce: 8,
  },
  {
    id: 166,
    name: "灯油 oil（扁瓶 flask）",
    description:
      "灯油通常装在一个 1 品脱大小的陶土扁瓶中 。 你可以用一个动作将扁瓶中的灯油泼溅到你身边 5 尺范围内的一个生物身上 ， 或是将扁瓶投到至多 20 尺远的地方 ， 并利用冲击打破它 。 两种情况都可以视为对一个生物或物件发动一次远程攻击 ， 并将灯油视为一件临时武器 。 命中时 ， 目标被灯油洒满全身 。如果目标在灯油挥发前 （ 1 分钟后 ） 受到任何火焰伤害 ， 则目标因燃烧的灯油受到额外 5 点火焰伤害 。 你还可以将一扁瓶灯油泼在地面上 ， 以覆盖一块边长 5 尺且保持水平的方形区域 。 点燃该区域后 ， 灯油将持续燃烧 2 轮 ， 并对任何进入该区域或在该区域结束其回合的生物造成 5 点火焰伤害 。 同一生物每回合只受该伤害作用一次 。",
  },
  {
    id: 167,
    name: "纸（每张）",
    price: "2 sp",
  },
  { id: 168, name: "羊皮纸（每张）", price: "1 sp" },
  {
    id: 169,
    name: "香水（小瓶）",
    price: "5 gp",
  },
  {
    id: 170,
    name: "矿工镐",
    pound: 10,
  },
  {
    id: 171,
    name: "岩钉",
    pound: 0,
    ounce: 4,
  },
  {
    id: 172,
    name: "基础毒药",
    price: "100 gp",
    description:
      "你可以用一个动作将小瓶中的毒药涂于一把挥砍或穿刺武器上 ， 或者涂在至多三发弹药上 。 涂毒武器或弹药命中时 ， 被命中生物必须进行一次 DCIO 的体质豁免 ，豁免失败则受到 1d4 的毒素伤害 。 涂毒后 ， 武器的毒性效果可以维持 1 分钟 。",
  },
  {
    id: 173,
    name: "木杆",
    pound: 7,
  },
  {
    id: 174,
    name: "铁壶",
    pound: 10,
  },
  {
    id: 176,
    name: "治疗药水",
    price: "50 gp",
    ounce: 8,
    description:
      "一种红色的魔力药剂 ， 可以使饮用者恢复 2d4 + 2 的生命值 。 喝药或者喂人喝药需要使用一个动作 。",
  },
  {
    id: 177,
    name: "小包 pouch",
    description:
      "一个布料或皮革制成的小包可以装 20 发弹丸或 50 发吹矢 ， 或者其他东西 。 用来装施法材料成分的小包则成为材料包 （ 详见前文 ） 。",
  },
  { id: 178, name: "箭袋", pound: 1, description: "一只箭袋可以盛装 20 支箭。" },
  {
    id: 179,
    name: "便携式攻城锤",
    price: "4 gp",
    pound: 35,
    description:
      "便携式攻城锤 Ram. Portable 你可以使用一具便携式攻城锤破门 。 此时你破门的力量检定具有 + 4 加值 。 如果另一名角色从旁协助 ， 则你破门的力量检定因此而具有优势 。",
  },
  {
    id: 180,
    name: "口粮（一日份）",
    price: "5 sp",
    pound: 2,
    description: "适合长途旅行携带的高能量干粮 ， 包括牛肉干 、 干果 、 饼干和坚果等 。",
  },
  { id: 181, name: "长袍", pound: 4 },
  {
    id: 182,
    name: "麻绳 rope, hempen",
    pound: 10,
    description:
      "麻质或者丝质的绳索 ， 拥有 2 点生命值 ， 且可以通过一次成功的 DC17 力量检定扯断 。",
  },
  {
    id: 183,
    name: "丝绳 rope, silk",
    price: "10 gp",
    pound: 5,
    description:
      "麻质或者丝质的绳索 ， 拥有 2 点生命值 ， 且可以通过一次成功的 DC17 力量检定扯断 。",
  },
  { id: 184, name: "麻袋" },
  {
    id: 186,
    name: "商用天平 scale, merchant's",
    description:
      "一架天平包括一个小的衡平 、一对托盘和一套共重 2 磅的砝码 。 它可以用来称量小物件的精细重量 （ 比如稀有贵金属或贸易货物 ） ， 以便估价 。",
  },
  { id: 187, name: "封蜡" },
  { id: 188, name: "铲子" },
  { id: 189, name: "哨子" },
  { id: 190, name: "玺戒" },
  { id: 191, name: "肥皂" },
  {
    id: 192,
    name: "法术书",
    price: "50 gp",
    pound: 3,
    description:
      "硬皮封面的法术书是法师们的必须品 ，为方便记录法术 ， 其通常都留有 100 张羊皮纸空书页 。",
  },
  { id: 193, name: "铁钉 （10根）" },
  {
    id: 194,
    name: "望远镜",
    price: "1000 gp",
    pound: 1,
    description: "从望远镜中观察到的物品能放大两倍 。",
  },
  {
    id: 195,
    name: "双人帐篷",
    price: "2 gp",
    pound: 20,
    description: "一个简单轻便的双人帆布帐篷",
  },
  {
    id: 196,
    name: "火绒盒",
    price: "5 sp",
    pound: 1,
    description:
      "一个小巧的盒子里装有燧石 ， 铁片和火绒 （ 通常是在轻油中浸过的干布 ） ， 是一种常用的生火工具 。 使用火绒盒点燃一支火把 （ 或其他燃料物质外露的物件 ） 需要使用一个动作 ， 而用来点燃其他物品则需要花费 1 分钟 。",
  },
  {
    id: 197,
    name: "火把",
    description:
      "一支火把可以为其身边 20 尺半径范围提供明亮光照 ， 以及其外 20 尺范围的微光光照 。 火把的照明效果可以持续 1 小时 。 你还可以使用一支燃烧的火把发动一次近战攻击 ，命中时 ， 该攻击可以造成 1 点火焰伤害 。",
  },
  { id: 199, name: "小瓶" },
  { id: 200, name: "水袋" },
  { id: 201, name: "磨刀石" },
];
