import { connectToMongoDB } from "./connect";
import { initSocket } from "./socket-io";

connectToMongoDB()
  .then(() => {
    initSocket();
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
