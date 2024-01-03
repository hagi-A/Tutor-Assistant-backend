const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// const generateToken = (admin) => {
//   return jwt.sign({ id: admin._id, role: admin.role }, process.env.SECRET, {
//     expiresIn: "1h",
//   });
// };
// const createToken = ({ adminId, selectedRole }) => {
//   return jwt.sign({ _id: adminId, selectedRole }, process.env.SECRET, {
//     expiresIn: "3d",
//   });
// };
const createToken = (_id, selectedRole) => {
  return jwt.sign({ _id, selectedRole }, process.env.SECRET, {
    expiresIn: "3d",
  });
};


const adminRegister = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, selectedRole } =
      req.body;
    const admin = new Admin({
      firstName,
      lastName,
      username,
      email,
      password,
      selectedRole,
    });
    await admin.save();

    const token = createToken({
      adminId: admin._id,
      selectedRole: admin.selectedRole,
    });

    res.status(201).json({ username, token });
    console.log(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by email or username using the custom login method
    const admin = await Admin.login(username, password);
    delete admin["password"];
    // create a token with user's _id and role
    const selectedRole = admin.selectedRole;
    console.log("Selected Role:", admin.selectedRole);
    console.log("Admin ID:", admin._id);

    // const token = createToken({
    //   adminId: admin._id,
    //   selectedRole: admin.selectedRole,
    
      const token = createToken({
        adminId: admin._id,
        role: admin.selectedRole,
      });
    // });
    // const token = createToken(admin._id, admin.selectedRole);

    res.status(200).json({ token, admin, selectedRole: admin.selectedRole });

    console.log(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
}; 

module.exports = {
  adminRegister,
  adminLogin,
};
