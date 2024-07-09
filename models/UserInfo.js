const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
  email: { type: String, unique: true },
  nickname: { type: String },
  // score: { type: Number },
  // point: { type: Number },
});

// 후크 등록
userInfoSchema.post("save", async function (userInfo) {
  try {
    const User = mongoose.model("User"); // User 모델 불러오기
    const users = await User.find({ userInfo: userInfo._id });

    await Promise.all(
      users.map(async (user) => {
        user.userInfo = userInfo._id;
        await user.save();
      })
    );
  } catch (error) {
    console.error("Error updating users:", error);
  }
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
