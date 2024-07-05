// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 사용자 전체 조회
router.get("/", (req, res, next) => {
  console.log("1");
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// POST 요청을 처리하는 라우터
router.post("/add", async (req, res) => {
  const { googleEmail, nickname, profileImage } = req.body;

  try {
    // MongoDB에 새로운 사용자 추가
    console.log(2);
    const newUser = new User({
      googleEmail,
      nickname,
      profileImage,
    });

    console.log(3);
    await newUser.save(); // 데이터베이스에 저장
    console.log(4);

    res
      .status(201)
      .json({ message: "사용자가 추가되었습니다.", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "사용자 추가 중 오류가 발생했습니다." });
  }
});

module.exports = router;
