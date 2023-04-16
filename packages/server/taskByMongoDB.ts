import { collections } from "./connect";
import { ObjectId } from "mongodb";
import { CharacterInfo, Message, Scene, SpellInfo } from "@trpg/shared";

export async function getUserAccountInfo(password: string) {
  const charactersInfo = await collections.characters.find({ password }).toArray();
  return transformID(charactersInfo) as CharacterInfo[];
}

export async function getAllCharactersInfo() {
  const players = await collections.characters.find({}).toArray();
  return transformID(players) as CharacterInfo[]
}

export async function updateCharacterInfo(
  characterId: string,
  characterInfo: Partial<CharacterInfo>
) {
  delete characterInfo.id;

  return collections.characters.updateOne({ _id: new ObjectId(characterId) }, { $set: characterInfo });
}

export async function createCharacterInfo(characterInfo: CharacterInfo) {
  return collections.characters.insertOne({ ...characterInfo, _id: new ObjectId() });
}

export async function getCharacterInfoById(characterId: string) {
  const characterInfo = await collections.characters
    .find({ _id: new ObjectId(characterId) })
    .toArray();
  return characterInfo as unknown as CharacterInfo;
}

export async function deleteCharacterInfoById(characterId: string) {
  const query = { _id: new ObjectId(characterId) };
  const result = await collections.characters.deleteOne(query);
  return result
}

export async function getAllMessage() {
  const messages = await collections.messages.find({}).toArray();
  return transformID(messages) as Message[];
}

export function writeMessage(messageContent: string) {
  return collections.messages.insertOne({ content: messageContent, _id: new ObjectId() });
}

export async function getAllScenes() {
  const scenes = await collections.scenes.find({}).toArray();
  return transformID(scenes) as Scene[];
}

export async function getAllSpellInfo() {
  const spellInfo = await collections.spells.find({}).toArray();
  return transformID(spellInfo) as SpellInfo[];
}

export function rollDice(diceType: number) {
  return Math.ceil(Math.random() * diceType);
}

function transformID<T extends { _id: ObjectId }>(serverData: T[]): (T & { id: string })[] {
  const clientData = serverData.map(e => {
    const newE = { ...e, id: e._id.toString() }
    delete newE._id
    return newE

  })
  return clientData
}