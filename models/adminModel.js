const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  selectedRole: { type: String, enum: ["Admin", "Supervisor"], required: true },
});

// Hash password before saving to the database
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (!admin.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  next();
});
adminSchema.statics.signup = async function (
  firstName,
  lastName,
  username,
  email,
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
  if (!email) {
    throw Error("Please Enter your email");
  }
  if (!password) {
    throw Error("Please enter a valid password");
  }
  if (!selectedRole) {
    console.log(selectedRole);
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


  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

//   let defaultStatus = 1; // Default to unauthorized

//   if (selectedRole === "Parent" || selectedRole === "Student") {
//     defaultStatus = 1; // Set to accepted for Parent and Student
//   } else if (selectedRole === "Tutor") {
//     defaultStatus = 0; // Set to denied for Tutor
//   }

  const admin = await this.create({
    firstName,
    lastName,
    username,
    email,
    password: hash,
    selectedRole,
  });

  return admin;
};

adminSchema.statics.login = async function (username, password) {
  // if (!emailOrUsername || !password) {
  //   throw Error("All fields must be filled");
  // }

  const admin = await Admin.findOne({username});

  if (!admin) {
    throw Error("Incorrect username or email");
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    throw Error("incorect password");
  }
  return admin;
};

// Compare hashed password
adminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
adminSchema.methods.updateUserPasswordAndToken = async function (
  newPassword,
  token,
  expiration
) {
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
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
