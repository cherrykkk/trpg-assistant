import type { CharacterInfo } from "@trpg/shared";
import { defineStore } from "pinia";
import { useSceneStore } from "./useSceneStore";

export const useCharactersStore = defineStore("character", {
  state: () => ({
    count: 0,
    characters: [] as CharacterInfo[],
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

export function createNewCharacterInfoTemplate(): CharacterInfo {
  return {
    id: "",
    scope: "monster",
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
    技能熟练项: [],
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
