import { Server, Socket } from "socket.io";
import { type CollectionList } from "./connect";
import type {
  CharacterInfo,
  ClientEvents,
  ResourceType,
  SceneInfo,
  ServerEvents,
} from "@trpg/shared";
import { ObjectId, Binary } from "mongodb";
import logger from "./logger";

const port = 3333;

const io = new Server<ClientEvents, ServerEvents>({
  maxHttpBufferSize: 1e8, // 100 MB
  cors: {
    origin: "*",
  },
});

const socketToPlayer = new Map<
  Socket<ClientEvents, ServerEvents>,
  { characterId: string; characterName: string }
>();
const socketToDM = new Map<Socket<ClientEvents, ServerEvents>, string>();

export function initSocket(collections: CollectionList) {
  io.listen(port);
  logger.info(`websocket开始监听${port}端口`);

  io.on("connection", async (socket) => {
    logger.info(`socket connected: ${socket.id}`);
    socketToPlayer.forEach((e) => {
      console.log(e);
    });

    socket.on("signIn: signInAsDM", (gameInstanceId) => {
      logger.info(`signInAsDM, socket: ${socket.id}, gameInstanceId: ${gameInstanceId}`);
      registerDMSocket(socket, gameInstanceId, collections, { broadcastUpdateToPlayers });
      attachSharedEventToSocket(socket, gameInstanceId, collections);
    });

    socket.on("signIn: signInAsPlayer", async (characterId) => {
      logger.info(`signInAsPlayer, socket: ${socket.id}, characterId: ${characterId}`);
      const character = await collections.characters.findOne({ _id: characterId });
      if (!character) {
        logger.warn(`客户端上传了不存在的 characterId: ${characterId} `);
        return;
      }

      sendInitDataToSinglePlayerSocket(socket, character);
      attachSharedEventToSocket(socket, character.gameInstanceId, collections);
      socketToPlayer.set(socket, { characterId, characterName: character.name });
    });
  });

  async function sendInitDataToSinglePlayerSocket(
    socket: Socket<ClientEvents, ServerEvents>,
    characterInfo: CharacterInfo
  ) {
    socket.emit("data: playerCharacter", characterInfo);

    collections.messages
      .find({ gameInstanceId: characterInfo.gameInstanceId })
      .toArray()
      .then((messages) => {
        socket.emit("data: allMessage", messages);
      });
  }

  function broadcastUpdateToPlayers() {
    socketToPlayer.forEach((e, socket) => {
      collections.characters.findOne({ _id: e.characterId }).then((playerCharacterInfo) => {
        if (playerCharacterInfo) socket.emit("data: playerCharacter", playerCharacterInfo);
      });
    });
  }

  function broadcastSceneMapUpdateToPlayers() {}
}

async function registerDMSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  gameInstanceId: string,
  collections: CollectionList,
  tasks: {
    broadcastUpdateToPlayers: () => void;
  }
) {
  const gameInstance = await collections.games.findOne({ _id: gameInstanceId });
  if (!gameInstance) {
    logger.warn(`客户端上传了不存在的 gameId: ${gameInstanceId} `);
    return;
  }

  socketToDM.set(socket, gameInstanceId);
  sendInitDataToDMSocket(socket, gameInstanceId);
  attachEventToSocket(socket, gameInstanceId);

  // function declaration
  async function sendInitDataToDMSocket(
    socket: Socket<ClientEvents, ServerEvents>,
    gameInstanceId: string
  ) {
    collections.characters
      .find({ gameInstanceId })
      .toArray()
      .then((characterList) => {
        socket.emit("data: allCharactersInfo", characterList);
      });

    sendAllScenesInfo(gameInstanceId, socket);

    collections.messages
      .find({ gameInstanceId })
      .toArray()
      .then((messages) => {
        socket.emit("data: allMessage", messages);
      });

    // collections.otherTypes
    //   .find({ gameInstanceId })
    //   .toArray()
    //   .then((data) => {
    //     socket.emit("data: allOtherTypes", data);
    //   });
  }

  function attachEventToSocket(socket: Socket<ClientEvents, ServerEvents>, gameInstanceId: string) {
    socket.on("operator: createCharacterInfo", async (data) => {
      data.gameInstanceId = gameInstanceId;
      data._id = new ObjectId().toString();
      await collections.characters.insertOne(data);
      const allCharactersInfo = await collections.characters.find({ gameInstanceId }).toArray();
      socket.emit("data: allCharactersInfo", allCharactersInfo);
    });
    socket.on("operator: updateCharacterInfo", async (characterId, characterInfo) => {
      delete characterInfo._id;
      await collections.characters.updateOne({ _id: characterId }, { $set: characterInfo });

      const allCharactersInfo = await collections.characters.find({ gameInstanceId }).toArray();
      tasks.broadcastUpdateToPlayers();
      socket.emit("data: allCharactersInfo", allCharactersInfo);
    });

    socket.on("operator: createSceneInfo", async (data: SceneInfo) => {
      data.gameInstanceId = gameInstanceId;
      data._id = new ObjectId().toString();
      await collections.scenes.insertOne(data);
      sendAllScenesInfo(gameInstanceId, socket);
    });

    socket.on("operator: updateSceneInfo", async (id, data) => {
      delete data._id;
      await collections.scenes.updateOne({ _id: id }, { $set: data });
      sendAllScenesInfo(gameInstanceId, socket);
    });

    socket.on("operator: updateOtherTypes", async (name, data) => {
      await collections.otherTypes.updateOne({ gameInstanceId, name }, { $set: data });
    });

    socket.on("operator: deleteCharacterInfo", async (characterId) => {
      await collections.characters.deleteOne({ _id: characterId });

      const allCharactersInfo = await collections.characters.find({ gameInstanceId }).toArray();
      socket.emit("data: allCharactersInfo", allCharactersInfo);
    });

    socket.on(
      "request: uploadBlob",
      async (resourceType: ResourceType, buffer: Buffer, mimeType: string, cb) => {
        logger.info(`uploadBlob, buffer length: ${buffer.length}`);
        const _id = new ObjectId().toString();
        const binary = new Binary(buffer);
        collections.blobs.insertOne({
          _id,
          resourceType,
          data: binary,
          mimeType,
          gameInstanceId,
        });
        cb(_id);
      }
    );
  }

  function sendAllScenesInfo(gameInstanceId: string, socket: Socket<ClientEvents, ServerEvents>) {
    collections.scenes
      .find({ gameInstanceId })
      .project({ picture: 0, children: 0 })
      .toArray()
      .then((docs: SceneInfo[]) => {
        socket.emit("data: allScenes", docs);
      });
  }
}

function attachSharedEventToSocket(
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

  function broadcastMessages(gameInstanceId: string) {
    collections.messages
      .find({ gameInstanceId })
      .toArray()
      .then((docs) => {
        io.emit("data: allMessage", docs);
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
