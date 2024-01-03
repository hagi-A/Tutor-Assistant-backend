// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   gradeLevels: {
//     G1: {
//       packages: [
//         {
//           name: "Package 1",
//           price: 300, // Set the price for the default package
//           courses: {
//             English: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//                 // validate: {
//                 //   validator: (value) => {
//                 //     // You can add custom validation logic here if needed
//                 //     // For example, you might want to ensure that the link is a valid URL
//                 //     return /^https?:\/\/\S+$/.test(value);
//                 //   },
//                 //   message: (props) => `${props.value} is not a valid URL!`,
//                 // },
//               },
//             },
//             Amharic: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Maths: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Science: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//           },
//         },
//       ],
//     },
//     G2: {
//       packages: [
//         {
//           name: "Package 1",
//           price: 300, // Set the price for the default package
//           courses: {
//             English: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String,
//               },
//             },
//             Amharic: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Maths: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Science: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//           },
//         },
//       ],
//     },
//     G3: {
//       packages: [
//         {
//           name: "Package 1",
//           price: 300, // Set the price for the default package
//           courses: {
//             English: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String,
//               },
//             },
//             Amharic: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Maths: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Science: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//           },
//         },
//       ],
//     },
//     G4: {
//       packages: [
//         {
//           name: "Package 1",
//           price: 300, // Set the price for the default package
//           courses: {
//             English: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String,
//               },
//             },
//             Amharic: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Maths: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Science: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//           },
//         },
//       ],
//     },
//     G5: {
//       packages: [
//         {
//           name: "Package 1",
//           price: 300, // Set the price for the default package
//           courses: {
//             English: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String,
//               },
//             },
//             Amharic: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Maths: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Science: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//           },
//         },
//       ],
//     },
//     G6: {
//       packages: [
//         {
//           name: "Package 1",
//           price: 300, // Set the price for the default package
//           courses: {
//             English: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String,
//               },
//             },
//             Amharic: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Maths: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Science: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//           },
//         },
//       ],
//     },
//     G7: {
//       packages: [
//         {
//           name: "Package 1",
//           price: 350, // Set the price for Package 1 in G7
//           courses: {
//             English: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Amharic: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             SocialStudies: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Science: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//           },
//         },
//         {
//           name: "Package 2",
//           price: 400, // Set the price for Package 2 in G7
//           courses: {
//             Physics: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Biology: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Chemistry: {
//               courseDescription: {
//                 type: String,
//                 required: true,
//               },
//               courseObjectives: {
//                 type: String,
//                 required: true,
//               },
//               contents: {
//                 type: String,
//                 required: true,
//               },
//               referenceLinks: {
//                 type: String, // Assuming the link is a string (URL)
//               },
//             },
//             Maths: {
//               // Details for Maths course in G7 Package 2
//             },
//           },
//         },
//         // Add more packages as needed
//       ],
//     },
//     // Add details for other grade levels
//     // ...
//   },
// });

// const Course = mongoose.model("Course", courseSchema);

// module.exports = Course;
// models/course.js
// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const courseSchema = new Schema({
//   courseCode: {
//     type: String,
//     required: true,
//   },
//   courseTitle: {
//     type: String,
//     required: true,
//   },
//   courseDescription: {
//     type: String,
//     required: true,
//   },
//   courseObjectives: {
//     type: String,
//     required: true,
//   },
//   courseContent: {
//     type: String,
//     required: true,
//   },
// //   grade: {
// //     type: String,
// //     required: true,
// //   },
//   //   tutor: {
//   //     type: mongoose.Schema.Types.ObjectId,
//   //     ref: "Tutor", // Assuming your tutor model is named 'Tutor'
//   //     required: true,
//   //   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   resourse: {
//     type: String,
//     required: true,
//   },
//   gradeLevel: [
//     {
//       // name: String,
//       type: String,
//       // required: true,

//       // enum: [
//       //   "Kindergarten",
//       //   "Elementary",
//       //   "Middle School",
//       //   "High School",
//       //   "College",
//       // ],
//     },
//   ],
// });

// const Course = mongoose.model("Course", courseSchema);

// module.exports = Course;

