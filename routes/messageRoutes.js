// // messageRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   sendMessage,
//   getMessagesByConversationId,
// } = require("../controller/messageController");


// // Send message route
// router.post("/", sendMessage);
// // Get messages by conversation ID route
// router.get("/:conversationId", getMessagesByConversationId);

// module.exports = router;


const express = require("express");
const { addMessage, getMessages } = require("../controller/messageController");

const router = express.Router();

router.post("/", addMessage);

router.get("/:chatId", getMessages);

module.exports = router;