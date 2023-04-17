import { connectToMongoDB, collections } from "../connect";
import { renameKey } from "./renameKey";

connectToMongoDB().then((client) => {

  // 增加属性名
  collections.characters.updateMany({}, {
    $set: {
      spellsKnown: [], spellsPrepared: []
    }
  })
});
