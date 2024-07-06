const User = require("../models/User");

// 이미 존재하는 이메일인지 확인하는 함수
exports.checkUserExistence = async (email) => {
  try {
    console.log(email);

    const user = await User.findOne({ email });
    if (user) {
      console.log("true");
    }
    return !!user; // 사용자가 존재하면 true, 그렇지 않으면 false 반환
  } catch (error) {
    console.error("데이터베이스 오류:", error);
    throw error;
  }
};

exports.getUserDetails = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user; // 사용자 객체 반환 (존재하지 않으면 null 반환)
  } catch (error) {
    console.error("데이터베이스 오류:", error);
    throw error;
  }
};
