import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const CharacterInfoSchema = new mongoose.Schema({
  id: Number,
  scope: String,
  name: String,
  titles: String,
  alignment: String,
  sex: String,
  age: Number,
  class: String, //职业
  race: String,
  subRace: String, //亚种
  currentHP: Number,
  maxHP: Number,
  backgroundStory: String,
  技能熟练项: Array,
  experience: Number,
  strength: Number,
  dexterity: Number,
  constitution: Number,
  intelligence: Number,
  wisdom: Number,
  charism: Number,
  equipment: Array,
  spells: Array,
  appearance: String,
  speed: Number,
  location: { sceneName: String, x: Number, y: Number },
});

// console.log("will create Model");
// export const CharacterInfoModel = mongoose.model("characters", CharacterInfoSchema);
