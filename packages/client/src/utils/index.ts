import { useSocketStore } from "@/stores/useSocketStore";
import type {
  CharacterInfo,
  LayerInfo,
  SpellInfo,
  SpellOnCharacter,
  CanvasMap,
} from "@trpg/shared";
import { ElMessage } from "element-plus";
import { createProficienciesTemplate } from "./createProficienciesTemplate";
import { CHARACTER_ADVANCEMENT } from "@/stores/constants";

export function turnToSpellsInfo(data: SpellOnCharacter[]) {
  const result: SpellInfo[] = [];
  data.forEach((e) => {
    const spellItem = useSocketStore().allSpellInfo.find((info) => info._id === e.spellId);
    if (spellItem) {
      result.push(spellItem);
    }
  });
  result.sort((a, b) => a.等级 - b.等级);
  return result;
}

export function createNewCharacterInfoTemplate(): CharacterInfo {
  return {
    _id: "",
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
    proficiencies: createProficienciesTemplate(),
    proficiencyBonus: 2,
    experience: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    equipment: [],
    spells: [],
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

export function paintCanvas(
  ctx: CanvasRenderingContext2D,
  layers: LayerInfo[],
  inDMView: boolean,
  shawdowLayer?: LayerInfo
) {
  layers.forEach((singleLayer) => {
    if (!inDMView && !singleLayer.playerVisible) return;
    if (singleLayer === shawdowLayer) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = "red";
    } else {
      ctx.shadowBlur = 0;
    }
    singleLayer.brushActions.forEach((a) => {
      ctx.beginPath();
      ctx.strokeStyle = a.color;
      ctx.lineWidth = 2;
      if (a.brushType === "line") {
        const start = a.points[0];
        ctx.moveTo(start.x, start.y);
        a.points.forEach((p) => {
          ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      }
    });
  });
}

export function createCanvasMapTemplate(): CanvasMap {
  return {
    _id: "",
    mapName: "新建地图",
    layers: [],
    width: 400,
    height: 400,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  };
}

export function getLevelAndBonus(exp: number) {
  for (let data of [...CHARACTER_ADVANCEMENT].reverse()) {
    if (data.exp <= exp) {
      return data;
    }
  }
  return CHARACTER_ADVANCEMENT[0];
}
