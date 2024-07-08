// controllers/userController.js

const User = require("../models/User");
const multer = require("multer");
const path = require("path");

// Multer 설정: 프로필 사진 업로드를 위한 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 7000000 } });

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
        _id: user._id,
      });
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.json({ isExistingUser: false });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);

    res.status(500).json({ error: "Error checking user existence" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    console.log("2");
    const userId = req.params.userid;
    console.log(`Fetching user with ID: ${userId}`);

    // 데이터베이스에서 사용자 정보 조회
    const user = await User.findById(userId);
    console.log("3", user);

    if (!user) {
      console.log("4");
      return res.status(404).json({ error: "User not found" });
    }

    // 사용자 정보 반환
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// 이미 존재하는 이메일인지 확인하는 함수
const checkUserExistence = async (email) => {
  try {
    const user = await User.findOne({ email });
    return !!user; // 사용자가 존재하면 true, 그렇지 않으면 false 반환
  } catch (error) {
    console.error("데이터베이스 오류:", error);
    throw error;
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userid = req.params.userid;
    const { nickname, score } = req.body;
    let user = await User.findById(userid);

    // 업데이트할 데이터 객체 초기화
    const updateData = {};

    if (nickname !== undefined) {
      // 닉네임이 요청에 포함되어 있으면 추가 또는 수정
      updateData.nickname = nickname;
    }

    const existingScore = user.score || 0;
    // 점수 필드를 요청으로 받은 경우 처리
    // 요청으로 들어온 점수를 기존 점수에 더함
    if (score !== undefined) {
      updateData.score = existingScore + score;
    }

    // 데이터베이스에서 사용자 업데이트
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("프로필 업데이트 오류:", error);
    res.status(500).json({ error: "프로필 업데이트 중 오류가 발생했습니다." });
  }
};

exports.deleteUser = async (req, res) => {
  const userid = req.params.userid;

  try {
    const deletedUser = await User.findByIdAndDelete(userid);

    if (!deletedUser) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    res.json({ message: "사용자가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("사용자 삭제 중 오류:", error);
    res.status(500).json({ error: "사용자 삭제 중 오류가 발생했습니다." });
  }
};

exports.updateScore = async (req, res) => {
  const { userid, score } = req.body;

  try {
    // 사용자의 정보 조회
    let user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 점수 업데이트
    user.score += score;
    await user.save();

    res.status(200).json({ message: "Score updated", user });
  } catch (err) {
    console.error("Error updating score:", err);
    res
      .status(500)
      .json({ message: "Failed to update score", error: err.message });
  }
};
