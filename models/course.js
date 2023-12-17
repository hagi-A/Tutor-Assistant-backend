// models/course.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseCode: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  courseObjectives: {
    type: String,
    required: true,
  },
  courseContent: {
    type: String,
    required: true,
  },
//   grade: {
//     type: String,
//     required: true,
//   },
  //   tutor: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Tutor", // Assuming your tutor model is named 'Tutor'
  //     required: true,
  //   },
  price: {
    type: Number,
    required: true,
  },
  resourse: {
    type: String,
    required: true,
  },
  gradeLevel: [
    {
      // name: String,
      type: String,
      // required: true,

      // enum: [
      //   "Kindergarten",
      //   "Elementary",
      //   "Middle School",
      //   "High School",
      //   "College",
      // ],
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
