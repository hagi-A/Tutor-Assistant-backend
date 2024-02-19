const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  selectedRole: {
    type: String,
    enum: ["Parent", "Student"],
    required: true,
  },
  token: {
    //added
    type: String,
  },

  status: {
    type: Number,
    required: true,
    enum: [0, 1, 2], // 0: Denied, 1: Accepted, 2: Unauthorized
  },
  chatUsername: {
    type: String,
    // default: null, // Set the default value to null
  },
  chatSecret: {
    type: String,
    // default: null, // Set the default value to null
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  username,
  email,
  birthdate,
  password,
  selectedRole
) {
  // Validation
  if (!firstName) {
    throw Error("Please enter your First Name");
  }
  if (!lastName) {
    throw Error("Please enter your last name");
  }
  if (!email 
  ) {
    throw Error("Please Enter your email");
  }
  if (
    !birthdate
  ) {
    throw Error("Please select your birthday");
  }
  if (!password) {
    throw Error("Please enter a valid password");
  }
  if (!selectedRole) {
    console.log(selectedRole)
    throw Error("Select your role");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already in use");
  }
  const birthYear = new Date(birthdate).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  if (age < 12) {
    throw Error("User is too young to register");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  let defaultStatus = 1; // Default to unauthorized
  if (selectedRole === "Parent" || selectedRole === "Student") {
    defaultStatus = 1; // Set to accepted for Parent and Student
  } else if (selectedRole === "Tutor") {
    defaultStatus = 0; // Set to denied for Tutor
  }
  const user = await this.create({
    firstName,
    lastName,
    username,
    email,
    age,
    password: hash,
    selectedRole,
    status: defaultStatus,
  });

  return user;
};
//static login method
userSchema.statics.login = async function(emailOrUsername, password) {
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });
  if (!user) {
    throw Error('Incorrect username or email')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('incorect password')
  }
  return user
}
// Extend the User model with custom methods
userSchema.methods.generateRandomPassword = function (length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};
userSchema.methods.updateUserPasswordAndToken = async function (newPassword, token, expiration) {
  try {
    // Hash and update the user's password in the database
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(newPassword, salt);

    // Update the reset password token and expiration time
    this.resetPasswordToken = token;
    this.resetPasswordExpires = expiration;

    await this.save();
  } catch (error) {
    throw error;
  }
};
userSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', userSchema)
module.exports = User;
