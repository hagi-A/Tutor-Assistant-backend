const Tutor = require("../models/tutorModel");

const searchTutor = async (req, res) => {
  try {
    const { gender, gradeLevel} = req.query;

    // Build a query object based on the provided criteria
    const query = {};
    if (gender) query.gender = gender;
    if (gradeLevel) query.gradeLevel = gradeLevel;
    // if (location) query.location = { $regex: `^${location}`, $options: "i" };

    // Use the query object to find matching tutors
    const matchingTutors = await Tutor.find(query);
      console.log(matchingTutors);
    res.json(matchingTutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { searchTutor };
// ...
