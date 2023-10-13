const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const tutorController = require('../controller/tutorController');

// Define the tutor registration route
router.post('/tutorRegistration', upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'certificateImages', maxCount: 5 }, // Assuming up to 5 certificate images
]), tutorController.registerTutor);

module.exports = router;
