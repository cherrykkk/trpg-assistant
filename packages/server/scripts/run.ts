import { Collection, ObjectId } from "mongodb";
import { CollectionList, useMongoDB } from "../src/dbConnect";
import { ENTITY_DATABASE, createEntityTemplate, SpellDoc } from "@trpg/shared";

useMongoDB().then(({ db }) => {
  // do script，and delete it before submit

  console.log("script done");
});

/**
  remove filed：
  await collections.characters.updateMany({}, { $unset: { location: 1 } });
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
