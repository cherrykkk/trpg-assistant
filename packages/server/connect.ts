import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// 用断言是为了在赋值前导出不会报错。逻辑上应该是能保证先赋值再调用的
export const collections = {} as {
  games: mongoDB.Collection;
  characters: mongoDB.Collection;
  spells: mongoDB.Collection;
  equipments: mongoDB.Collection;
  scenes: mongoDB.Collection;
  messages: mongoDB.Collection;
};

export async function connectToMongoDB() {
  dotenv.config();

  const connString = process.env.DB_CONN_STRING;
  if (!connString) throw Error("未配置正确的 mongoDB 连接地址");
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connString);

  await client.connect();
  const db = client.db(process.env.DB_NAME);

  collections.characters = db.collection("characters");
  collections.spells = db.collection("spells");
  collections.equipments = db.collection("equipments");
  collections.scenes = db.collection("scenes");
  collections.messages = db.collection("messages");

  console.log(`Successfully connected to database: ${db.databaseName} `);

  return client;
}
