const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  //   quizTitle: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizQuestion",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
  multipleChoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MultipleChoice",
  },
  shortAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortAnswer",
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
  // courseCode: {
  //   type: String,
  //   required: true,
  // },
  // courseTitle: {
  //   type: String,
  //   required: true,
  // },
  // question:  {
  //   type: String,
  //   required: true,
  // },
  // choices: [ {
  //   type: String,
  //   required: true,
  // }],
  // correctAnswer:  {
  //   type: String,
  //   required: true,
  //   },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
