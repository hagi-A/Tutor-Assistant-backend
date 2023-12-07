const Tutor = require("../models/tutorModel");
const Blacklist = require("../models/blacklistModel");
const nodemailer = require("nodemailer");
const generateUsername = require("../helpers/usernameGenerator"); // Import the generateUsername function
const generatePassword = require("../helpers/passwordGenerator"); // Import the generatePassword function
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createToken = (_id, selectedRole) => {
  return jwt.sign({ _id, selectedRole }, process.env.SECRET, {
    expiresIn: "3d",
  });
};
const loginTutor = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Find the user by email or username using the custom login method
    const tutor = await Tutor.tutorlogin(emailOrUsername, password);
    delete tutor["password"];
    // create a token with user's _id and role
    const selectedRole = tutor.selectedRole;
    const token = createToken({ tutorId: tutor._id, role: tutor.selectedRole });
    res.status(200).json({ token, tutor });

    console.log(tutor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const acceptAction = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the tutor with the specified id exists
    const updatedRequest = await Tutor.findByIdAndUpdate(
      id,
      { status: "Accepted" },
      { new: true }
    ).catch((error) => {
      console.error("Error updating tutor:", error);
      return res.status(500).json({ message: "Error updating tutor" });
    });

    // If tutor is not found, return a 404 response
    if (!updatedRequest) {
      return res.send({ message: "Tutor not found" });
    }
    const tutorDetails = await Tutor.findById(id);

    // if (!tutor) {
    //   return res.status(404).json({ message: 'Tutor not found' });
    // }

    // Update the tutor's status
    // tutor.status = 'Accepted';
    // await tutor.save();
    if (tutorDetails) {
      // Generate credentials based on tutor's name
      const username = generateUsername(
        tutorDetails.firstName,
        tutorDetails.lastName
      );
      const password = generatePassword();
      const email = tutorDetails.email; // Tutor's email
      const hashedPassword = await bcrypt.hash(password, 10);
      // Save the generated username to the tutorDetails object
      tutorDetails.username = username;
      tutorDetails.password = hashedPassword;

      // Save the document with the updated username
      await tutorDetails.save();
      // Generate a token for reset
      const token = jwt.sign({ id: tutorDetails._id }, process.env.SECRET, {
        expiresIn: "1d",
      });
      const resetLink = `http://localhost:3000/tutorResetPassword/${tutorDetails._id}/${token}`;

      // Send email to the tutor
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Credentials for Tutoring Platform",
        html: `Dear ${tutorDetails.firstName},<br>
        Your credentials for our tutoring platform are:<br>
        Username: ${username}<br>
        Password: ${password}<br>
        Please use these credentials to log in.
        You must Reset Ur Password first using the below link!
        Reset Password: <a href="${resetLink}">Tutor Reset Password</a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.send({ message: "Error sending email" });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            message: "Tutor status updated and email sent successfully",
          });
        }
      });
    } else {
      console.log("Tutor details not found for sending email.");
    }
    res.json(updatedRequest);
  } catch (error) {
    console.log("Error accepting action:", error);
    return res.send({ message: "Internal server error" });
  }
};

const denyTutorRequest = async (req, res) => {
  try {
    const { id } = req.params;
    let { denialReasons } = req.body;

    // Ensure denialReasons is an array
     denialReasons = Array.isArray(denialReasons) ? denialReasons : [denialReasons];

    // Ensure denialReasons is an array of strings
    const formattedDenialReasons = denialReasons.map((reason) =>
      reason.toString()
    );

    // Fetch details of the tutor to get the name and email before deleting
    const tutorDetails = await Tutor.findById(id);
    // Update the status to "Blacklisted"
    tutorDetails.status = "Blacklisted";
    await tutorDetails.save();
    // Create a Blacklist entry
    const blacklistEntry = await Blacklist.create({
      tutor: id,
      denialReasons: formattedDenialReasons,
    });
    console.log(tutorDetails);
    // Delete the tutor's data from the database
    // const deletedTutor = await Tutor.findByIdAndDelete(id);

    if (tutorDetails) {
      const email = tutorDetails.email;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Tutor Request Denied",
        text: `Dear ${
          tutorDetails.firstName
        }, your tutor request has been denied.\n\nDenial Reasons: Reasons:${formattedDenialReasons.join(
          ", "
        )}`,
        // You can include more details or HTML for the email content
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } else {
      console.log("Tutor details not found for sending email.");
    }

    // res.json({ success: true, blacklistEntry });
  } catch (error) {
    console.log(error.message)
    res.send({ message: error.message });
  }
};
// Update the function that handles rank changes
const updateTutorProfile = async (req, res) => {
  const { id } = req.params;
  const { rank, gradeLevel } = req.body;

  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(
      id,
      { rank, gradeLevel },
      { new: true }
    );

    if (!updatedTutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    // console.error(error);
    res.json(updatedTutor);
  } catch (error) {
    console.error("Error updating rank and gradeLevels:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTutorById = async (req, res) => {
  try {
    const tutorId = req.params.id;

    // Assuming you have a method to find a tutor by ID in your Tutor model
    const tutor = await Tutor.findById(tutorId);

    if (!tutor) {
      return res.status(404).json({ error: "Tutor not found" });
    }

    // Return tutor details
    res.json(tutor);
  } catch (error) {
    console.error("Error fetching tutor details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const fethcTutor = async (req, res) => {
  const tutorId = parseInt(req.params.id);
  const tutor = Tutor.find((t) => t.tutorId === tutorId);

  if (!tutor) {
    return res.status(404).json({ error: "Tutor not found" });
  }

  // Return tutor data
  res.json(tutor);
};

module.exports = {
  acceptAction,
  denyTutorRequest,
  loginTutor,
  updateTutorProfile,
  fethcTutor,
  getTutorById,
};
