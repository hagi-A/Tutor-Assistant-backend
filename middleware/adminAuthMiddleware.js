const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.SECRET);

      req.admin = await Admin.findById(decoded._id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };

// const jwt = require("jsonwebtoken");
// const Admin = require("../models/adminModel");

// const adminAuthMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, process.env.SECRET);
//     const admin = await Admin.findOne({ _id: decoded.id, role: decoded.role });

//     if (!admin) {
//       throw new Error();
//     }

//     req.admin = admin;
//     req.token = token;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Please authenticate" });
//   }
// };

// const adminMiddleware = (req, res, next) => {
//   if (req.admin.role !== "admin") {
//     return res.status(403).json({ error: "Access denied" });
//   }
//   next();
// };

// const supervisorMiddleware = (req, res, next) => {
//   if (req.admin.role !== "supervisor") {
//     return res.status(403).json({ error: "Access denied" });
//   }
//   next();
// };

// module.exports = { adminAuthMiddleware, adminMiddleware, supervisorMiddleware };
