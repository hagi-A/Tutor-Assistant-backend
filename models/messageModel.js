const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;

// const mongoose = require("mongoose");

// const messageSchema = mongoose.Schema({
//   conversationId: {
//     type: String,
//   },
//   senderId: {
//     type: String,
//   },
//   message: {
//     type: String,
//   },
// });

// const Messages = mongoose.model("Message", messageSchema);

// module.exports = Messages;

// const mongoose = reaquire("mongoose");

// const messageSchema = mongoose.Schema(
//   {
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     content: { type: String, trim: true },
//     chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
//     readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", messageSchema);
// module.exports = Message;
