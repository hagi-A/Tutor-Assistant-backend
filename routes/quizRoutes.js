const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getQuizzesByCourse,
} = require("../controller/quizController");

// POST /api/quizzes
router.post("/createQuiz", createQuiz);

// GET /api/quizzes/:courseId
router.get("/:courseId", getQuizzesByCourse);

module.exports = router;
