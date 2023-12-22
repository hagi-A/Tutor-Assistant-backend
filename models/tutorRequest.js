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
  },
  ageGroup: {
    type: String,
    required: true,
  },
});

const TutorRequest = mongoose.model("TutorRequest", tutorRequestSchema);

module.exports = TutorRequest;
