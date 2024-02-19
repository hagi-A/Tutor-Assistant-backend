const Tutor = require("../models/tutorModel");
const multer = require("multer");
const fs = require("fs");
// const nodemailer = require('nodemailer');
// const generateUsername = require('../helpers/usernameGenerator'); // Import the generateUsername function
// const generatePassword = require('../helpers/passwordGenerator'); // Import the generatePassword function


const imageUpload = async (req, res) => {
  const selectedImages = req.files.selectedImages[0].filename;
  const selectedCVs = req.files.selectedCVs[0].filename;
  // if (
  //   req.files &&
  //   req.files.selectedImages &&
  //   req.files.selectedImages.length > 0
  // ) {
  //   const selectedImages = req.files.selectedImages[0].filename;
  //   // Further processing with selectedImages (e.g., saving to a database)
  // } else {
  //   // Handle case where selectedImages is not available or empty
  // }

  // if (req.files && req.files.selectedCVs && req.files.selectedCVs.length > 0) {
  //   const selectedCVs = req.files.selectedCVs[0].filename;
  //   // Further processing with selectedCVs (e.g., saving to a database)
  // } else {
  //   // Handle case where selectedCVs is not available or empty
  // }
  // Save this data to a database probably
  try {
    const formData = req.body;
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const email = formData.email;
    const profession = formData.profession;
    const phoneNumber = formData.phoneNumber;
    const location = formData.location;
    const majorTaken = formData.majorTaken;
    const dateOfBirth = formData.dateOfBirth; // Assuming the birthdate is provided in the formData
    // const priceRate = formData.price;
    const gradeLevel = formData.gradeLevel;
    const selectedPackages = formData.selectedPackages; // Assuming courses is an array of course IDs
    const gender = formData.gender; // Assuming gender is provided in the formData

    if (!formData.firstName) {
      console.log("firstname");
      return res.send({ error: "Please enter your First Name" });
    }
    if (!formData.lastName) {
      console.log("lastname");
      return res.send({ error: "Please enter your Last Name" });
    }
    if (!formData.email) {
      console.log("email");
      return res.send({ error: "Please enter your Email" });
    }
    if (!formData.profession) {
      console.log("profession");
      return res.send({ error: "Please Select your Profession" });
    }
    if (!formData.location) {
      console.log("location");
      return res.send({ error: "Please Enter your Location" });
    }
    if (!formData.phoneNumber) {
      console.log("phoneNumber");
      return res.send({ error: "Please Enter your Phone Number" });
    }
    if (!formData.majorTaken) {
      console.log("majorTaken");
      return res.send({ error: "Please Enter your Major" });
    }
    // if (!formData.price) {
    //   console.log("price");
    //   return res.send({ error: "Please Enter your Price Rate" });
    // }
    if (!formData.gradeLevel) {
      console.log("gradeLevel");
      return res.send({ error: "Please Select Grade Lavel" });
    }
    if (!formData.dateOfBirth) {
      console.log("dateOfBirth");
      return res.send({ error: "Please Select Date of birth " });
    }
    if (!formData.selectedPackages) {
      console.log("selectedPackage");
      return res.send({ error: "Please Select Package" });
    }
    if (!formData.gender) {
      console.log("gender");
      return res.send({ error: "Please Select gender" });
    }
    // if (!selectedCVs) {
    //   console.log("cvName");
    //   console.log(req.body);
    //   return res.send({ error: "Please Upload your CV" });
    // }
    // if (!selectedImages) {
    //   console.log("imageName");
    //   return res.send({ error: "Please Upload your Profile Image" });
    // }
    // Validate phoneNumber format (starting with +251)
    const ethiopianPhoneNumberRegex = /^(?:\+251|0)\d{9}$/; // Matches "+251" and "0" followed by 9 digits
    if (!ethiopianPhoneNumberRegex.test(formData.phoneNumber)) {
      console.log("eth");
      return res.send({ error: "Invalid Ethiopian phone number format" });
    }

    // Calculate age based on birthdate
    const birthYear = new Date(dateOfBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    

    // Check if the user is too young to register
    if (age < 12) {
      return res.send("User is too young to register");
    }

    const tutor = new Tutor({
      firstName,
      lastName,
      email,
      profession,
      location,
      phoneNumber,
      majorTaken,
      age,
      selectedPackages,
      gender,
      // priceRate,
      gradeLevel,
      selectedCVs,
      selectedImages,
    });

    // Save the new tutor to the database
    await tutor.save();
    console.log(formData);
    //  console.log(req.files);
    res.send({ message: "Tutor registered successfully" });
  } catch (error) {
    console.error("Tutor registration error:", error);
    res.send({ error: "Internal server error" });
  }
// console.log("Received formData:", formData);
  // console.log(imageName,cvName);
  // console.log("""req""");
  // res.send({ name: "" });
};

const fetchImage = async (req, res) => {
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then
    // console.log(req.params);
  // try {
    const imageName = req.params.imageName;
    const readStream = fs.createReadStream(`files/${imageName}`);
    readStream.pipe(res);
  // } catch (err) {
  //   console.log(err);
  // }
};

// const fetchCv = async (req, res) => {
//   // do a bunch of if statements to make sure the user is
//   // authorized to view this image, then

//   const cvName = req.params.selectedCVs;
//   const readStream = fs.createReadStream(`cvs/${cvName}`);
//   readStream.pipe(res);
// };




module.exports = {
  imageUpload,
  fetchImage,
  // fetchCv,
  // handleTutorAction,
};
