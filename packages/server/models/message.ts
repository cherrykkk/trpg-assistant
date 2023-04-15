import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  message: String,
});

export const MessageModel = mongoose.model("Message", MessageSchema);
