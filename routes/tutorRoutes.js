const express = require('express');
const router = express.Router();

const {
  denyTutorRequest,
  acceptAction,
  loginTutor,
  updateTutorProfile,
} = require("../controller/tutorController");

// Define the tutor registration route
// router.post(
//   "/tutorRegistration",
//   upload.fields([
//     { name: "selectedCVs", maxCount: 1 },
//     { name: "selectedImages", maxCount: 5 }, // Assuming up to 5 certificate images
//   ]), registerTutor
// );

// Define routes
router.put('/tutor-requests/:id/deny', denyTutorRequest);
// Define routes
router.put("/tutor-requests/:id/accept", acceptAction);

router.post("/tutorlogin", loginTutor);
// Route to update tutor rank
router.put("/updateTutorProfile/:id", updateTutorProfile);
// router.get("/allTutors", tutorController.getAllTutors);
// router.get("/tutors/search", tutorController.searchTutors);

module.exports = router;
