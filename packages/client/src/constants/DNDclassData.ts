import { SORCERER_CLASS_ADVANCEMENT_CONFIG } from "./classSorcerer";
import { PALADIN_CLASS_ADVANCEMENT_CONFIG } from "./classPaladin";
import { BARD_CLASS_ADVANCEMENT_CONFIG } from "./classBard";
import { WIZARD_CLASS_ADVANCEMENT_CONFIG } from "./classWizard";
export const DNDClassData = [
  {
    class: "吟游诗人",
    施法关键属性: "魅力",
    advancementConfig: BARD_CLASS_ADVANCEMENT_CONFIG,
  },
  {
    class: "牧师",
    施法关键属性: "感知",
  },
  {
    class: "德鲁伊",
    施法关键属性: "感知",
  },
  {
    class: "战士",
    施法关键属性: "智力",
  },
  {
    class: "圣武士",
    施法关键属性: "魅力",
    advancementConfig: PALADIN_CLASS_ADVANCEMENT_CONFIG,
  },
  {
    class: "游侠",
    施法关键属性: "感知",
  },
  {
    class: "法师",
    施法关键属性: "智力",
    advancementConfig: WIZARD_CLASS_ADVANCEMENT_CONFIG,
  },
  {
    class: "术士",
    施法关键属性: "魅力",
    advancementConfig: SORCERER_CLASS_ADVANCEMENT_CONFIG,
  },
  {
    class: "邪术师",
    施法关键属性: "魅力",
  },
];
