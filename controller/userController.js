const User = require('../models/userModel')
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')

const createToken = (_id, selectedRole) => {
    return jwt.sign({ _id, selectedRole }, process.env.SECRET, { expiresIn: '3d' });
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

    const {username, email, birthdate, password, selectedRole} = req.body
        console.log(req.body)
    try{
        const user = await User.signup(username, email, birthdate, password, selectedRole)
        // create a token with user's _id and role
        const token = createToken({ userId: user._id, role: user.selectedRole }); 
        res.status(200).json({username, token})
    }catch (error) {
        res.status(400).json({error: error.message })
    }

    
}

const searchUserUsernames = async (req, res) => {
    const query = req.query.q; // Get the search query from the request query
  
    try {
      const results = await User.find({ username: new RegExp(query, 'i') });
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching for usernames.' });
    }
  };

const allUsers = async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
   res.send(users);
};

module.exports = {
  signupUser,
  loginUser,
  searchUserUsernames,
  allUsers,
};