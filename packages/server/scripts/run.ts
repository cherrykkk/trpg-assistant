import { Collection } from "mongodb";
import { CollectionList, useMongoDB } from "../src/connect";
import { renameKey } from "./renameKey";
import { CharacterInfo, SceneInfo } from "../../shared/constants";

useMongoDB().then(({ collections }) => {
  removeField(collections);
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

// async function changeSceneFatherFromNameToId(collection: Collection<SceneInfo>) {
//   const docs = await collection.find().toArray();

//   docs.forEach(async (d) => {
//     if (d.father) {
//       const fatherScene = docs.find((d2) => d2.name === d.father);
//       if (fatherScene) {
//         d.fatherId = fatherScene._id;
//         await collection.updateOne({ _id: d._id }, { $set: d });
//         console.log(`${d.name} 已添加 fatherId 为 ${fatherScene._id} 即 ${fatherScene.name}`);
//       } else {
//         console.log(`${d.name} 无法找到 ${d.father} 作为父级`);
//       }
//     }
//   });
// }

async function removeField(collections: CollectionList) {
  await collections.characters.updateMany({}, { $unset: { location: 1 } });
}
