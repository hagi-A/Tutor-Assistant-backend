// models/course.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  instructorInfo: {
    type: String,
    required: true,
  },
  learningObjectives: {
    type: String,
    required: true,
  },
  targetAudience: {
    type: String,
    required: true,
  },
  courseFormat: {
    type: String,
    required: true,
  },
  curriculum: {
    type: String,
    required: true,
  },
  learningResources: {
    type: String,
    required: true,
  },
  assessment: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor", // Assuming your tutor model is named 'Tutor'
    // required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
