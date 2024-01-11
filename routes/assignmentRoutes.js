const express = require("express");
const router = express.Router();
const {
  createAssignment,
  getAssignmentsByCourse,
  fetchAssignmentsByTutorId,
} = require("../controller/assignmentController");

// POST /api/quizzes
router.post("/createAssignment", createAssignment);

// GET /api/quizzes/:courseId
router.get("/:courseId", getAssignmentsByCourse);
router.get("/fetchById", fetchAssignmentsByTutorId);

module.exports = router;
