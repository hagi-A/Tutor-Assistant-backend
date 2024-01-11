const mongoose = require("mongoose");

const multipleChoiceSchema = new mongoose.Schema({
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

const MultipleChoice = mongoose.model("MultipleChoice", multipleChoiceSchema);

module.exports = MultipleChoice;
