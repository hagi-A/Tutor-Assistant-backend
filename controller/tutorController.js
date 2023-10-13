const Tutor = require('../models/tutorModel');

const registerTutor = async (req, res) => {
    try {
        const { fullname, profession, phoneNumber, location, priceRate, gradeLevel, courses } = req.body;
        const cvPath = req.file.path;
        const certificateImages = req.files.map(file => file.path);

        if (!fullname || !profession || !phoneNumber || !location || !priceRate || !gradeLevel || !courses || !cvPath || !certificateImages ) {
            return res.status(400).json({ error: 'All fields must be filled!' });
        }

        // Validate phoneNumber format (starting with +251)
        const ethiopianPhoneNumberRegex = /^(?:\+251|0)\d{9}$/; // Matches "+251" and "0" followed by 9 digits
        if (!ethiopianPhoneNumberRegex.test(phoneNumber)) {
            return res.status(400).json({ error: 'Invalid Ethiopian phone number format' });
        }

        const tutor = new Tutor({ fullname, profession, phoneNumber, location, priceRate, gradeLevel, courses, cvPath, certificateImages });
        await tutor.save();

        res.status(201).json({ message: 'Tutor registered successfully' });
    } catch (error) {
        console.error('Tutor registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerTutor };
