const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const { registerTutor } = require("../controller/tutorController");

// Define the tutor registration route
router.post(
  "/tutorRegistration",
  upload.fields([
    { name: "selectedCVs", maxCount: 1 },
    { name: "selectedImages", maxCount: 5 }, // Assuming up to 5 certificate images
  ]), registerTutor
);

// router.get("/allTutors", tutorController.getAllTutors);
// router.get("/tutors/search", tutorController.searchTutors);

module.exports = router;
