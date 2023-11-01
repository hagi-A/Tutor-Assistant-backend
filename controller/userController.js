const User = require('../models/userModel')
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const generateUsername = require("../helpers/usernameGenerator");
const nodemailer = require("nodemailer");

const createToken = (_id, selectedRole) => {
    return jwt.sign({ _id, selectedRole }, process.env.SECRET, { expiresIn: '3d' });
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
    text: `Your generated username is: ${username}`,
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
    const {username, email, password} = req.body

    try{
        const user = await User.login(username, email, password)
         // create a token with user's _id and role
         const selectedRole = user.selectedRole
        const token = createToken({userId: user._id, role: user.selectedRole });
        res.status(200).json({username, token, selectedRole})
        
        console.log(user)
    }catch (error) {
        res.status(400).json({error: error.message })
    } 
}
 
//signup user
const signupUser = async (req, res) => {

    const {firstName, lastName, email, birthdate, password, selectedRole} = req.body
  
  const username = generateUsername(firstName, lastName);
    try{
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
      
        res.status(200).json({username, token})
    }catch (error) {
        res.status(400).json({error: error.message })
    }

    
}

const getUsersExceptUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await Users.find({ _id: { $ne: userId } });

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

module.exports = {
  signupUser,
  loginUser,
  getUsersExceptUserId,
  // allUsers,
  // getAllUser,
  // getUser,
  // searchUsers,
};