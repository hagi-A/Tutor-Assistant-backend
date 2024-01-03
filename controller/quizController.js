const Quiz = require("../models/quiz");
const Course = require("../models/course");

const createQuiz = async (req, res) => {
  try {
    const { courseCode, courseTitle, question, choices, correctAnswer } =
      req.body;

    // Find or create a course based on courseCode
    let course = await Course.findOne({ courseCode });

    if (!course) {
      course = new Course({ courseCode, courseTitle });
      await course.save();
    }

    const newQuiz = new Quiz({
      courseId: course._id, // Use the _id of the found/created course
      title,
      questions,
    });

    await newQuiz.save();
    res.json(newQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuizzesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await Quiz.find({ courseId }).populate("courseId");
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createQuiz,
  getQuizzesByCourse,
};
