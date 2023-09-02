import type { Collection } from "mongodb";

export function renameKey(collection: Collection<any>) {
  // 重命名键名
  collection.updateMany(
    {},
    {
      $rename: {
        spellsKnown: "spells",
      },
    }
  );
}
