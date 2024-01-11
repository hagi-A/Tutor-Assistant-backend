const multer = require("multer");

// Define the storage settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest;
    if (file.fieldname === "selectedCVs") {
      dest = "uploads/cv/"; // Destination for CV files
    } else if (file.fieldname === "selectedImages") {
      dest = "uploads/certificates/"; // Destination for certificate images
    } else {
      dest = "uploads/other/"; // Destination for other files (if any)
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Set up multer with the defined storage settings
const upload = multer({ storage });

module.exports = upload;

