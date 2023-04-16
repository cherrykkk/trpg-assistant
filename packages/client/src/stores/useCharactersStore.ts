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
    chosenCharacters(state) { },
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

// export class Character {
//   _id = "";
//   scope = "monster";
//   name = "";
//   titles = ""; //头衔
//   alignment = "";
//   sex = "";
//   class = ""; //职业
//   race = "";
//   subRace = ""; //亚种
//   currentHP = 0;
//   maxHP = 0;
//   力量 = 0;
//   敏捷 = 0;
//   体质 = 0;
//   智力 = 0;
//   感知 = 0;
//   魅力 = 0;
//   equipment = [] as string[];
//   spells = [] as string[];
//   background = "";
//   location = "";
//   x = 1;
//   y = 1;
//   appearance = "";
//   speed = 30;
//   技能熟练项 = [] as string[];
//   experience = 0;
//   [key: string]: any;

//   constructor(characterData: { [key: string]: any }) {
//     for (let key in characterData) {
//       if (this[key]) {
//         this[key] = characterData[key];
//       }
//     }
//   }

//   updateCharacter(property: { [key: string]: any }) {
//     fetch(`/api/character/${this._id}`, {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(property),
//     }).then((res) => {
//       this.init();
//     });
//   }
// }

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
    charism: 0,
    equipment: [],
    spells: [],
    appearance: "",
    speed: 30,
    location: { sceneName: "", x: 0, y: 0 },
  };
}
