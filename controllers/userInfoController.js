const UserInfo = require("../models/UserInfo");
const User = require("../models/User");

exports.checkEmail = async (req, res) => {
  const email = req.body.email;

  try {
    const userExists = await checkUserExistence(email);
    if (userExists) {
      // 사용자 정보 가져오기
      const userInfo = await UserInfo.findOne({ email }).populate("user");
      res.json({
        isExistingUser: true,
        userInfo,
      });
    } else {
      // 새 UserInfo 생성 및 저장
      const newUserInfo = new UserInfo(req.body);
      await newUserInfo.save();

      // 새 User 생성 및 저장
      const newUser = new User({ userInfo: newUserInfo._id });
      await newUser.save();

      // 새 User를 userInfo 필드와 함께 반환
      const populatedUser = await User.findById(newUser._id).populate(
        "userInfo"
      );
      res.json({ isExistingUser: false, user: populatedUser });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    res.status(500).json({ error: "Error checking user existence" });
  }
};

// 이미 존재하는 이메일인지 확인하는 함수
const checkUserExistence = async (email) => {
  try {
    const user = await UserInfo.findOne({ email });
    return !!user; // 사용자가 존재하면 true, 그렇지 않으면 false 반환
  } catch (error) {
    console.error("데이터베이스 오류:", error);
    throw error;
  }
};

exports.updateNickname = async (req, res) => {
  try {
    const userid = req.params.userid;
    const { nickname } = req.body;

    if (!nickname) {
      return res.status(400).json({ error: "닉네임을 제공해야 합니다." });
    }

    // 데이터베이스에서 사용자 업데이트
    const updatedUserInfo = await UserInfo.findByIdAndUpdate(
      userid,
      { nickname },
      { new: true, runValidators: true }
    );

    if (!updatedUserInfo) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    // 관련된 User 문서 업데이트
    const updatedUser = await User.findOneAndUpdate(
      { userInfo: userid },
      { $set: { userInfo: updatedUserInfo._id } },
      { new: true, runValidators: true }
    ).populate("userInfo");

    // userInfo가 업데이트되면 관련 User도 업데이트 (후크를 통해 자동으로 이루어짐)
    res.json({ userInfo: updatedUserInfo, user: updatedUser });
  } catch (error) {
    console.error("프로필 업데이트 오류:", error);
    res.status(500).json({ error: "프로필 업데이트 중 오류가 발생했습니다." });
  }
};

exports.deleteUser = async (req, res) => {
  const userid = req.params.userid;

  try {
    const deletedUserInfo = await UserInfo.findByIdAndDelete(userid);

    if (!deletedUserInfo) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    await User.deleteMany({ userInfo: userid });

    res.json({ message: "사용자가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("사용자 삭제 중 오류:", error);
    res.status(500).json({ error: "사용자 삭제 중 오류가 발생했습니다." });
  }
};
