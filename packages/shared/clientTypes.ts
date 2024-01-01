import type { SceneDoc, ProficiencyObject } from "./dbTypes";

export type ClientScene = Omit<SceneDoc, "changeLogs"> & {
  children: ClientScene[];
};
