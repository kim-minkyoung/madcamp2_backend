// models/UserInfo.js

const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  nickname: { type: String },
  // score: { type: Number },
  // point: { type: Number },
});

// UserInfo가 저장된 후 관련 User 문서를 생성 또는 업데이트
userInfoSchema.post("save", async function (userInfo) {
  try {
    // User 문서가 없을 때 생성, 있을 때 업데이트
    const user = await User.findOneAndUpdate(
      { userInfo: userInfo._id },
      { userInfo: userInfo._id },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error creating or updating user:", error);
  }
});

// UserInfo가 삭제된 후 관련 User 문서를 삭제
userInfoSchema.post("remove", async function (userInfo) {
  try {
    await User.deleteMany({ userInfo: userInfo._id });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
