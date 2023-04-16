import { Server, Socket } from "socket.io";
import {
  createCharacterInfo,
  deleteCharacterInfoById,
  getAllCharactersInfo,
  getAllMessage,
  getAllScenes,
  getAllSpellInfo,
  getCharacterInfoById,
  getUserAccountInfo,
  rollDice,
  updateDocument,
  writeMessage,
} from "./taskByMongoDB";
import { ClientEvents, ServerEvents } from "@trpg/shared";

const port = 3333;

const io = new Server<ClientEvents, ServerEvents>({
  cors: {
    origin: "*",
  },
});

const userToSocket = new Map<string, Socket>();

export function initSocket() {
  io.listen(port);
  console.log(`websocket开始监听${port}端口`);
}

io.on("connection", async (socket) => {
  userToSocket.set("player1", socket);

  sendInitDataToSingleSocket(socket);
  attachEventToSocket(socket);

  socket.on("login: password", (password) => {
    const userAccountInfo = getUserAccountInfo(password);
    return userAccountInfo;
  });

  // socket.on("operator: abilityCheck", async (characterId, ability, skill) => {
  //   const characterInfo = await getCharacterInfoById(characterId);
  //   const abilityValue = characterInfo[ability];
  //   const abilityModifier = Math.floor((abilityValue - 10) / 2);
  //   const rollResult = roll20();

  //   socket.emit(
  //     "message: system",
  //     `${characterInfo.name}的${ability}检定结果为${rollResult + abilityModifier}(${rollResult}${
  //       abilityModifier > 0 ? "+" : "-"
  //     }${abilityModifier})`
  //   );
  // });
});

async function sendInitDataToSingleSocket(socket: Socket<ClientEvents, ServerEvents>) {
  const characterList = await getAllCharactersInfo();

  socket.emit("data: allCharactersInfo", characterList);

  userToSocket.forEach((socket, user) => {
    console.log(user);
  });

  getAllMessage().then((messages) => {
    socket.emit("data: allMessage", messages);
  });
  getAllScenes().then((scenes) => {
    socket.emit("data: allScenes", scenes);
  });
  getAllSpellInfo().then((spells) => {
    socket.emit("data: allSpellInfo", spells);
  });
}

function attachEventToSocket(socket: Socket<ClientEvents, ServerEvents>) {
  socket.on("operator: createCharacterInfo", async (data) => {
    await createCharacterInfo(data);
    const allCharactersInfo = await getAllCharactersInfo();
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  });
  socket.on("operator: updateCharacterInfo", async (characterId, characterInfo) => {
    const result = await updateDocument('characterInfo', characterId, characterInfo);

    const allCharactersInfo = await getAllCharactersInfo();
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  });

  socket.on("operator: updateSceneInfo", async (id, data) => {
    await updateDocument('sceneInfo', id, data)

    const allScenes = await getAllScenes();
    socket.emit("data: allScenes", allScenes);
  })

  socket.on("operator: updateSpellInfo", async (id, data) => {
    await updateDocument('spellInfo', id, data)

    const allSpellInfo = await getAllSpellInfo();
    socket.emit("data: allSpellInfo", allSpellInfo);
  })

  socket.on("operator: deleteCharacterInfo", async (characterId) => {
    await deleteCharacterInfoById(characterId)
    const allCharactersInfo = await getAllCharactersInfo();
    socket.emit("data: allCharactersInfo", allCharactersInfo);
  })

  socket.on("operator: rollDice", async (characterId, diceType) => {
    let characterName = "DM";
    if (characterId !== "DM") {
      const characterInfo = await getCharacterInfoById(characterId);
      characterName = characterInfo.name;
    }

    const result = rollDice(diceType);
    await writeMessage(`${characterName} 投出了(d${diceType}) ${result} `);
    getAllMessage().then((messages) => {
      io.emit("data: allMessage", messages);
    });
  });
}
