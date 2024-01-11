// models/Assignment.js
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["multipleChoice", "shortAnswer"],
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Assuming time is a string, adjust accordingly
    required: true,
  },
  quizWeight: {
    type: Number,
    required: true,
  },
  passGrade: {
    type: Number,
    required: true,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
