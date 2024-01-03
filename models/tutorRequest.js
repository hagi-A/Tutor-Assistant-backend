// models/TutorRequest.js
const mongoose = require("mongoose");

const tutorRequestSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  grade: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: String,
      required: true,
    },
  ],
  profession: {
    type: String,
    required: true,
    enum: ["teacher", "student", "other"],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   ageGroup: {
  //     type: String,
  //     enum: ["19-22", "23-26", "27-30", "31-34", "35-above"],
  //     required: true,
  //   },
});

const TutorRequest = mongoose.model("TutorRequest", tutorRequestSchema);

module.exports = TutorRequest;
