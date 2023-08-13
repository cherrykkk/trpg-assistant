import type { collections as Collections } from "./connect";
import { Collection, ObjectId } from "mongodb";
import { CharacterInfo, Message, Scene, SpellInfo } from "@trpg/shared";
import type { AllInfo, CollectionName, Document } from "./types";

export function useTask(collections: typeof Collections) {
  async function updateDocument<T extends AllInfo>(
    collecName: CollectionName,
    id: string,
    document: Partial<T>
  ) {
    delete document.id;
    const targetCollection = collections[collecName];

    return targetCollection.updateOne({ _id: new ObjectId(id) }, { $set: document });
  }

  async function queryDocument<T extends CollectionName>(collecName: T, id: string) {
    const targetCollection = getCollection(collecName);

    const documents = await targetCollection.find({ _id: new ObjectId(id) }).toArray();

    const data = transformID(documents as any);
    if (data.length) {
      return data[0];
    } else {
      throw Error();
    }
  }

  async function deleteDocument<T extends CollectionName>(collecName: T, id: string) {
    const targetCollection = collections[collecName];
    const query = { _id: new ObjectId(id) };
    const result = await targetCollection.deleteOne(query);
    return result;
  }

  async function insertAsDoc<T extends CollectionName>(collecName: T, data) {
    delete data.id;
    const targetCollection = getCollection(collecName);

    return targetCollection.insertOne({ ...data, _id: new ObjectId() });
  }

  async function getCharacterInfoById(characterId: string) {
    return queryDocument("characters", characterId) as unknown as CharacterInfo;
  }

  async function getGameInstanceById(gameInstanceId: string) {
    return queryDocument("games", gameInstanceId);
  }

  /** spell */
  async function getAllSpellInfo() {
    const spellInfo = await collections.spells.find({}).toArray();
    return transformID(spellInfo) as SpellInfo[];
  }

  /** other */

  function rollDice(diceType: number) {
    return Math.ceil(Math.random() * diceType);
  }

  function transformID<T extends Document<AllInfo>>(serverData: T[]) {
    const clientData = serverData.map((e) => {
      const newE = { ...e, id: e._id.toString() };
      delete newE._id;
      return newE;
    });
    return clientData;
  }

  function getCollection<T extends CollectionName>(collecName: T) {
    return collections[collecName];
  }

  async function queryAllDocument<T extends NotNeedScope>(collecName: T);
  async function queryAllDocument<T extends Exclude<CollectionName, NotNeedScope>>(
    collecName: T,
    gameInstanceId: string
  );
  async function queryAllDocument<T extends CollectionName>(
    collecName: T,
    gameInstanceId?: string
  ) {
    const targetCollection = collections[collecName];

    const documents = gameInstanceId
      ? await targetCollection.find({ gameInstanceId }).toArray()
      : await targetCollection.find().toArray();
    const data = transformID(documents as any);
    return data;
  }

  return {
    updateDocument,
    queryDocument,
    queryAllDocument,
    getCharacterInfoById,
    deleteDocument,
    getGameInstanceById,
    insertAsDoc,
    getAllSpellInfo,
    rollDice,
  };
}

type NotNeedScope = "games" | "spells";
