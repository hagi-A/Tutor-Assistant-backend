// controller/courseController.js
const Course = require("../models/course");
const Tutor = require("../models/course");

// Create a new course
const addCourse = async (req, res) => {
  try {
    const { gradeLevel, package, price, courses } = req.body;

    // Validate the request payload (you may need more validation based on your requirements)

    // Create a new course instance
    const newCourse = new Course({
      gradeLevel,
      package,
      price,
      courses,
    });

    // Save the new course to the database
    const savedCourse = await newCourse.save();

    res.json(savedCourse);
    console.log(savedCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

  // const createCourse = async (req, res) => {
  //   try {
  //     const { creator, ...otherCourseData } = req.body;

  //     // Assuming you have a method to retrieve tutor details based on tutorId
  //     const tutor = await Tutor.findById(creator);

  //     const course = new Course({
  //       ...otherCourseData,
  //       creator: creator, // Assuming tutorId is the ObjectId of the tutor
  //     });

  //     await course.save();
  //       console.log(course);
  //       console.log(creator);
  //     res.send({ course, tutor }); // Adjust the response format as needed
  //   } catch (error) {
  //     console.error(error);
  //     res.send({ error: "Internal Server Error" });
  //   }
  // };

  // // Get all courses
  // const getAllCourses = async (req, res) => {
  // //   try {
  // //     const courses = await Course.find().populate("creator");
  // //     res.status(200).json(courses);
  // //   } catch (error) {
  // //     console.error(error);
  // //     res.status(500).json({ error: "Internal Server Error" });
  // //   }
  // try {
  //   // Modify this part to filter courses by tutor ID
  //     const tutorId = req.query.firstName; // Get tutor ID from query params
  //     if (!tutorId) {
  //       return res.send({ error: "Tutor ID is required" });
  //     }
  //   const courses = await Course.find({ tutorId }); // Modify this query accordingly
  //   res.json(courses);
  // } catch (error) {
  //   console.error("Error fetching courses:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
  // };

module.exports = {
  addCourse,
  getAllCourses,
};