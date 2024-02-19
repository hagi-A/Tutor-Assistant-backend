const express = require("express");
const router = express.Router();
const {
  tutorTotalCount,
  tutorBlacklistCount,
  tutorDenyCount,
  tutorAcceptCount,
} = require("../controller/reportController");


router.post("/tutorTotalCount", tutorTotalCount);
router.post("/tutorBlacklistCount", tutorBlacklistCount);
router.post("/tutorDenyCount", tutorDenyCount);
router.post("/tutorAcceptCount", tutorAcceptCount);

module.exports = router;