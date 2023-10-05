import type { ClientEvents, ServerEvents } from "@trpg/shared";
import { Socket } from "socket.io";
import { CollectionList } from "../dbConnect";
import { ObjectId } from "mongodb";

export function attachSharedEventToSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  gameInstanceId: string,
  collections: CollectionList
) {
  socket.on("operator: storeAsOtherTypes", (data, _id, name, cb) => {
    if (!_id) _id = new ObjectId().toString();

    cb(_id);

    collections.otherTypes.insertOne({ _id, data, name });
  });

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

  function broadcastMessages(gameInstanceId: string) {
    collections.messages
      .find({ gameInstanceId })
      .toArray()
      .then((docs) => {
        socket.rooms[gameInstanceId].emit("data: allMessage", docs);
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
