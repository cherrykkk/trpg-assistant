import type { CharacterInfo, Message, Scene, SpellInfo, GameInstance } from "@trpg/shared";
import type { ObjectId } from "mongodb";

export type Document<T extends AllInfo> = Omit<T, "id"> & {
  _id: ObjectId;
};

export type AllInfo = CharacterInfo | Message | SpellInfo | Scene | GameInstance;

export type DatabaseName = "characters" | "messages" | "scenes" | "spells" | "games";

export type DatabaseToInfo<T extends DatabaseName> = T extends "characters"
  ? CharacterInfo
  : T extends "messages"
  ? Message
  : T extends "spells"
  ? SpellInfo
  : T extends "scenes"
  ? Scene
  : GameInstance;
