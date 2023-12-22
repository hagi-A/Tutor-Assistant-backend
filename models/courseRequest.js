// models/CourseRequest.js
const mongoose = require("mongoose");

const courseRequestSchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const CourseRequest = mongoose.model("CourseRequest", courseRequestSchema);

module.exports = CourseRequest;
