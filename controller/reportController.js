const Tutor = require("../models/tutorModel");
const Report = require("../models/reportModel");

const tutorAcceptCount = async (req, res) => {
  try {
    const tutorAcceptCount = await Tutor.countDocuments({
      status: "Accepted",
    });
    // Save the report in the database
     const report = await Report.create({
       type: "Accepted",
       count: tutorDenyCount,
     });
      await report.save();
    res.json({ count: tutorAcceptCount });
  } catch (error) {
    res.send({ error: "Internal Server Error" });
  }
};

// API endpoint for fetching the count of denied tutors
const tutorDenyCount = async (req, res) => {
  try {
    const tutorDenyCount = await Tutor.countDocuments({ status: "Denied" });
    // Save the report in the database
      const report = await Report.create({ type: "Denied", count: tutorDenyCount });
      await report.save();
    res.json({ count: tutorDenyCount });
  } catch (error) {
    res.send({ error: "Internal Server Error" });
  }
};

// API endpoint for fetching the count of blacklisted tutors
const tutorBlacklistCount = async (req, res) => {
  try {
    const tutorBlacklistCount = await Tutor.countDocuments({
      status: "Blacklisted",
    });

    // Save the report in the database
     const report = await Report.create({
       type: "Blacklisted",
       count: tutorDenyCount,
     });
      await report.save();
    res.json({ count: tutorBlacklistCount });
  } catch (error) {
    res.send({ error: "Internal Server Error" });
  }
};

// API endpoint for fetching the total count of registered tutors
const tutorTotalCount = async (req, res) => {
  try {
    const tutorTotalCount = await Tutor.countDocuments();

    // Save the report in the database
     const report = await Report.create({
       type: "Total Tutor",
       count: tutorDenyCount,
     });
      await report.save();
      res.json({ count: tutorTotalCount });
      
  } catch (error) {
    res.send({ error: "Internal Server Error" });
  }
};

module.exports = {
  tutorTotalCount,
  tutorBlacklistCount,
  tutorDenyCount,
  tutorAcceptCount,
};
