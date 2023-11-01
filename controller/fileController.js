const Tutor = require("../models/tutorModel");
const multer = require("multer");
const fs = require("fs");


const imageUpload = async (req, res) => {
  const imageName = req.file.filename;

    // Save this data to a database probably
    //  try {
    //    const formData = req.body;
    //    if (
    //      !formData.firstName ||
    //      !formData.lastName ||
    //      !formData.email ||
    //      !formData.profession ||
    //      !formData.location ||
    //      !formData.phoneNumber ||
    //      !formData.ueeeResult ||
    //      !formData.majorTaken ||
    //      !formData.cgpa ||
    //      !formData.price ||
    //      !formData.gradeLevel ||
    //      !formData.selectedCVs ||
    //      !formData.selectedImages
    //    ) {
    //      return res.status(400).json({ error: "All fields must be filled!" });
    //    }
         
    //    // Validate phoneNumber format (starting with +251)
    //    const ethiopianPhoneNumberRegex = /^(?:\+251|0)\d{9}$/; // Matches "+251" and "0" followed by 9 digits
    //    if (!ethiopianPhoneNumberRegex.test(phoneNumber)) {
    //      return res
    //        .status(400)
    //        .json({ error: "Invalid Ethiopian phone number format" });
    //    }

    //    const tutor = new Tutor({
    //      firstName,
    //      lastName,
    //      email,
    //      profession,
    //      location,
    //      phoneNumber,
    //      ueeeResult,
    //      majorTaken,
    //      cgpa,
    //      price,
    //      gradeLevel,
    //      selectedCVs,
    //      selectedImages,
    //    });

    //    // Save the new tutor to the database
    //    await tutor.save();
    //    console.log(req.files);
    //    res.status(201).json({ message: "Tutor registered successfully" });
    //  } catch (error) {
    //    console.error("Tutor registration error:", error);
    //    res.status(500).json({ error: "Internal server error" });

    //    console.log(req.body);
    //  }

  console.log(imageName);
  res.send({ imageName });
};


const fetchImage = async (req, res) => {
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then

  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
};

module.exports = {
  imageUpload,
  fetchImage,
};
