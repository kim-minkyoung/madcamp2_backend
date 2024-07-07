// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");
const multer = require("multer");
// 이메일 중복 여부 확인
router.post(
  "/checkEmail",
  (req, res, next) => {
    console.log("1");
    next();
  },
  userController.checkEmail
);

// 사용자 정보 조회
router.get("/:userid", async (req, res) => {
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
});

// Multer 설정: 프로필 사진 업로드를 위한 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// PUT profile
router.put(
  "/:userid",
  (req, res, next) => {
    console.log("5");
    next();
  },
  upload.single("profileImage"),
  (req, res, next) => {
    console.log("6");
    next();
  },
  userController.updateProfile
);

// DEL profileImage
router.delete(
  "/:userid/deleteProfileImage",
  (req, res, next) => {
    console.log("8");
    next();
  },
  userController.deleteProfileImage
);

module.exports = router;
