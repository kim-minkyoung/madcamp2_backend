// controllers/userController.js

const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    console.log("2");
    const userId = req.params._id;
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

exports.getUsersSortedByTotalScore = async (req, res) => {
  try {
    // 모든 사용자 정보를 점수 내림차순으로 가져오기
    const users = await User.find().sort({ totalScore: -1 });

    // 사용자 정보 반환
    res.json(users);
  } catch (error) {
    console.error("Error fetching users sorted by score:", error);
    res.status(500).json({ error: "Error fetching users sorted by score" });
  }
};

exports.getUsersSortedByScore = async (req, res) => {
  try {
    // 모든 사용자 정보를 점수 내림차순으로 가져오기
    const users = await User.find().sort({ score: -1 });

    // 사용자 정보 반환
    res.json(users);
  } catch (error) {
    console.error("Error fetching users sorted by score:", error);
    res.status(500).json({ error: "Error fetching users sorted by score" });
  }
};

exports.updateScore = async (req, res) => {
  const { userid, score, playCount } = req.body;

  try {
    // 사용자의 정보 조회
    let user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 점수와 playCount 업데이트
    user.score = score;
    user.playCount = playCount;

    // playCount가 2일 때 totalScore 업데이트
    if (user.playCount === 2) {
      updateTotalScore(user, score);
    }

    await user.save();

    res.status(200).json({ message: "Score updated", user });
  } catch (err) {
    console.error("Error updating score:", err);
    res
      .status(500)
      .json({ message: "Failed to update score", error: err.message });
  }
};

// 사용자의 totalScore를 업데이트하는 함수
async function updateTotalScore(user, newScoore) {
  user.totalScore += newScore;
  await user.save();
}
