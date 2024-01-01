import { getNewObjectId } from "@/api/socket-tasks";
import type { CharacterDoc, ClientScene, EntityInfo, FeatureDoc, SpellDoc } from "@trpg/shared";

export async function createNewCharacterInfoTemplate(): Promise<CharacterDoc> {
  return {
    _id: await getNewObjectId(),
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
    proficiencyBonus: 2,
    proficiencyNames: "",
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
    locationSceneId: "",
    currentInitiative: 0,
    backpack: [],
  };
}

export async function createSceneTemplate(): Promise<ClientScene> {
  return {
    _id: await getNewObjectId(),
    gameInstanceId: "",
    name: "未命名",
    richTextDescription: undefined,
    fatherId: null,
    relatedMapId: "",
    children: [],
    storage: [],
  };
}

export async function createSpellTemplate(): Promise<SpellDoc> {
  return {
    _id: await getNewObjectId(),
    level: 0,
    name: "",
    school: "",
    castingTime: "",
    range: "",
    components: "",
    duration: "",
    concentration: false,
    ritual: false,
    material: "",
    description: "",
    higherLevel: "",
  };
}

export async function createEntityTemplate(): Promise<EntityInfo> {
  return {
    _id: await getNewObjectId(),
    name: "",
    description: "",
    ounce: 0,
    pound: 0,
    isCustom: true,
    changeLogs: [],
  };
}

export async function createFeatureTemplate(): Promise<FeatureDoc> {
  return {
    _id: await getNewObjectId(),
    name: "",
    description: "",
  };
}
