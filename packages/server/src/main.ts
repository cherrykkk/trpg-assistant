import { useMongoDB } from "./connect";
import { initSocket } from "./socket-io";

async function start() {
  try {
    const { collections } = await useMongoDB();
    initSocket(collections);
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
}

start();
