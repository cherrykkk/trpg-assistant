import { type SpellDoc, type SpellOnCharacter, SPELL_OF_CLASS } from "@trpg/shared";
import { useSocketStore } from "./useSocketStore";

export function turnToSpellsInfo(data: SpellOnCharacter[]) {
  const result: SpellDoc[] = [];
  data.forEach((e) => {
    const spellItem = useSocketStore().collections.spell.find((info) => info._id === e.spellId);
    if (spellItem) {
      result.push(spellItem);
    }
  });
  result.sort((a, b) => a.level - b.level);
  return result;
}

export function getSpellByClass(key: string) {
  if (!(key in SPELL_OF_CLASS)) {
    const translation: Record<string, string> = {
      吟游诗人: "bard",
      诗人: "bard",
      牧师: "cleric",
      德鲁伊: "druid",
      圣武士: "paladin",
      游侠: "ranger",
      术士: "sorcerer",
      邪术师: "warlock",
      法师: "wizard",
    };
    if (key in translation) {
      key = translation[key];
    }
  }

  if (key in SPELL_OF_CLASS) {
    const ids = SPELL_OF_CLASS[key as keyof typeof SPELL_OF_CLASS].map((e) => e.spellId);
    const spells = useSocketStore().collections.spell.filter((e) => ids.includes(e._id));
    return spells;
  } else {
    return useSocketStore().collections.spell;
  }
}
