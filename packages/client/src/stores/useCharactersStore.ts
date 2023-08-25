import type { CharacterInfo } from "@trpg/shared";
import { defineStore } from "pinia";
import { useSceneStore } from "./useSceneStore";

export const useCharactersStore = defineStore("character", {
  state: () => ({
    count: 0,
    characters: JSON.parse(
      localStorage.getItem("data: allCharactersInfo") ?? "[]"
    ) as CharacterInfo[],
    starCharacterIds: [] as number[],
    chosenCharacter: null as CharacterInfo | null,
  }),
  getters: {
    chosenCharacters(state) {},
    charactersInCurrentScene(): CharacterInfo[] {
      const sceneName = useSceneStore().currentScene?.name;
      if (!sceneName) return [];
      else {
        return this.characters.filter((character) => character.location?.sceneName === sceneName);
      }
    },
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

export type PlayerInfo = CharacterInfo & {};
