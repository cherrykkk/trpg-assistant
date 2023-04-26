import { Server, Socket } from "socket.io";
import {
  deleteCharacterInfoById,
  getAllCharactersInfo,
  getAllMessage,
  getAllScenes,
  getAllSpellInfo,
  getCharacterInfoById,
  getGameInstanceById,
  rollDice,
  updateDocument,
  addMessage,
  insertOneDocument,
} from "./taskByMongoDB";
import { CharacterInfo, ClientEvents, Scene, ServerEvents } from "@trpg/shared";

const port = 3333;

const io = new Server<ClientEvents, ServerEvents>({
  cors: {
    origin: "*",
  },
});

const socketToPlayer = new Map<
  Socket<ClientEvents, ServerEvents>,
  { characterId: string; characterName: string }
>();
const socketToDM = new Map<Socket<ClientEvents, ServerEvents>, string>();

export function initSocket() {
  io.listen(port);
  console.log(`websocket开始监听${port}端口`);
}

io.on("connection", async (socket) => {
  socketToPlayer.forEach((e) => {
    console.log(e);
  });

  socket.on("signIn: signInAsDM", (gameId) => {
    const gameInstance = getGameInstanceById(gameId);
    if (!gameInstance) {
      console.log(`客户端上传了不存在的 gameId: ${gameId} `);
      return;
    }

    socketToDM.set(socket, gameId);
    sendInitDataToSingleSocket(socket, gameId);
    attachEventToSocket(socket, gameId);
  });

  socket.on("signIn: signInAsPlayer", async (characterId) => {
    const character = await getCharacterInfoById(characterId);
    if (!character) {
      console.log(`客户端上传了不存在的 characterId: ${characterId} `);
      return;
    }

    sendInitDataToSinglePlayerSocket(socket, character);
    socketToPlayer.set(socket, { characterId, characterName: character.name });
  });
});

async function sendInitDataToSinglePlayerSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  characterInfo: CharacterInfo
) {
  socket.emit("data: playerCharacter", characterInfo);
}

function broadcastUpdateToPlayers() {
  socketToPlayer.forEach((e, socket) => {
    getCharacterInfoById(e.characterId).then((playerCharacterInfo) => {
      socket.emit("data: playerCharacter", playerCharacterInfo);
    });
  });
}

async function sendInitDataToSingleSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  gameInstanceId: string
) {
  const characterList = await getAllCharactersInfo(gameInstanceId);

  getAllScenes(gameInstanceId).then((scenes) => {
    socket.emit("data: allScenes", scenes);
  });

  socket.emit("data: allCharactersInfo", characterList);

  getAllMessage(gameInstanceId).then((messages) => {
    socket.emit("data: allMessage", messages);
  });
  getAllSpellInfo().then((spells) => {
    socket.emit("data: allSpellInfo", spells);
  });
}

function attachEventToSocket(socket: Socket<ClientEvents, ServerEvents>, gameInstanceId: string) {
  socket.on("operator: createCharacterInfo", async (data) => {
    data.gameInstanceId = gameInstanceId;
    await insertOneDocument("characters", data);
    const allCharactersInfo = await getAllCharactersInfo(gameInstanceId);
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  });
  socket.on("operator: updateCharacterInfo", async (characterId, characterInfo) => {
    const result = await updateDocument("characterInfo", characterId, characterInfo);

    const allCharactersInfo = await getAllCharactersInfo(gameInstanceId);
    broadcastUpdateToPlayers();
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  });

  socket.on("operator: createSceneInfo", async (data: Scene) => {
    data.gameInstanceId = gameInstanceId;
    await insertOneDocument("scenes", data);
    sendAllSenesInfo();
  });

  socket.on("operator: updateSceneInfo", async (id, data) => {
    await updateDocument("sceneInfo", id, data);
    sendAllSenesInfo();
  });

  socket.on("operator: updateSpellInfo", async (id, data) => {
    await updateDocument("spellInfo", id, data);

    const allSpellInfo = await getAllSpellInfo();
    socket.emit("data: allSpellInfo", allSpellInfo);
  });

  socket.on("operator: deleteCharacterInfo", async (characterId) => {
    await deleteCharacterInfoById(characterId);
    const allCharactersInfo = await getAllCharactersInfo(gameInstanceId);
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  });

  socket.on("operator: rollDice", async (characterId, diceType) => {
    let characterName = "DM";
    if (characterId !== "DM") {
      const characterInfo = await getCharacterInfoById(characterId);
      characterName = characterInfo.name;
    }

    const result = rollDice(diceType);
    await writeMessage(`${characterName} 投出了(d${diceType}) ${result} `);
    broadcastMessages();
  });

  socket.on("message: sendMessage", (message) => {
    writeMessage(message);
    broadcastMessages();
  });

  function broadcastMessages() {
    getAllMessage(gameInstanceId).then((messages) => {
      io.emit("data: allMessage", messages);
    });
  }
  function writeMessage(messageContent: string) {
    addMessage({ content: messageContent, gameInstanceId, id: "" });
  }
  function sendAllSenesInfo() {
    getAllScenes(gameInstanceId).then((scenes) => {
      socket.emit("data: allScenes", scenes);
    });
  }
}
