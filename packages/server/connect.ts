import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { CharacterInfo, Message, Scene, SpellInfo, GameInstance } from "@trpg/shared";

interface Document {
  _id: mongoDB.ObjectId;
}
type CharacterDocument = Omit<CharacterInfo, "id"> & Document;
type MessageDocument = Omit<Message, "id"> & Document;
type SpellDocument = Omit<SpellInfo, "id"> & Document;
type SceneDocument = Omit<Scene, "id"> & Document;
type GameDocument = Omit<GameInstance, "id"> & Document;

// 用断言是为了在赋值前导出不会报错。逻辑上应该是能保证先赋值再调用的
export const collections = {} as {
  games: mongoDB.Collection<GameDocument>;
  characters: mongoDB.Collection<CharacterDocument>;
  spells: mongoDB.Collection<SpellDocument>;
  equipments: mongoDB.Collection;
  scenes: mongoDB.Collection<SceneDocument>;
  messages: mongoDB.Collection<MessageDocument>;
};

export async function connectToMongoDB() {
  dotenv.config();
  if (!process.env.DB_CONN_STRING) {
    throw Error("未配置正确的 mongoDB 连接地址");
  }
  if (!process.env.DB_NAME) {
    throw Error("未配置正确的 mongoDB 数据库名称");
  }

  const connString = process.env.DB_CONN_STRING;
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connString);

  await client.connect();
  const db = client.db(process.env.DB_NAME);

  collections.games = db.collection("games");
  collections.characters = db.collection("characters");
  collections.spells = db.collection("spells");
  collections.equipments = db.collection("equipments");
  collections.scenes = db.collection("scenes");
  collections.messages = db.collection("messages");

  console.log(`Successfully connected to database: ${db.databaseName} `);

  return client;
}
