import { getAllCharactersInfo } from "./taskByMongoDB";

export interface CharacterInfo {
  id: number;
  name: string;
  sex: string;
  class: string;
  race: string;
  currentHP: number;
  maxHP: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  equipment: string[];
  spells: string[];
}

export async function changeHP(characterId: number, value: number) {
  const characterList = await getAllCharactersInfo();
  const character = characterList.find((e) => e.id === characterId);
  if (!character) {
    console.log(`error: characterId ${characterId} not exist`);
  }

  character.currentHP += value;
  return "角色的HP";
}
