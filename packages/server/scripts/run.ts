import { ObjectId } from "mongodb";
import { connectToMongoDB, collections } from "../src/connect";
import { renameKey } from "./renameKey";
import { ProficiencyObject } from "@trpg/shared";

connectToMongoDB().then((client) => {
  // turnFormat();
  // addProperty();
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

async function turnFormat() {
  const characters = await collections.characters.find({}).toArray();
  characters.forEach((c) => {
    c.backpack =
      c.backpack?.map((e: any) => ({
        id: 0,
        description: e.name + " " + e.description + " ounce:" + e.ounce + " pound:" + e.pound,
        num: e.count,
      })) || [];

    collections.characters.updateOne({ _id: c._id }, { $set: c });
  });
}
