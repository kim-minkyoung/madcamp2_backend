// controllers/userController.js

const User = require("../models/User");

exports.checkEmail = async (req, res) => {
  const email = req.body.email;

  try {
    console.log("1");
    const userExists = await checkUserExistence(email);
    console.log("6");
    if (userExists) {
      // 사용자 정보 가져오기

      const user = await User.findOne({ email });
      res.json({
        isExistingUser: true,
        nickname: user.nickname,
        profileImage: user.profileImage,
        userId: user.userId,
      });
    } else {
      console.log("7");
      const newUser = new User(req.body);
      console.log("8");
      console.log(newUser);
      await newUser.markModified("profileImage");
      await newUser.save();
      console.log("9");
      res.json({ isExistingUser: false });
      console.log("10");
    }
  } catch (error) {
    console.error("Error checking user existence:", error);

    res.status(500).json({ error: "Error checking user existence" });
  }
};

// 이미 존재하는 이메일인지 확인하는 함수
const checkUserExistence = async (email) => {
  console.log("2");
  try {
    console.log("3");
    console.log(email);
    console.log("4");
    const user = await User.findOne({ email });
    console.log("5");
    return !!user; // 사용자가 존재하면 true, 그렇지 않으면 false 반환
  } catch (error) {
    console.error("데이터베이스 오류:", error);
    throw error;
  }
};
