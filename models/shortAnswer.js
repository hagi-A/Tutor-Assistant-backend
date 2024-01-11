// models/ShortAnswer.js
const mongoose = require("mongoose");

const shortAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    // Add any other constraints as needed
  },
});

const ShortAnswer = mongoose.model("ShortAnswer", shortAnswerSchema);

module.exports = ShortAnswer;
