import type {
  BasicCollectionStructure,
  ClientEvents,
  CollectionKey,
  ServerEvents,
} from "@trpg/shared";
import { BroadcastOperator, Server, Socket } from "socket.io";
import { CollectionList } from "../dbConnect";
import { Db, ObjectId } from "mongodb";
import { resolveChangeLog } from "./resolveChangeLog";

export function attachSharedEventToSocket(
  io: Server<ClientEvents, ServerEvents>,
  socket: Socket<ClientEvents, ServerEvents>,
  gameInstanceId: string,
  collections: CollectionList,
  db: Db,
  changerId: string,
  changerName: string
) {
  registerDbChanger(
    ["character", "entity", "feature", "game", "scene"],
    db,
    socket,
    io.to(gameInstanceId),
    changerId,
    changerName
  );

  socket.on("operator: rollDice", async (characterId, diceType) => {
    let characterName = "DM";
    if (characterId !== "DM") {
      const characterInfo = await collections.character.findOne({ _id: characterId });
      if (!characterInfo) return;
      characterName = characterInfo.name;
    }

    function rollDice(diceType: number) {
      return Math.ceil(Math.random() * diceType);
    }

    let diceResultMessage = "";
    if (typeof diceType === "number") {
      const result = rollDice(diceType);
      diceResultMessage = `${characterName} 投出了(d${diceType}) ${result} `;
    } else if (Array.isArray(diceType)) {
      if (diceType.length === 0) return;
      if (diceType.length === 1) {
        const result = rollDice(diceType[0]);
        diceResultMessage = `${characterName} 投出了(d${diceType}) ${result} `;
      } else {
        const results = diceType.map((d) => rollDice(d));
        diceResultMessage = `${characterName} 投出了(${diceType
          .map((d, i) => `d${d}`)
          .join("+")}) ${results.join("+")}=${results.reduce((a, b) => a + b)} `;
      }
    } else {
      return;
    }

    await writeMessage(collections.message, gameInstanceId, diceResultMessage);

    broadcastMessages(gameInstanceId);
  });

  socket.on("request: downloadBlob", async (key: string, cb) => {
    const doc = await collections.blobs.findOne({ _id: key });
    if (doc) {
      cb({ ...doc, data: doc.data.buffer });
    } else {
      cb(null);
    }
  });

  function broadcastMessages(gameInstanceId: string) {
    collections.message
      .find({ gameInstanceId })
      .toArray()
      .then((docs) => {
        io.to(gameInstanceId).emit("data: allMessage", docs);
      });
  }
}

function writeMessage(
  messageCollection: CollectionList["message"],
  gameInstanceId: string,
  messageContent: string
) {
  messageCollection.insertOne({
    content: messageContent,
    gameInstanceId,
    _id: new ObjectId().toString(),
    time: new Date().toLocaleString(),
  });
}

export function registerDbChanger(
  shareList: CollectionKey[],
  db: Db,
  socket: Socket<ClientEvents, ServerEvents>,
  broadcastOperator: BroadcastOperator<ServerEvents, ClientEvents>,
  changerId: string,
  changerName: string
) {
  shareList.forEach(async (key) => {
    socket.on(`update: ${key}`, async (doc) => {
      doc = resolveChangeLog(doc, changerId, changerName);

      if (!doc._id) {
        doc._id = new ObjectId().toString();
        db.collection<BasicCollectionStructure>(key).insertOne(doc);
      } else {
        db.collection<BasicCollectionStructure>(key).updateOne({ _id: doc._id }, { $set: doc });
      }

      const docs = await db.collection(key).find().toArray();
      broadcastOperator.emit(`data: ${key}`, docs as any[]);
    });

    const docs = await db.collection(key).find().toArray();
    socket.emit(`data: ${key}`, docs as any[]);
  });
}
