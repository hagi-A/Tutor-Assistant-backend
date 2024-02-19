const TutorRequest = require("../models/tutorRequest");
const Tutor = require("../models/tutorModel");

const createTutorRequest = async (req, res) => {
    const { gender, grade, selectedPackages, profession } = req.body;
    const creator = req.params.userId;
  try {
    

    // Check if user information is available
    // if (!req.user || !req.user._id) {
    //   return res.send({ error: "User not authenticated" });
    //   }
      
      // const creator = req.user._id;
      
    const newTutorRequest = new TutorRequest({
      gender,
      grade,
      selectedPackages,
      profession,
      creator: creator,
    });

    await newTutorRequest.save();

    console.log("Posteeeeed");
    console.log(newTutorRequest);
    console.log(creator);
    res.status(201).json({ message: "Tutor request created successfully" });
  } catch (error) {
    console.error("Error creating tutor request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTutorRequests = async (req, res) => {
    try {
      const creator = req.params.userId;

      // Example: Fetch tutor requests based on userId using TutorRequest model
      const tutorRequests = await TutorRequest.find({ creator }); // Replace with your actual model and query

        res.json({ tutorRequests });
        console.log(tutorRequests);
    } catch (error) {
      console.error("Error fetching tutor requests:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
//   try {
//     const tutorRequests = await TutorRequest.find();
//     res.json(tutorRequests);
//   } catch (error) {
//     console.error("Error fetching tutor requests:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
};

// Controller to fetch tutor requests matching tutor's criteria
const getAllMatchingTutorRequests = async (req, res) => {
  try {
    const { tutorId } = req.params;

    // Fetch tutor data based on tutorId
    const tutor = await Tutor.findById(tutorId);

    if (!tutor) {
      return res.status(404).json({ error: "Tutor not found" });
    }

    // Convert the tutor's grade to a range if needed
    // const tutorGradeRange = convertToGradeLevelRange(tutor.grade);

    // Build query based on tutor's data and other criteria
    // Build query based on tutor's data
    const tutorQuery = {
      grade: tutor.gradeLevel,
      courses: { $in: tutor.courses }, // Assuming courses is an array in Tutor model
      profession: tutor.profession,
      gender: tutor.gender,
    };

    // Additional criteria provided in the request
    const additionalQuery = {};
    if (grade) additionalQuery.grade = grade;
    if (courses) additionalQuery.courses = { $in: courses.split(",") };
    if (profession) additionalQuery.profession = profession;
    if (gender) additionalQuery.gender = gender;

    // Combine tutor's query and additional criteria
    const combinedQuery = { $and: [tutorQuery, additionalQuery] };

    // Fetch all tutor requests based on the combined criteria
    const tutorRequests = await TutorRequest.find(combinedQuery);

    // Filter tutor requests to include only those with at least two matching criteria
    const filteredTutorRequests = tutorRequests.filter((request) => {
      const matchingCriteriaCount = Object.keys(tutorQuery).reduce(
        (count, key) => (request[key] === tutorQuery[key] ? count + 1 : count),
        0
      );
      return matchingCriteriaCount >= 2;
    });

      res.json({ tutorRequests: filteredTutorRequests });
      console.log(tutorRequests);
  } catch (error) {
    console.error("Error fetching matching tutor requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to convert a single grade level to a range
// const convertToGradeLevelRange = (grade) => {
//   // You can customize this logic based on your grading system
//   // For example, you might round down to the nearest lower multiple of 3 or 5
//   const lowerBound = Math.floor((grade - 1) / 3) * 3 + 1;
//   const upperBound = lowerBound + 2; // Assuming a range of 3 grades (e.g., "6-8")

//   return `${lowerBound}-${upperBound}`;
// };

module.exports = {
  createTutorRequest,
  getTutorRequests,
  getAllMatchingTutorRequests,
};
