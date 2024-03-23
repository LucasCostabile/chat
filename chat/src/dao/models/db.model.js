import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
  user:String,
  message: [String],
  createdAt: { type: Date, default: Date.now }
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export { messageModel };
