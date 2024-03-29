import { Server, Socket } from "socket.io";
import type { CollectionList } from "./dbConnect";
import type { ClientEvents, ServerEvents } from "@trpg/shared";
import logger from "./logger";
import { registerDMSocket } from "./service/registerDMSocket";
import { attachSharedEventToSocket } from "./service/attachSharedEventToSocket";
import { registerPlayerSocket } from "./service/registerPlayerSocket";
import { Db } from "mongodb";

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

const socketToDM = new Map<Socket<ClientEvents, ServerEvents>, { gameInstanceId: string }>();

export function initSocket(collections: CollectionList, db: Db) {
  io.listen(port);
  logger.info(`websocket开始监听${port}端口`);

  io.on("connection", async (socket) => {
    logger.info(`socket connected: ${socket.id}`);
    socketToPlayer.forEach((e) => {
      console.log(e);
    });

    socket.on("signIn: signInAsDM", (gameInstanceId) => {
      logger.info(`signInAsDM, socket: ${socket.id}, gameInstanceId: ${gameInstanceId}`);
      registerDMSocket(socket, gameInstanceId, collections, () => socketToPlayer);
      attachSharedEventToSocket(io, socket, gameInstanceId, collections, db, gameInstanceId, "DM");
      socketToDM.set(socket, { gameInstanceId });
      socket.join(gameInstanceId);
    });

    socket.on("signIn: signInAsPlayer", async (characterId) => {
      logger.info(`signInAsPlayer, socket: ${socket.id}, characterId: ${characterId}`);
      const character = await collections.character.findOne({ _id: characterId });
      if (!character) {
        logger.warn(`客户端上传了不存在的 characterId: ${characterId} `);
        return;
      }

      registerPlayerSocket(socket, character, collections);
      attachSharedEventToSocket(
        io,
        socket,
        character.gameInstanceId,
        collections,
        db,
        character._id,
        character.name
      );
      socketToPlayer.set(socket, { characterId, characterName: character.name });
      socket.join(character.gameInstanceId);
    });
  });
}
