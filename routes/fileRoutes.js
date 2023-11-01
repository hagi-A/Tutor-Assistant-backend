const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  imageUpload,
  fetchImage
} = require("../controller/fileController");

const uploadImg = multer({ dest: "files/" });

router.post(
  "/images",
  uploadImg.fields([
    { name: "image", maxCount: 1 },
    { name: "cvs", maxCount: 1 },
  ]),
  imageUpload
);
router.get("/images/:imageName", fetchImage);

module.exports = router;
