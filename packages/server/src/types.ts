import type {
  CharacterInfo,
  Message,
  SceneInfo,
  SpellInfo,
  GameInstance,
  CanvasMap,
} from "@trpg/shared";

export type AllInfo = CharacterInfo | Message | SpellInfo | SceneInfo | GameInstance | CanvasMap;

export type CollectionName =
  | "characters"
  | "messages"
  | "scenes"
  | "spells"
  | "games"
  | "CanvasMaps";

// export type InfoType<T extends CollectionName> = T extends "characters"
//   ? CharacterInfo
//   : T extends "messages"
//   ? Message
//   : T extends "spells"
//   ? SpellInfo
//   : T extends "scenes"
//   ? SceneInfo
//   : T extends "games"
//   ? GameInstance
//   : CanvasMap;

// export type DocType<T extends CollectionName> = Document<InfoType[T]>;
