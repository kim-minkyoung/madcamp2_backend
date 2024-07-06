// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 사용자 전체 조회
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error executing query:", err);
    next(err);
  }
});

// POST 요청을 처리하는 라우터
router.post("/add", async (req, res) => {
  const { googleEmail, nickname, profileImage } = req.body;

  if (!googleEmail) {
    return res.status(400).json({ error: "필수 필드가 누락되었습니다." });
  }

  try {
    const newUser = new User({ googleEmail, nickname, profileImage });

    await newUser.save();

    res
      .status(201)
      .json({ message: "사용자가 추가되었습니다.", user: newUser });
  } catch (err) {
    res.status(500).json({
      error: "사용자 추가 중 오류가 발생했습니다.",
      details: err.message,
    });
  }
});

module.exports = router;
