const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const validator = require("validator");


// const mongoosePaginate = require("mongoose-paginate-v2");

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
    enum: ["teacher", "student", "other"],
  },
  location: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  majorTaken: {
    type: String,
  },
  // priceRate: {
  //   type: Number,
  //   required: true,
  // },
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
  selectedCVs: {
    type: String,
    required: true,
  },
  selectedImages: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Accepted", "Denied", "Pending", "Blacklisted"], // Assuming limited status options
    default: "Pending", // Default status for a new tutor
  },
  username: {
    type: String,
    // default: null, // Set the default value to null
  },
  password: {
    type: String,
    // default: null, // Set the default value to null
  },
  selectedRole: {
    type: String,
    default: "Tutor",
    // required: true,
  },
  rank: {
    type: Number,
    min: 1,
    max: 5,
    default: 1, // You can set a default value if needed
  },
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
});

// tutorSchema.plugin(mongoosePaginate);
tutorSchema.statics.tutorlogin = async function (emailOrUsername, password) {
  // if (!emailOrUsername || !password) {
  //   throw Error("All fields must be filled");
  // }

  const tutor = await Tutor.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!tutor) {
    throw Error("Incorrect username or email");
  }

  const match = await bcrypt.compare(password, tutor.password);

  if (!match) {
    throw Error("incorect password");
  }
  return tutor;
};

const Tutor = mongoose.model('Tutor', tutorSchema);
// Tutor.paginate().then({}); //usage
module.exports = Tutor;
 // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // 'User' should match the model name of your User schema
  //   required: true,
  // },