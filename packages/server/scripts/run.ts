import { Collection } from "mongodb";
import { useMongoDB } from "../src/connect";
import { renameKey } from "./renameKey";

useMongoDB().then(({ collections }) => {
  // turnFormat(collections.messages);
  // turnFormat(collections.characters);
  // turnFormat(collections.equipments);
  // turnFormat(collections.games);
  // turnFormat(collections.scenes);
  renameKey(collections.characters);
});

async function turnFormat(collection: Collection<any>) {
  const docs = await collection.find().toArray();

  collection.deleteMany();
  docs.forEach((d) => {
    console.log(typeof d._id, d._id.toString());
    if (typeof d._id !== "string") {
      collection.insertOne({
        ...d,
        //@ts-ignore
        _id: d._id.toString(),
      });
    } else {
      collection.insertOne(d);
    }
  });
}
