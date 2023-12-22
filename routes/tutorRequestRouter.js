const express = require("express");
const { createTutorRequest } = require("../controller/tutorRequestController");

const router = express.Router();

// Endpoint for creating a new tutor request
router.post("/studentTutorRequest", createTutorRequest);

module.exports = router;
