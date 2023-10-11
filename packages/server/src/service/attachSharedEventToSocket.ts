import type { ClientEvents, ServerEvents } from "@trpg/shared";
import { Server, Socket } from "socket.io";
import { CollectionList } from "../dbConnect";
import { ObjectId } from "mongodb";
import { resolveChangeLog } from "./resolveChangeLog";

export function attachSharedEventToSocket(
  io: Server<ClientEvents, ServerEvents>,
  socket: Socket<ClientEvents, ServerEvents>,
  gameInstanceId: string,
  collections: CollectionList
) {
  socket.on("operator: rollDice", async (characterId, diceType) => {
    let characterName = "DM";
    if (characterId !== "DM") {
      const characterInfo = await collections.characters.findOne({ _id: characterId });
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

    await writeMessage(collections.messages, gameInstanceId, diceResultMessage);

    broadcastMessages(gameInstanceId);
  });

  socket.on("message: sendMessage", (message) => {
    writeMessage(collections.messages, gameInstanceId, message);
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

  socket.on("operator: updateEntityInfo", async (data, changerId, changerName) => {
    const newDoc = resolveChangeLog(data, changerId, changerName);

    if (!newDoc._id) {
      newDoc._id = new ObjectId().toString();
      collections.entities.insertOne(newDoc);
    } else {
      collections.entities.updateOne({ _id: newDoc._id }, { $set: newDoc });
    }

    const docs = await collections.entities.find().toArray();
    socket.emit("data: allEntityInfo", docs);
    socket.to(gameInstanceId).emit("data: allEntityInfo", docs);
  });

  socket.on("operator: updateFeatureInfo", (data, changerId, changerName) => {
    const newDoc = resolveChangeLog(data, changerId, changerName);

    if (!newDoc._id) {
      newDoc._id = new ObjectId().toString();
      collections.features.insertOne(newDoc);
    } else {
      collections.features.updateOne({ _id: newDoc._id }, { $set: newDoc });
    }
  });

  function broadcastMessages(gameInstanceId: string) {
    collections.messages
      .find({ gameInstanceId })
      .toArray()
      .then((docs) => {
        io.to(gameInstanceId).emit("data: allMessage", docs);
      });
  }
}

function writeMessage(
  messageCollection: CollectionList["messages"],
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
