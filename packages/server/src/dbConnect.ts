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
    game: db.collection<GameInstance>("game"),
    character: db.collection<CharacterInfo>("character"),
    scene: db.collection<SceneInfo>("scene"),
    message: db.collection<Message>("message"),
    canvasMap: db.collection<CanvasMap>("canvasMap"),
    blobs: db.collection<ResourceBlobEntity>("blobs"),
    entity: db.collection<EntityInfo>("entity"),
    feature: db.collection<FeatureInfo>("feature"),
  };

  logger.info(`Successfully connect to database: ${db.databaseName} `);

  return { collections, client, db };
}

export type CollectionList = Awaited<ReturnType<typeof useMongoDB>>["collections"];
