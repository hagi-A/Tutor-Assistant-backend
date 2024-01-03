const express = require("express");
const {
  createTutorRequest,
  getTutorRequests,
  getAllMatchingTutorRequests,
} = require("../controller/tutorRequestController");

const router = express.Router();

// Endpoint for creating a new tutor request
router.post("/:userId", createTutorRequest);

router.get("/viewTutorRequests/:userId", getTutorRequests);
// Route to fetch tutor requests matching tutor's criteria
router.get("/requests/:tutorId", getAllMatchingTutorRequests);

module.exports = router;
