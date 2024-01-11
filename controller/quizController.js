const Quiz = require("../models/quiz");
const Course = require("../models/course");
const QuizQuestion = require("../models/quizQuestion");

const createQuiz = async (req, res) => {
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
    //
    // const quizQuestions = questions.map((questionData) => {
    //   const { question, choices, correctAnswer } = questions;
    //   const question = questions[0].question;
    //   const choices = questions[0].choices;
    //   const correctAnswer = questions[0].correctAnswer;
    //   console.log(question);
    //   console.log(choices[2]);
    //   console.log(correctAnswer);
    // //   // Create and return a new QuizQuestion instance
    //   const quizQuestions = new QuizQuestion({
    //     question: question,
    //     choices: choices,
    //     correctAnswer: correctAnswer,
    //   });
    // // });

    //    await quizQuestions.save();
    const questionIds = [];

    // Loop through each question in the array
    for (const questionData of questions) {
      const { question, choices, correctAnswer } = questionData;

      // Create and return a new QuizQuestion instance
      const quizQuestion = new QuizQuestion({
        question,
        choices,
        correctAnswer,
      });

      // Save the question and collect its _id
      await quizQuestion.save();
      questionIds.push(quizQuestion._id);

      console.log("Question saved successfully:", quizQuestion);
    }

    // Additional information for the Quiz schema
    const dueDate = req.body.dueDate;
    const time = req.body.time;
    const quizWeight = req.body.quizWeight;
    const passGrade = req.body.passGrade;

    const newQuiz = new Quiz({
      course: course._id,
      questions: questionIds,
      creator: tutorId, // Assuming you store the tutorId in the quiz
      dueDate,
      time,
      quizWeight,
      passGrade,
    });
    await newQuiz.save();

    console.log("looooooooooo");
    console.log("Quiz saved successfully:", newQuiz);
    res.json(newQuiz);
    // res.json("hellloooooo");
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.send({ error: "Internal Server Error" });
  }
};

const fetchQuizzesByTutorId = async (tutorId) => {
  try {
    // Find quizzes created by the tutor
    const quizzes = await Quiz.find({ creator: tutorId })
      .populate("course", "courseTitle")
      .exec();

      return { success: true, quizzes };
      console.log(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return { success: false, message: "Error fetching quizzes" };
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
  fetchQuizzesByTutorId,
};
