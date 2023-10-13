const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tutorSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    priceRate: {
        type: Number,
        required: true,
    },
    gradeLevel: {
        type: String,
        required: true,
        enum: ['Kindergarten', 'Elementary', 'Middle School', 'High School', 'College'],
    },
    courses: {
        type: String,
        required: true,
    },
    cvPath: {
        type: String,
        required: true,
    },
    certificateImages: [{
        type: String,
        required: true,
    }],
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
