const TutorRequest = require("../models/tutorRequest");

const createTutorRequest = async (req, res) => {
  try {
    const { gender, grade, courses, profession, ageGroup } = req.body;

    const newTutorRequest = new TutorRequest({
      gender,
      grade,
      courses,
      profession,
      ageGroup,
    });

    await newTutorRequest.save();

      console.log("Posteeeeed")
      console.log(newTutorRequest);
    res.status(201).json({ message: "Tutor request created successfully" });
  } catch (error) {
    console.error("Error creating tutor request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createTutorRequest };
