const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
  denialReasons: [
    {
      type: String,
    },
  ],
});

const Blacklist = mongoose.model("Blacklist", blacklistSchema);

module.exports = Blacklist;
