// conversationRoutes.js
const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversationsByUserId,
} = require("../controller/conversationController");

// Create conversation route
router.post("/", createConversation);
// Get conversations by user ID route
router.get("/:userId", getConversationsByUserId);

module.exports = router;
