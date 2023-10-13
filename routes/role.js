const express = require('express')
const requireRole = require('../middleware/requireRole');


const roleRouter = express.Router()

router.use(requireRole)

// Protected routes using requireRole middleware
router.get('/admin', requireRole('Admin'), (req, res) => {
    // Only users with 'Admin' role can access this route
    res.json({ message: 'Welcome Admin!' });
});

router.get('/parent', requireRole('Parent'), (req, res) => {
    // Only users with 'Parent' role can access this route
    res.json({ message: 'Welcome Parent!' });
});

router.get('/student', requireRole('Student'), (req, res) => {
    // Only users with 'Student' role can access this route
    res.json({ message: 'Welcome Student!' });
});

router.get('/tutor', requireRole('Tutor'), (req, res) => {
    // Only users with 'Tutor' role can access this route
    res.json({ message: 'Welcome Tutor!' });
});

router.get('/supervisor', requireRole('Supervisor'), (req, res) => {
    // Only users with 'Supervisor' role can access this route
    res.json({ message: 'Welcome Supervisor!' });
});


module.exports = roleRouter