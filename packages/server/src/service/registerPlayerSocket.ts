import { CharacterDoc, ClientEvents, ServerEvents } from "@trpg/shared";
import { Socket } from "socket.io";
import { CollectionList } from "../dbConnect";

export function registerPlayerSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  characterInfo: CharacterDoc,
  collections: CollectionList
) {
  sendInitDataToSinglePlayerSocket(socket, characterInfo, collections);
}

async function sendInitDataToSinglePlayerSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  characterInfo: CharacterDoc,
  collections: CollectionList
) {
  socket.join(characterInfo.gameInstanceId);

  socket.emit("data: playerCharacter", characterInfo);

  collections.message
    .find({ gameInstanceId: characterInfo.gameInstanceId })
    .toArray()
    .then((messages) => {
      socket.emit("data: message", messages);
    });

  try {
    const scene = await collections.scene.findOne({ _id: characterInfo.locationSceneId });
    const canvasMap = await collections.canvasMap.findOne({ _id: scene.relatedMapId });
    socket.emit("data: playerCanvasMapData", canvasMap);
  } catch {
    socket.emit("data: playerCanvasMapData", null);
  }
}
