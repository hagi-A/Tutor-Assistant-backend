const Tutor = require("../models/tutorModel"); // Assuming you have a Tutor model
const CourseRequest = require("../models/courseRequest");

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
      return res.status(404).json({ message: "Tutor not found" });
    }

    return res.status(200).json(updatedTutor);
  } catch (error) {
    console.error("Error updating tutor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getNotifications = async (req, res) => {
  try {
    // Count the number of pending course requests
    const newNotifications = await CourseRequest.countDocuments({
      status: "pending",
    });

    res.json({ newNotifications });
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getTutorNotifications = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;
    console.log("Tutor ID:", tutorId);

    // Count the number of pending course requests for the specified tutor
    const notificationCount = await CourseRequest.countDocuments({
      tutor: tutorId,
      status: "pending",
    });
    console.log(notificationCount);
    res.json({ notificationCount });
  } catch (error) {
    console.error("Error getting tutor notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
};
const handleCourseRequest = async (req, res) => {
  const { requestId, action } = req.params;

  try {
    // Find the course request by ID
    const courseRequest = await CourseRequest.findById(requestId);

    if (!courseRequest) {
      return res.status(404).json({ error: "Course request not found" });
    }

    // Update the status based on the action (approve or deny)
    courseRequest.status = action === "approve" ? "approved" : "denied";

    // Save the updated course request
    await courseRequest.save();

    res.json({ message: "Course request updated successfully" });
  } catch (error) {
    console.error("Error handling course request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTutorById,
  updateTutor,
  handleCourseRequest,
  getTutorNotifications,
  getNotifications,
  // Add other tutor-related controller functions as needed
};
