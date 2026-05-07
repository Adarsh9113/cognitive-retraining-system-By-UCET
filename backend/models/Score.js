const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  name: String,
  moves: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Score", scoreSchema);