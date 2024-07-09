// controllers/scoreController.js

const User = require("../models/User");

exports.getUsersSortedByTotalScore = async (req, res) => {
  try {
    const users = await User.find().sort({ totalScore: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users sorted by score:", error);
    res.status(500).json({ error: "Error fetching users sorted by score" });
  }
};

exports.getUsersSortedByScore = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users sorted by score:", error);
    res.status(500).json({ error: "Error fetching users sorted by score" });
  }
};

exports.updateScore = async (req, res) => {
  const { userid } = req.params; // Use params to get userid from URL
  const { score, playCount } = req.body;

  try {
    let user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.totalScore) {
      user.totalScore = 0; // 초기화
    }

    // Update score and playCount
    user.score = score;
    user.playCount = playCount;

    // Update totalScore if playCount is 2
    if (playCount == 2) {
      updateTotalScore(user, score);
    } else {
      await user.save();
    }

    res.status(200).json({ message: "Score updated", user });
  } catch (err) {
    console.error("Error updating score:", err);
    res
      .status(500)
      .json({ message: "Failed to update score", error: err.message });
  }
};

// Function to update totalScore
async function updateTotalScore(user, newScore) {
  user.totalScore += newScore;
  await user.save();
}
