import { getLevelAndBonus, getSpellSlotNum } from "@/utils";
import type { CharacterInfo } from "@trpg/shared";
import { ref, watch, type Ref } from "vue";
export function useLevelAndConfig(character: Ref<CharacterInfo>) {
  const levelAndConfig = ref({ level: 1, proficiencyBonus: 2, spellSlotNum: [] as number[] });

  watch(
    () => character.value.experience,
    () => {
      const levelAndBonus = getLevelAndBonus(character.value.experience);
      const spellSlotNum = getSpellSlotNum(character.value.class, levelAndBonus.level) ?? [];

      levelAndConfig.value = {
        ...levelAndBonus,
        spellSlotNum,
      };
    },
    {
      immediate: true,
    }
  );
  return { levelAndConfig };
}
