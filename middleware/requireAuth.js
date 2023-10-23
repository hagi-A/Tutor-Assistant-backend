// const jwt = require('jsonwebtoken')
// const User = require('../models/userModel')
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const requireAuth = asyncHandler(async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      // Find the user by ID and attach it to the request
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      req.user = user;
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = { requireAuth };


// const requireAuth = async (req, res, next) => {
//     //verify authentication
//     const { authorization } = req.headers

//     if (!authorization) {
//         return res.status(401).json({error: 'Authorization token required'})
//     }

//     const token = authorization.split(' ')[1]

//     try {
//        const {_id} = jwt.verify(token, process.env.SECRET)

//        req.user = await User.findOne({_id}).select('_id')
//         next();
//     } catch (error) {
//        console.log(error)
//        res.status(401).json({ error: "Request is not authorized" });
//     }
// }

// module.exports = requireAuth;