// messageRoutes.js
const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessagesByConversationId,
} = require("../controller/messageController");


// Send message route
router.post("/", sendMessage);
// Get messages by conversation ID route
router.get("/:conversationId", getMessagesByConversationId);

module.exports = router;
