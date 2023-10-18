import { useMongoDB } from "./dbConnect";
import { initSocket } from "./socket-io";

async function start() {
  try {
    const { collections, db } = await useMongoDB();
    initSocket(collections, db);
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
}

start();
