const mongoose = require('mongoose')

const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema

const tutorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profession: {
    type: String,
    required: true,
    enum: [
      "teacher",
      "student",
      "other",
    ],
  },
  location: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  ueeeResult: {
    type: Number, // or Number, depending on your data
  },
  majorTaken: {
    type: String,
  },
  cgpa: {
    type: Number, // or Number, depending on your data
  },
  priceRate: {
    type: Number,
    required: true,
  },
  gradeLevel: {
    type: String,
    required: true,
    enum: [
      "Kindergarten",
      "Elementary",
      "Middle School",
      "High School",
      "College",
    ],
  },
  selectedCVs: {
    type: String,
    required: true,
  },
  selectedImages: {
    type: String,
    required: true,
  },
});

// tutorSchema.plugin(mongoosePaginate);

const Tutor = mongoose.model('Tutor', tutorSchema);
// Tutor.paginate().then({}); //usage
module.exports = Tutor;
 // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // 'User' should match the model name of your User schema
  //   required: true,
  // },