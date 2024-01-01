import { type SpellDoc, SPELL_OF_CLASS, type CharacterDoc } from "@trpg/shared";
import { useSocketStore } from "./useSocketStore";

export function turnToSpellsInfo(ids: string[]) {
  const result: SpellDoc[] = [];
  ids.forEach((e) => {
    const spellItem = useSocketStore().collections.spell.find((info) => info._id === e);
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
    const spells = getSpellsByIds(ids);
    return spells;
  } else {
    return useSocketStore().collections.spell;
  }
}

export function getCharacterSelectableSpells(character: CharacterDoc) {
  const features = useSocketStore().collections.feature.filter((e) =>
    character.equippedFeatures?.find((e2) => e2.featureId === e._id)
  );
  const spellIdsFromFeatures = features.reduce<string[]>((e1, e2) => {
    return [...e1, ...(e2.expendedSpellList ?? [])];
  }, []);

  const spells = getSpellsByIds(spellIdsFromFeatures);
  return spells;
}

export function getSpellsByIds(ids: string[]) {
  const spells = useSocketStore().collections.spell.filter((e) => ids.includes(e._id));
  return spells;
}
