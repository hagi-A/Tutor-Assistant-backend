const Assignment = require("../models/assignmentModel");
const Course = require("../models/course");
const AssignmentQuestion = require("../models/assignmentQuestion");

const createAssignment = async (req, res) => {
  try {
    // const { courseTitle, questions, tutorId } = req.body;
    const courseTitle = req.body.courseTitle;
    const questions = JSON.parse(req.body.questions);
    const tutorId = req.body.tutorId;
    console.log(courseTitle);
    console.log(questions);
    console.log(tutorId);
    //

    // Find or create a course based on courseTitle
    const course = await Course.findOne({ courseTitle });

    if (!course) {
      return res.send({ error: "Course not found" });
    }

    //    await quizQuestions.save();
    const questionIds = [];

    // Loop through each question in the array
    for (const questionData of questions) {
      const { question, choices, correctAnswer } = questionData;

        
      // Create and return a new QuizQuestion instance
      const assignmentQuestion = new AssignmentQuestion({
        question,
        choices,
        correctAnswer,
      });

      // Save the question and collect its _id
      await assignmentQuestion.save();
      questionIds.push(assignmentQuestion._id);

      console.log("Question saved successfully:", assignmentQuestion);
    }

    // Additional information for the Quiz schema
    const dueDate = req.body.dueDate;
    const time = req.body.time;
    const quizWeight = req.body.quizWeight;
    const passGrade = req.body.passGrade;

    const newAssignment = new Assignment({
      course: course._id,
      questions: questionIds,
      creator: tutorId, // Assuming you store the tutorId in the quiz
      dueDate,
      time,
      quizWeight,
      passGrade,
    });
    await newAssignment.save();

    console.log("looooooooooo");
    console.log("Quiz saved successfully:", newAssignment);
    res.json(newAssignment);
    // res.json("hellloooooo");
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.send({ error: "Internal Server Error" });
  }
};

const fetchAssignmentsByTutorId = async (tutorId) => {
  try {
    // Find quizzes created by the tutor
    const assignments = await Assignment.find({ creator: tutorId })
      .populate("course", "courseTitle")
      .exec();

    return { success: true, assignments };
    console.log(assignments);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return { success: false, message: "Error fetching quizzes" };
  }
};

const getAssignmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.find({ courseId }).populate("courseId");
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAssignment,
  getAssignmentsByCourse,
  fetchAssignmentsByTutorId,
};
