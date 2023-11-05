import {
  type LayerInfo,
  type SceneDoc,
  type ClientScene,
  type EquippedFeature,
  type FeatureDoc,
  type CharacterDoc,
} from "@trpg/shared";
import { ElMessage } from "element-plus";
import { CHARACTER_ADVANCEMENT } from "@/constants/characterAdvancement";
import { DNDClassData } from "@/constants/DNDclassData";

export function useDoubleClick(func: Function, failedMessage?: string) {
  let lockHandler: number | null = null;
  return (args: any[] = []) => {
    if (lockHandler === null) {
      lockHandler = window.setTimeout(() => {
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

export function getLevelAndBonus(exp: number) {
  for (let data of [...CHARACTER_ADVANCEMENT].reverse()) {
    if (data.exp <= exp) {
      return data;
    }
  }
  return CHARACTER_ADVANCEMENT[0];
}

export function getSpellSlotNum(DNDClass: string, level: number) {
  const classData = DNDClassData.find((e) => e.class === DNDClass);

  if (classData && classData.advancementConfig) {
    return classData.advancementConfig.find((e) => e.level === level)?.spellSlotsNum;
  } else return null;
}

export function getSceneTreeAndClientScenes(allScenes: SceneDoc[]) {
  const clientScenes: ClientScene[] = allScenes.map((e) => ({
    ...e,
    children: [],
  }));
  const notTopSceneList: ClientScene[] = [];

  for (let i = 0; i < clientScenes.length; i++) {
    const scene = clientScenes[i];
    if (scene.fatherId) {
      const fatherScene = clientScenes.find((e) => e._id === scene.fatherId);
      if (fatherScene) {
        notTopSceneList.push(scene);
        fatherScene.children.push(scene);
      }
    }
  }

  const topSceneTreeList = clientScenes.filter((e) => !notTopSceneList.includes(e));
  return { topSceneTreeList, clientScenes };
}

export function calculateFeatures(equipped: EquippedFeature[], featureCollection: FeatureDoc[]) {
  const features: FeatureDoc[] = [];
  equipped.forEach((e) => {
    findAndAddFeature(e.featureId);
  });

  function findAndAddFeature(id: string) {
    const feature = featureCollection.find((e2) => e2._id === id);
    if (feature) {
      features.push(feature);

      if (feature.expendedFeatureList) {
        feature.expendedFeatureList.forEach((e) => findAndAddFeature(e));
      }
    }
  }
  return features;
}
