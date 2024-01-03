const express = require("express");
const { adminRegister, adminLogin } = require("../controller/adminAuthController");
// const {
//   adminAuthMiddleware,
//   adminMiddleware,
//   supervisorMiddleware,
// } = require("../middleware/adminAuthMiddleware");

const router = express.Router();

router.post("/adminRegister", adminRegister);
router.post("/adminLogin", adminLogin);

// router.get(
//   "/admin-protected",
//   adminAuthMiddleware,
//   adminMiddleware,
//   (req, res) => {
//     res.json({ message: "Admin access granted" });
//   }
// );

// router.get(
//   "/supervisor-protected",
//   adminAuthMiddleware,
//   supervisorMiddleware,
//   (req, res) => {
//     res.json({ message: "Supervisor access granted" });
//   }
// );

module.exports = router;
