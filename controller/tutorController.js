const Tutor = require('../models/tutorModel');

const registerTutor = async (req, res) => {
    try {
        const formData = req.body;
        const cvPath = req.files["selectedCVs"][0].path;
        const certificateImages = req.files["selectedImages"].map(
          (file) => file.path
        );
         if (
           !firstName ||
           !lastName ||
           !email ||
           !profession ||
           !location ||
           !phoneNumber ||
           !ueeeResult ||
           !majorTaken ||
           !cgpa ||
           !price ||
           !gradeLevel ||
           !selectedCVs ||
           !selectedImages
         ) {
           return res.status(400).json({ error: "All fields must be filled!" });
         }
        // Validate phoneNumber format (starting with +251)
        const ethiopianPhoneNumberRegex = /^(?:\+251|0)\d{9}$/; // Matches "+251" and "0" followed by 9 digits
        if (!ethiopianPhoneNumberRegex.test(phoneNumber)) {
            return res.status(400).json({ error: 'Invalid Ethiopian phone number format' });
        }

        const tutor = new Tutor({
          firstName,
          lastName,
          email,
          profession,
          location,
          phoneNumber,
          ueeeResult,
          majorTaken,
          cgpa,
          price,
          gradeLevel,
          selectedCVs,
          selectedImages
        });

        // Save the new tutor to the database
        await tutor.save();
console.log(req.files);
        res.status(201).json({ message: 'Tutor registered successfully' });
    } catch (error) {
        console.error('Tutor registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
      
console.log(req.body);
    }
};

const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const searchTutors = async (req, res) => {
  const { course, maxPrice } = req.query;
  try {
    const tutors = await Tutor.find({
      courses: course,
      price: { $lte: maxPrice },
    });
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getTutors = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const tutors = await Tutor.paginate({}, { page, limit });
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerTutor, getAllTutors, searchTutors, getTutors };
