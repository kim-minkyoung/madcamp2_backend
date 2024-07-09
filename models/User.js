// models/UserGame.js
const UserInfo = require("./UserInfo");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userInfo: { type: UserInfo },
  compareWord: { type: String },
  playCount: { type: Number },
  score: { type: Number },
  totalScore: { type: Number },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
