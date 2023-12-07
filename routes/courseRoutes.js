// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const { createCourse, getAllCourses } = require("../controller/courseController");

// Create a new course
router.post("/addCourse", createCourse);

// Get all courses
router.get("/getCourses", getAllCourses);

module.exports = router;
