import { collections } from "./connect";
import { ObjectId } from "mongodb";
import { CharacterInfo, Message, Scene, SpellInfo } from "@trpg/shared";

export async function getUserAccountInfo(password: string) {
  const charactersInfo = await collections.characters.find({ password }).toArray();
  return charactersInfo as CharacterInfo[];
}

export async function getAllCharactersInfo() {
  const players = await collections.characters.find({}).toArray();
  return players as CharacterInfo[];
}

export async function updateCharacterInfo(
  characterId: ObjectId,
  characterInfo: Partial<CharacterInfo>
) {
  delete characterInfo._id;

  return collections.characters.updateOne({ _id: characterId }, { $set: characterInfo });
}

export async function createCharacterInfo(characterInfo: Partial<CharacterInfo>) {
  return collections.characters.insertOne(characterInfo);
}

export async function getCharacterInfoById(characterId: ObjectId) {
  const characterInfo = await collections.characters
    .find({ _id: new ObjectId(characterId) })
    .toArray();
  return characterInfo as unknown as CharacterInfo;
}

export async function getAllMessage() {
  const messages = await collections.messages.find({}).toArray();
  return messages as Message[];
}

export function writeMessage(messageContent: string) {
  return collections.messages.insertOne({ content: messageContent });
}

export async function getAllScenes() {
  const scenes = await collections.scenes.find({}).toArray();
  return scenes as Scene[];
}

export async function getAllSpellInfo() {
  const spellInfo = await collections.spells.find({}).toArray();
  return spellInfo as SpellInfo[];
}

export function rollDice(diceType: number) {
  return Math.ceil(Math.random() * diceType);
}
