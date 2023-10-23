const express = require("express");

const { requireAuth } = require("../middleware/requireAuth");
const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
  
  
} = require("../controller/chatController");

const router = express.Router();

router.route("/").post(requireAuth, accessChat);
router.route("/").get(requireAuth, fetchChats);
router.route("/group").post(requireAuth, createGroupChat);
router.route("/rename").put(requireAuth, renameGroup);
router.route("/groupremove").put(requireAuth, removeFromGroup);
router.route("/groupadd").put(requireAuth, addToGroup);

module.exports = router;