import { test, expect } from "vitest";
import { useTask } from "../taskByMongoDB";
import { connectToMongoDB, collections } from "../connect";
const gameInstanceId = "6446094202fe8565888799c3";

test("db data", async () => {
  await connectToMongoDB();
  const tasks = useTask(collections);

  const characterList = await tasks.queryAllDocument("characters", gameInstanceId);
  expect(characterList.length).toBeGreaterThan(0);
});
