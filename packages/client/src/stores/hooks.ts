import { getLevelAndBonus, getSpellSlotNum } from "@/utils";
import type { CharacterDoc } from "@trpg/shared";
import { ref, watch, type Ref, computed } from "vue";
import { getSpellByClass } from "./utils";
export function useLevelAndConfig(character: Ref<CharacterDoc>) {
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

export function useSpellFilter(initKey: string) {
  const classOption = [
    "全部",
    "诗人",
    "牧师",
    "德鲁伊",
    "圣武士",
    "游侠",
    "术士",
    "邪术师",
    "法师",
  ];
  const filterClass = ref("全部");
  (function initFilterClass() {
    if (classOption.includes(initKey ?? "")) {
      filterClass.value = initKey;
    }
  })();

  function handleSelectClass(e: Event) {
    filterClass.value = (e.target as HTMLSelectElement).value;
  }

  const filteredSpellDatabase = computed(() => {
    return getSpellByClass(filterClass.value).sort((a, b) => a.level - b.level);
  });
  return {
    filteredSpellDatabase,
    handleSelectClass,
    classOption,
    filterClass,
  };
}
