import type {
  CanvasMap,
  CharacterInfo,
  Message,
  ResourceBlob,
  ResourceType,
  SceneInfo,
  CollectionKey,
  CollectionStructure,
} from "./dbTypes";

export type ClientEvents = {
  // sign in
  "signIn: signInAsPlayer": (characterId: string) => void;
  "signIn: signInAsDM": (gameId: string) => void;
  // character
  "operator: createCharacterInfo": (value: CharacterInfo) => void;
  "operator: updateCharacterInfo": (characterId: string, value: Partial<CharacterInfo>) => void;
  "operator: deleteCharacterInfo": (characterId: string) => void;
  // scene
  "operator: createSceneInfo": (value: SceneInfo) => void;
  "operator: updateSceneInfo": (id: string, value: Partial<SceneInfo>) => void;
  "operator: deleteSceneInfo": (id: string) => void;
  // image
  "request: uploadBlob": (
    resourceType: ResourceType,
    buffer: ArrayBuffer | Buffer, // 客户端发送时，发送ArrayBuffer, 服务端接收时接收到Buffer
    mimeType: string,
    cb: (key: string) => void
  ) => void;
  "request: downloadBlob": (id: string, cb: (blob: ResourceBlob | null) => void) => void;
  // message
  "message: sendMessage": (message: string) => void;
  // canvasMap
  "operator: updateCanvasMap": (data: CanvasMap, cb?: (_id: string) => void) => void;
  // action
  "operator: rollDice": (characterId: string | "DM", value: number | number[]) => void;
  "operator: abilityCheck": (characterId: string, ability: string, skill: string) => void;
} & {
  [P in CollectionKey as `update: ${P}`]: (doc: CollectionStructure[P]) => void;
};

export type ServerEvents = {
  "data: playerCharacter": (data: CharacterInfo) => void;
  "data: playerCanvasMapData": (data: CanvasMap) => void;
  "data: allCharactersInfo": (data: CharacterInfo[]) => void;
  "data: allMessage": (data: Message[]) => void;
  "data: allCanvasMap": (data: CanvasMap[]) => void;
  "data: image": (key: string, data: string) => void;
  "data: socket": () => void; // todo:  show DM the sockets info
  "message: system": (message: string) => void;
  "message: player": (message: string) => void;
  "message: DM": (message: string) => void;
} & {
  [P in CollectionKey as `data: ${P}`]: (data: CollectionStructure[P][]) => void;
};
