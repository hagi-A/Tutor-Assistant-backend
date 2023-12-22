const express = require("express");
const router = express.Router();
const {
  getTutorById,
  updateTutor,
  handleCourseRequest,
  getNotifications,
  getTutorNotifications,
} = require("../controller/supervisorController");

// GET tutor by ID
router.get("/tutorProfile/:id", getTutorById);
// Update tutor's grade level
router.put("/updateTutorGradeLevel/:id", updateTutor);
// Get notifications for the supervisor
router.get('/notifications', getNotifications);
// Get tutor-specific notifications for the supervisor
router.get('/tutor-notifications/:tutorId', getTutorNotifications);
// Approve or deny a course request
router.put('/courseRequest/:requestId/:action', handleCourseRequest);

// Add other tutor-related routes as needed

module.exports = router;
