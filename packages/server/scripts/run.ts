import { ObjectId } from "mongodb";
import { connectToMongoDB, collections } from "../connect";
import { renameKey } from "./renameKey";

connectToMongoDB().then((client) => {
  addProperty();
  // addGameInstance();
});

function addProperty() {
  collections.messages.updateMany(
    {},
    {
      $set: {
        gameInstanceId: "6446094202fe8565888799c3",
      },
    }
  );
}

function addGameInstance(gameInstanceName: string = "新建游戏实例") {
  return collections.games.insertOne({
    _id: new ObjectId(),
    name: gameInstanceName,
    description: "",
  });
}
