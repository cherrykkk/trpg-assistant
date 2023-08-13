import { Server, Socket } from "socket.io";
import { collections } from "./connect";
import { useTask } from "./taskByMongoDB";
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

const tasks = useTask(collections);

io.on("connection", async (socket) => {
  socketToPlayer.forEach((e) => {
    console.log(e);
  });

  socket.on("signIn: signInAsDM", (gameId) => {
    const gameInstance = tasks.getGameInstanceById(gameId);
    if (!gameInstance) {
      console.log(`客户端上传了不存在的 gameId: ${gameId} `);
      return;
    }

    socketToDM.set(socket, gameId);
    sendInitDataToDMSocket(socket, gameId);
    attachSharedEventToSocket(socket, gameId);
    attachEventToSocket(socket, gameId);
  });

  socket.on("signIn: signInAsPlayer", async (characterId) => {
    const character = await tasks.getCharacterInfoById(characterId);
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
    tasks.getCharacterInfoById(e.characterId).then((playerCharacterInfo) => {
      socket.emit("data: playerCharacter", playerCharacterInfo);
    });
  });
}

async function sendInitDataToDMSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  gameInstanceId: string
) {
  const characterList = await tasks.queryAllDocument("characters", gameInstanceId);

  tasks.queryAllDocument("scenes", gameInstanceId).then((scenes) => {
    socket.emit("data: allScenes", scenes);
  });

  socket.emit("data: allCharactersInfo", characterList);

  tasks.queryAllDocument("messages", gameInstanceId).then((messages) => {
    socket.emit("data: allMessage", messages);
  });
  tasks.queryAllDocument("spells").then((spells) => {
    socket.emit("data: allSpellInfo", spells);
  });
}

function attachSharedEventToSocket(
  socket: Socket<ClientEvents, ServerEvents>,
  gameInstanceId: string
) {
  socket.on("operator: rollDice", async (characterId, diceType) => {
    let characterName = "DM";
    if (characterId !== "DM") {
      const characterInfo = await tasks.getCharacterInfoById(characterId);
      characterName = characterInfo.name;
    }

    const result = tasks.rollDice(diceType);
    await writeMessage(gameInstanceId, `${characterName} 投出了(d${diceType}) ${result} `);
    broadcastMessages(gameInstanceId);
  });

  socket.on("message: sendMessage", (message) => {
    writeMessage(gameInstanceId, message);
    broadcastMessages(gameInstanceId);
  });
}

function attachEventToSocket(socket: Socket<ClientEvents, ServerEvents>, gameInstanceId: string) {
  socket.on("operator: createCharacterInfo", async (data) => {
    data.gameInstanceId = gameInstanceId;
    await tasks.insertAsDoc("characters", data);
    const allCharactersInfo = await tasks.queryAllDocument("characters", gameInstanceId);
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  });
  socket.on("operator: updateCharacterInfo", async (characterId, characterInfo) => {
    const result = await tasks.updateDocument("characters", characterId, characterInfo);

    const allCharactersInfo = await tasks.queryAllDocument("characters", gameInstanceId);
    broadcastUpdateToPlayers();
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  });

  socket.on("operator: createSceneInfo", async (data: Scene) => {
    data.gameInstanceId = gameInstanceId;
    await tasks.insertAsDoc("scenes", data);
    sendAllScenesInfo(gameInstanceId, socket);
  });

  socket.on("operator: updateSceneInfo", async (id, data) => {
    await tasks.updateDocument("scenes", id, data);
    sendAllScenesInfo(gameInstanceId, socket);
  });

  socket.on("operator: updateSpellInfo", async (id, data) => {
    await tasks.updateDocument("spells", id, data);

    const allSpellInfo = await tasks.getAllSpellInfo();
    socket.emit("data: allSpellInfo", allSpellInfo);
  });

  socket.on("operator: deleteCharacterInfo", async (characterId) => {
    await tasks.deleteDocument("characters", characterId);
    const allCharactersInfo = await tasks.queryAllDocument("characters", gameInstanceId);
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  });
}

function broadcastMessages(gameInstanceId: string) {
  tasks.queryAllDocument("messages", gameInstanceId).then((messages) => {
    io.emit("data: allMessage", messages);
  });
}

function writeMessage(gameInstanceId, messageContent: string) {
  tasks.insertAsDoc("messages", { content: messageContent, gameInstanceId, id: "" });
}
function sendAllScenesInfo(gameInstanceId: string, socket: Socket<ClientEvents, ServerEvents>) {
  tasks.queryAllDocument("scenes", gameInstanceId).then((scenes) => {
    socket.emit("data: allScenes", scenes);
  });
}

function broadcastSceneMapUpdateToPlayers() {}
