// controllers/userController.js

const User = require("../models/User");

exports.checkEmail = async (req, res) => {
  const email = req.body.email;

  try {
    const userExists = await checkUserExistence(email);
    if (userExists) {
      // 사용자 정보 가져오기
      const user = await User.findOne({ email });
      res.json({
        isExistingUser: true,
        nickname: user.nickname,
        profileImage: user.profileImage,
      });
    } else {
      res.json({ isExistingUser: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking user existence" });
  }
};

// 이미 존재하는 이메일인지 확인하는 함수
const checkUserExistence = async (email) => {
  try {
    console.log(email);

    const user = await User.findOne({ email });
    return !!user; // 사용자가 존재하면 true, 그렇지 않으면 false 반환
  } catch (error) {
    console.error("데이터베이스 오류:", error);
    throw error;
  }
};
