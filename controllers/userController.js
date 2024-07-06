const userModel = require("../models/userModel");

// 이메일로 사용자 존재 여부를 확인하는 컨트롤러 함수
exports.checkEmail = async (req, res) => {
  const email = req.body.email;

  try {
    console.log("1"); //ok
    const userExists = await userModel.checkUserExistence(email);
    console.log("2");
    if (userExists) {
      // 사용자 정보 가져오기
      console.log("3");
      const user = await userModel.getUserDetails(email);
      console.log("4");
      res.json({
        isExistingUser: true,
        nickname: user.nickname,
        profileImage: user.profileImage,
      });
      console.log("5");
    } else {
      res.json({ isExistingUser: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking user existence" });
  }
};
