import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import type {
  CanvasMap,
  CharacterInfo,
  EntityInfo,
  FeatureInfo,
  GameInstance,
  Message,
  ResourceBlobEntity,
  SceneInfo,
  SpellInfo,
} from "@trpg/shared";
import logger from "./logger";

export async function useMongoDB() {
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

  const collections = {
    games: db.collection<GameInstance>("games"),
    characters: db.collection<CharacterInfo>("characters"),
    spells: db.collection<SpellInfo>("spells"),
    equipments: db.collection("equipments"),
    scenes: db.collection<SceneInfo>("scenes"),
    messages: db.collection<Message>("messages"),
    canvasMaps: db.collection<CanvasMap>("canvasMaps"),
    blobs: db.collection<ResourceBlobEntity>("blobs"),
    entities: db.collection<EntityInfo>("entities"),
    features: db.collection<FeatureInfo>("features"),
  };

  logger.info(`Successfully connect to database: ${db.databaseName} `);

  return { collections, client };
}

export type CollectionList = Awaited<ReturnType<typeof useMongoDB>>["collections"];
