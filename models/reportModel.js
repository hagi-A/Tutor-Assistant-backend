const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    type: String, // 'Deny', 'Blacklist', 'Total', etc.
    count: Number,
    timestamp: { type: Date, default: Date.now },
});
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

