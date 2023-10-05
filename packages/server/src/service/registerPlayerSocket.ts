import { CharacterInfo, ClientEvents, ServerEvents } from "@trpg/shared";
import { Socket } from "socket.io";
import { CollectionList } from "../dbConnect";

export function registerPlayerSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  characterInfo: CharacterInfo,
  collections: CollectionList
) {
  sendInitDataToSinglePlayerSocket(socket, characterInfo, collections);
}

async function sendInitDataToSinglePlayerSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  characterInfo: CharacterInfo,
  collections: CollectionList
) {
  socket.emit("data: playerCharacter", characterInfo);

  collections.messages
    .find({ gameInstanceId: characterInfo.gameInstanceId })
    .toArray()
    .then((messages) => {
      socket.emit("data: allMessage", messages);
    });

  try {
    const scene = await collections.scenes.findOne({ _id: characterInfo.locationSceneId });
    const canvasMap = await collections.canvasMaps.findOne({ _id: scene.relatedMapId });
    socket.emit("data: playerCanvasMapData", canvasMap);
  } catch {
    socket.emit("data: playerCanvasMapData", null);
  }
}
