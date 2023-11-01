// messageController.js
const Conversations = require("../models/Conversations");
const Messages = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;

    if (!senderId || !message) {
      return res.status(400).send("Please fill all required fields");
    }

    if (conversationId === "new" && receiverId) {
      const newConversation = new Conversations({
        members: [senderId, receiverId],
      });
      await newConversation.save();

      const newMessage = new Messages({
        conversationId: newConversation._id,
        senderId,
        message,
      });
      await newMessage.save();

      return res.status(200).send("Message sent successfully");
    } else if (!conversationId || !receiverId) {
      return res.status(400).send("Please fill all required fields");
    }

    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();

    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
};

const getMessagesByConversationId = async (req, res) => {
  try {
    const checkMessages = async (conversationId) => {
      console.log(conversationId, "conversationId");
      const messages = await Messages.find({ conversationId });
      const messageUserData = await Promise.all(
        messages.map(async (message) => {
          const user = await User.findById(message.senderId);
          return {
            user: { id: user._id, email: user.email, username: user.username },
            message: message.message,
          };
        })
      );
      res.status(200).json(messageUserData);
    };

    const conversationId = req.params.conversationId;

    if (conversationId === "new") {
      const checkConversation = await Conversations.find({
        members: { $all: [req.query.senderId, req.query.receiverId] },
      });

      if (checkConversation.length > 0) {
        checkMessages(checkConversation[0]._id);
      } else {
        return res.status(200).json([]);
      }
    } else {
      checkMessages(conversationId);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { sendMessage, getMessagesByConversationId };