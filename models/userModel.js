const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
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
    enum: ["Parent", "Student", "Tutor", "Admin", "Supervisor"],
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// static signup method
userSchema.statics.signup = async function(username, email, birthdate, password, selectedRole) {

    // validation
  if  (!username || !email || !birthdate || !password || !selectedRole) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('password not strong enough')
  }
  const exist = await this.findOne({ username })

  if (exist) {
    throw Error('username already in use')
  }
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }
  const birthYear = new Date(birthdate).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age < 12) {
    throw Error('User is too young to register');
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  

  const user = await this.create({username, email, age, password: hash, selectedRole })

  return user
}

//static login method

userSchema.statics.login = async function(username, email, password) {
    if  (!username || !email || !password) {
        throw Error('All fields must be filled')
      }
  
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect username and email')
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

module.exports = mongoose.model('User', userSchema)