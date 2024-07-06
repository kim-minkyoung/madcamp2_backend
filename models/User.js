// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  googleEmail: { type: String, required: true, unique: true },
  nickname: { type: String },
  profileImage: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
