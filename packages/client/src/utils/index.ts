import { useSocketStore } from "@/stores/useSocketStore";
import { CharacterInfo, SpellInfo, SpellOnCharacter } from "@trpg/shared";
import { ElMessage } from "element-plus";

export function copyCharacter(c: CharacterInfo) {
  console.log("暂未实现");
}

export function turnToSpellsInfo(data: SpellOnCharacter[]) {
  const result: SpellInfo[] = [];
  data.forEach((e) => {
    const spellItem = useSocketStore().allSpellInfo.find((info) => info.id === e.spellId);
    if (spellItem) {
      result.push(spellItem);
    }
  });
  result.sort((a, b) => a.等级 - b.等级);
  return result;
}

export function createNewCharacterInfoTemplate(): CharacterInfo {
  return {
    id: "",
    gameInstanceId: "",
    scope: "template",
    name: "",
    titles: "", //头衔
    alignment: "",
    age: 0,
    sex: "",
    class: "", //职业
    race: "",
    subRace: "", //亚种
    currentHP: 0,
    maxHP: 0,
    backgroundStory: "",
    proficiencies: [],
    experience: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    equipment: [],
    spellsKnown: [],
    spellsPrepared: [],
    appearance: "",
    speed: 30,
    location: { sceneName: "", x: 1, y: 1 },
    currentInitiative: 0,
    backpack: [],
  };
}

export function useDoubleClick(func: Function, failedMessage?: string) {
  let lockHandler: number | null = null;
  return (args: any[] = []) => {
    if (lockHandler === null) {
      lockHandler = setTimeout(() => {
        if (failedMessage) {
          ElMessage(failedMessage);
        }
        lockHandler = null;
      }, 300);
      return false;
    } else {
      clearTimeout(lockHandler);
      lockHandler = null;
      func(...args);
      return true;
    }
  };
}
