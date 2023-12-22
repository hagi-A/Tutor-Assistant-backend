// controllers/courseRequestController.js
const CourseRequest = require("../models/courseRequest");

const createCourseRequest = async (req, res) => {
  // Extract tutorId and courseId from the request body
  const { tutorId, courseId } = req.body;

  try {
    // Create a new course request
    const courseRequest = await CourseRequest.create({ tutorId, courseId });

    res.status(201).json(courseRequest);
  } catch (error) {
    console.error("Error creating course request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCourseRequests = async (req, res) => {
  try {
    // Get all course requests
    const courseRequests = await CourseRequest.find();

    res.json(courseRequests);
  } catch (error) {
    console.error("Error getting course requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCourseRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Update the status of the course request
    const updatedCourseRequest = await CourseRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCourseRequest) {
      return res.status(404).json({ error: "Course request not found" });
    }

    res.json(updatedCourseRequest);
  } catch (error) {
    console.error("Error updating course request status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
    createCourseRequest,
    getAllCourseRequests,
  updateCourseRequestStatus,
};
