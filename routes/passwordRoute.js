// routes/passwordRoutes.js

const express = require("express");
const router = express.Router();
const passwordController = require("../controller/passwordController");

router.post("/forgot-password", passwordController.handlePasswordResetRequest);

module.exports = router;
