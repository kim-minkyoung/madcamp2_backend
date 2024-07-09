// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  nickname: { type: String },
  profileImage: { type: String },
  compareWord: { type: String },
  playCount: { type: Number },
  score: { type: Number },
  totalScore: { type: Number },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
