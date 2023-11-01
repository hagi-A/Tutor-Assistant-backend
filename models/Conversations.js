const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;

// //chatName//isGroupChat//users//latestMEssage//Groupamdin
// const mongoose = require('mongoose')

// const chatModel = mongoose.Schema(
//   {
//     chatName: { type: String, trim: true },
//     isGroupChat: { type: Boolean, default: false },
//     users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     latestMessage: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Message",
//     },
//     groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   },
//   { timestamps: true }
// );

// const Chat = mongoose.model("CHat", chatModel);

// module.exports = Chat;
