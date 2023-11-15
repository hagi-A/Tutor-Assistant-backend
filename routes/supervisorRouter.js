const express = require("express");
const router = express.Router();
const {
  getTutorById,
  updateTutor,
} = require("../controller/supervisorController");

// GET tutor by ID
router.get("/tutorProfile/:id", getTutorById);
// Update tutor's grade level
router.put("/updateTutorGradeLevel/:id", updateTutor);

// Add other tutor-related routes as needed

module.exports = router;
