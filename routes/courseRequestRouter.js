// routes/courseRequest.js
const express = require("express");
const router = express.Router();
const {
  createCourseRequest,
  getAllCourseRequests,
  updateCourseRequestStatus,
} = require("../controller/courseRequestController");

// Create a new course request
router.post("/request", createCourseRequest);

// Get all course requests
router.get("/requests", getAllCourseRequests);

// Update the status of a course request
router.put("/request/:id", updateCourseRequestStatus);

module.exports = router;
