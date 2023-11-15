const Tutor = require("../models/tutorModel"); // Assuming you have a Tutor model

const getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.send({ message: "Tutor not found" });
    }
    res.status(200).json(tutor);
  } catch (error) {
    console.error("Error getting tutor by ID:", error);
    res.send({ message: "Internal server error" });
  }
};

// controllers/supervisorController.js
const updateTutor = async (req, res) => {
  const { id } = req.params;
  const { rank, gradeLevel } = req.body;

  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(
      id,
      { rank, gradeLevel },
      { new: true }
    );

    if (!updatedTutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    return res.status(200).json(updatedTutor);
  } catch (error) {
    console.error('Error updating tutor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getTutorById,
  updateTutor,
  // Add other tutor-related controller functions as needed
};
