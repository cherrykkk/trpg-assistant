import { connectToMongoDB } from "../connect";
import { renameKey } from "./renameKey";

connectToMongoDB().then((client) => {
  const db = client.db(process.env.DB_NAME);
  renameKey(db.collection("spells"));
});
