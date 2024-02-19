const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const generateUsername = require("../helpers/usernameGenerator");
const nodemailer = require("nodemailer");

const createToken = (_id, selectedRole) => {
  return jwt.sign({ _id, selectedRole }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

//send email
const sendEmail = async (email, username) => {
  // Nodemailer or email-sending logic implementation
  // Example using nodemailer
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Username Information",
    text: `Great news! 🌈 Your special username has been created just for you: ${username}. 
    🌟 When you embark on your chatting adventure, keep these charming details in mind:    
    Your username: ${username}
    Your secret key: ${username}
    Wishing you delightful conversations and happy moments! 🚀💬`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
// login user
const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    // Find the user by email or username using the custom login method
    const user = await User.login(emailOrUsername, password);
    delete user["password"];
    // create a token with user's _id and role
    const selectedRole = user.selectedRole;
    const token = createToken({ userId: user._id, role: user.selectedRole });
    res.status(200).json({ token, user });

    console.log(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//signup user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, birthdate, password, selectedRole } =
    req.body;
  const username = generateUsername(firstName, lastName);
  try {
    const user = await User.signup(
      firstName,
      lastName,
      username,
      email,
      birthdate,
      password,
      selectedRole
    );
    // create a token with user's _id and role
    const token = createToken({ userId: user._id, role: user.selectedRole });
    await sendEmail(email, username);
    //Sending email with username
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getStudents = async (req, res) => {
  try {
    // Fetch students associated with the tutorId
    const students = await User.find({}, function (err, cursor) {
      cursor.each(function (err, item) {
        console.log(item);
      });
    });
    console.log(students);
    // Return the students in the response
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.send({ error: error });
  }
};
const getUsersExceptUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.find({ _id: { $ne: userId } });
    const usersData = await Promise.all(
      users.map(async (user) => {
        return {
          user: {
            email: user.email,
            username: user.username,
            receiverId: user._id,
          },
        };
      })
    );
    res.status(200).json(usersData);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  signupUser,
  loginUser,
  getUsersExceptUserId,
  getStudents,
};

// allUsers,
// getAllUser,
// getUser,
// searchUsers,
// const searchUserUsernames = async (req, res) => {
//     const query = req.query.q; // Get the search query from the request query

//     try {
//       const results = await User.find({ username: new RegExp(query, 'i') });
//       res.json(results);
//     } catch (error) {
//       res.status(500).json({ error: 'An error occurred while searching for usernames.' });
//     }
//   };

// const allUsers = async (req, res) => {
//     const keyword = req.query.search
//       ? {
//           $or: [
//             { username: { $regex: req.query.search, $options: "i" } },
//             { email: { $regex: req.query.search, $options: "i" } },
//           ],
//         }
//       : {};

//    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
//    res.send(users);
// };

// const getAllUser = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const searchUsers = async (req, res) => {
//   const { query } = req.query;

//   try {
//     // Search for users by name or username using a regular expression
//     const users = await User.find({
//       $or: [
//         { username: { $regex: query, $options: "i" } }, // Case-insensitive search
//         { email: { $regex: query, $options: "i" } },
//       ],
//     });

//     res.json(users);
//   } catch (error) {
//     console.error("Error searching for users:", error);
//     res.status(500).json({ message: "Failed to search for users" });
//   }
// };

// const getUser = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   try {
//     const users = await User.paginate({}, { page, limit });
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
