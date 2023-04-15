export function renameKey(collection) {
  // 重命名键名
  collection.updateMany(
    {},
    {
      $rename: {
        法术说明: "description",
      },
    }
  );
}
