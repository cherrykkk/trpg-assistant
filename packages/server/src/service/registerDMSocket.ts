import { CanvasMap, ClientEvents, ResourceType, SceneInfo, ServerEvents } from "@trpg/shared";
import { Socket } from "socket.io";
import { CollectionList } from "../dbConnect";
import logger from "../logger";
import { Binary, ObjectId } from "mongodb";

const socketToDM = new Map<Socket<ClientEvents, ServerEvents>, string>();

export async function registerDMSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  gameInstanceId: string,
  collections: CollectionList,
  tasks: {
    broadcastUpdateToPlayers: () => void;
  },
  getRelatedPlayerSockets: () => Map<
    Socket<ClientEvents, ServerEvents>,
    { characterId: string; characterName: string }
  >
) {
  socket.join(gameInstanceId);

  const gameInstance = await collections.game.findOne({ _id: gameInstanceId });
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
    collections.character
      .find({ gameInstanceId })
      .toArray()
      .then((characterList) => {
        socket.emit("data: allCharactersInfo", characterList);
      });

    sendAllScenesInfo(gameInstanceId, socket);

    collections.message
      .find({ gameInstanceId })
      .toArray()
      .then((messages) => {
        socket.emit("data: allMessage", messages);
      });

    collections.canvasMap
      .find({ gameInstanceId })
      .toArray()
      .then((data) => {
        socket.emit("data: allCanvasMap", data);
      });
  }

  function attachEventToSocket(socket: Socket<ClientEvents, ServerEvents>, gameInstanceId: string) {
    socket.on("operator: createCharacterInfo", async (data) => {
      data.gameInstanceId = gameInstanceId;
      data._id = new ObjectId().toString();
      await collections.character.insertOne(data);
      const allCharactersInfo = await collections.character.find({ gameInstanceId }).toArray();
      socket.emit("data: allCharactersInfo", allCharactersInfo);
    });
    socket.on("operator: updateCharacterInfo", async (characterId, characterInfo) => {
      delete characterInfo._id;
      await collections.character.updateOne({ _id: characterId }, { $set: characterInfo });

      const allCharactersInfo = await collections.character.find({ gameInstanceId }).toArray();
      tasks.broadcastUpdateToPlayers();
      socket.emit("data: allCharactersInfo", allCharactersInfo);
    });

    socket.on("operator: createSceneInfo", async (data: SceneInfo) => {
      data.gameInstanceId = gameInstanceId;
      data._id = new ObjectId().toString();
      await collections.scene.insertOne(data);
      sendAllScenesInfo(gameInstanceId, socket);
    });

    socket.on("operator: updateSceneInfo", async (id, data) => {
      delete data._id;
      await collections.scene.updateOne({ _id: id }, { $set: data });
      sendAllScenesInfo(gameInstanceId, socket);
    });

    socket.on("operator: deleteCharacterInfo", async (characterId) => {
      await collections.character.deleteOne({ _id: characterId });

      const allCharactersInfo = await collections.character.find({ gameInstanceId }).toArray();
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

    socket.on("operator: updateCanvasMap", (data, cb) => {
      if (!data._id) {
        data._id = new ObjectId().toString();
        data.gameInstanceId = gameInstanceId;
        collections.canvasMap.insertOne(data);

        cb?.(data._id);
      } else {
        collections.canvasMap.updateOne({ _id: data._id }, { $set: data });
      }

      broadcastCanvasMapToPlayers(data, collections, getRelatedPlayerSockets());
    });
  }

  function sendAllScenesInfo(gameInstanceId: string, socket: Socket<ClientEvents, ServerEvents>) {
    collections.scene
      .find({ gameInstanceId })
      .project({ picture: 0, children: 0 })
      .toArray()
      .then((docs: SceneInfo[]) => {
        socket.emit("data: scene", docs);
      });
  }
}

async function broadcastCanvasMapToPlayers(
  canvasMap: CanvasMap,
  collections: CollectionList,
  playerSockets: Map<
    Socket<ClientEvents, ServerEvents>,
    { characterId: string; characterName: string }
  >
) {
  const relatedScenes = await collections.scene.find({ relatedMapId: canvasMap._id }).toArray();
  relatedScenes.forEach(async (scene) => {
    const relatedCharacters = await collections.character
      .find({ locationSceneId: scene._id })
      .toArray();

    playerSockets.forEach((c, s) => {
      if (relatedCharacters.find((r) => r._id === c.characterId)) {
        s.emit("data: playerCanvasMapData", canvasMap);
      }
    });
  });
}
