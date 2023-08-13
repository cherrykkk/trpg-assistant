import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Document } from "./types";
import { CanvasMap, CharacterInfo, GameInstance, Message, Scene, SpellInfo } from "@trpg/shared";

// 用断言是为了在赋值前导出不会报错。逻辑上应该是能保证先赋值再调用的
export const collections = {} as {
  games: mongoDB.Collection<Document<GameInstance>>;
  characters: mongoDB.Collection<Document<CharacterInfo>>;
  spells: mongoDB.Collection<Document<SpellInfo>>;
  equipments: mongoDB.Collection;
  scenes: mongoDB.Collection<Document<Scene>>;
  messages: mongoDB.Collection<Document<Message>>;
  CanvasMaps: mongoDB.Collection<Document<CanvasMap>>;
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
  collections.CanvasMaps = db.collection("CanvasMaps");

  console.log(`Successfully connected to database: ${db.databaseName} `);

  return client;
}
