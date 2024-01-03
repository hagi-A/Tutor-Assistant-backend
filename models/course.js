const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
  gradeLevel: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  courses: [
    {
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
      referenceLinks: {
        type: String,
      },
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;


