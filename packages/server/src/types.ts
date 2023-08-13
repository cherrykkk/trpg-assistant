import type {
  CharacterInfo,
  Message,
  Scene,
  SpellInfo,
  GameInstance,
  CanvasMap,
} from "@trpg/shared";
import type { ObjectId, WithId } from "mongodb";

export type Document<T extends AllInfo> = WithId<Omit<T, "id">>;

export type AllInfo = CharacterInfo | Message | SpellInfo | Scene | GameInstance | CanvasMap;

export type CollectionName =
  | "characters"
  | "messages"
  | "scenes"
  | "spells"
  | "games"
  | "CanvasMaps";

type InfoTypeMap = {
  chatacters: CharacterInfo;
  messages: Message;
  spells: SpellInfo;
  scenes: Scene;
  games: GameInstance;
  CanvasMap: CanvasMap;
};

// export type InfoType<T extends CollectionName> = T extends "characters"
//   ? CharacterInfo
//   : T extends "messages"
//   ? Message
//   : T extends "spells"
//   ? SpellInfo
//   : T extends "scenes"
//   ? Scene
//   : T extends "games"
//   ? GameInstance
//   : CanvasMap;

// export type DocType<T extends CollectionName> = Document<InfoType[T]>;
