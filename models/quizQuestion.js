const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
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

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);

module.exports = QuizQuestion;
