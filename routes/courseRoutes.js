// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const { addCourse, getAllCourses } = require("../controller/courseController");

// Create a new course
router.post("/addCourse", addCourse);

// Get all courses
router.get("/getCourses", getAllCourses);

module.exports = router;
