const mongoose = require("mongoose");

const assignmentQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const AssignmentQuestion = mongoose.model(
  "AssignmentQuestion",
  assignmentQuestionSchema
);

module.exports = AssignmentQuestion;
