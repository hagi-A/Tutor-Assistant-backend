const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  learningStyle: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  contactInfo: String,
  schoolInfo: String,
  medicalInfo: String,
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;
