import spells from "./SpellDatabase.json";

export const SPELL_DATABASE = spells;
export type SpellInfo = (typeof SPELL_DATABASE)[number];

export * from "./constants";
