const Quiz = require("../models/quiz");
const Course = require("../models/course");
const QuizQuestion = require("../models/quizQuestion");

const createQuiz = async (req, res) => {
  try {
      // const { courseTitle, questions, tutorId } = req.body;
      const courseTitle = req.body.courseTitle
      const questions = JSON.parse(req.body.questions);
      const tutorId = req.body.tutorId
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
      

    const newQuiz = new Quiz({
      course: course._id,
      questions: questionIds,
      creator: tutorId, // Assuming you store the tutorId in the quiz
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

// const createQuiz = async (req, res) => {
//   try {
//     const { courseTitle, questions } = req.body;

//     if (!Array.isArray(questions) || questions.length === 0) {
//       return res
//         .status(400)
//         .json({ error: "Invalid or empty questions array" });
//     }
//     // Find or create a course based on courseCode
//     // const course = await Course.findOne({ courseTitle });
//     // await course.save();
//     // if (!course) {
//     // course = new Course({ courseCode, courseTitle });
//       // }

//       console.log("recieeeveeeeed");
//     const course = await Course.findOne({ courseTitle });

//     let courseId;

//     if (course) {
//       // If the course with the given title exists, use its _id
//       courseId = course._id;
//     } else {
//       // If the course doesn't exist, create a new one
//       const newCourse = new Course({ courseTitle });
//       await newCourse.save();
//       courseId = newCourse._id;
//     }
//     // Assuming questions is an array of question objects
//     const quizQuestions = questions.map((questionData) => {
//       const { question, choices, correctAnswer } = questionData;

//       // Create and return a new QuizQuestion instance
//       return new QuizQuestion({
//         question,
//         choices,
//         correctAnswer,
//       });
//     });

//     // try {
//       const newQuiz = new Quiz({
//         // courseId: course._id,
//         courseId: courseId,
//         questions: quizQuestions,
//       });

//       await newQuiz.save();
//       console.log("Quiz saved successfully:", newQuiz);
//       res.json(newQuiz);
//     // } catch (error) {
//     //   console.error("Error saving quiz:", error);
//     //   res.send({ error: "Internal Server Error" });
//     // }
//     // res.json(newQuiz);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
