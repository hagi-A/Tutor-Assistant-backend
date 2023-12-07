const express = require('express')
// const requireRole = require('../middleware/requireRole');
const {protect} = require('../middleware/authMiddleware')
//controller functions
const {
  signupUser,
  loginUser,
  getUsersExceptUserId,
  getStudents,
  // allUsers,
  // // searchUserUsernames,
  // searchUsers,
} = require("../controller/userController");
// const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

// router.use(requireRole)



//login route
// router.route("/").get(protect, allUsers);
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)
// Get users except the specified user by user ID route
router.get("/:userId", getUsersExceptUserId);
router.get("/students", getStudents);
// router.get("/users/search", userController.searchUsers);
// router.get('/search', searchUserUsernames);
// router.get("/allUsers", tutorController.getAllTutors);
// router.get("/users/search", tutorController.searchTutors);

// // Protected routes using requireRole middleware
// router.get('/admin', requireRole('Admin'), (req, res) => {
//     // Only users with 'Admin' role can access this route
//     res.json({ message: 'Welcome Admin!' });
// });

// router.get('/parent', requireRole('Parent'), (req, res) => {
//     // Only users with 'Parent' role can access this route
//     res.json({ message: 'Welcome Parent!' });
// });

// router.get('/student', requireRole('Student'), (req, res) => {
//     // Only users with 'Student' role can access this route
//     res.json({ message: 'Welcome Student!' });
// });

// router.get('/tutor', requireRole('Tutor'), (req, res) => {
//     // Only users with 'Tutor' role can access this route
//     res.json({ message: 'Welcome Tutor!' });
// });

// router.get('/supervisor', requireRole('Supervisor'), (req, res) => {
//     // Only users with 'Supervisor' role can access this route
//     res.json({ message: 'Welcome Supervisor!' });
// });


module.exports = router