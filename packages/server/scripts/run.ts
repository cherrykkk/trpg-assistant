import { Collection, ObjectId } from "mongodb";
import { CollectionList, useMongoDB } from "../src/dbConnect";

useMongoDB().then(({ db, collections }) => {
  // do script，and delete it before submit

  console.log("script done");
});

/**
  remove filed：
  await collections.characters.updateMany({}, { $unset: { location: 1 } }); 
  ps. the 1 in {location: 1} can be 2 or '' or any, don't matter 
 */

/**
  add key: 
  collection.updateMany(
    {},
    {
      $set: {
        spellsKnown: "spells",
      },
    }
  );
 */

/**
  update document: 
  collection.updateMany(
    {},
    {
      $set: `${newDoc}`
    }
  );
 */

/**
  rename key: 
  collection.updateMany(
    {},
    {
      $rename: {
        spellsKnown: "spells",
      },
    }
  );
 */
