const express = require("express");
const router = express.Router();
const childController = require("../controller/childController");
// const parentController = require("../controller/parentController");

// Parent routes
// router.post("/parent", parentController.createParent);

// Child routes
router.post("/createChild", childController.createChild);

module.exports = router;
