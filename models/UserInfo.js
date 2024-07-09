// models/User.js

const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  nickname: { type: String },
  // score: { type: Number },
  // point: { type: Number },
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = User;
