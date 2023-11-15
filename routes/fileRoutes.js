const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  imageUpload,
  fetchImage,
  // fetchCv,
  // handleTutorAction,
} = require("../controller/fileController");

const uploadImg = multer({ dest: "files/" });

router.post(
  "/images",
  uploadImg.fields([
    { name: "selectedImages", maxCount: 3 },
    { name: "selectedCVs", maxCount: 8 },
  ]),
  imageUpload
);
router.get("/images/:imageName", fetchImage);

// router.get("/cvs/:cvName", fetchCv);
// Route to handle tutor action
// router.post('/tutors/:email/action', handleTutorAction);

module.exports = router;
