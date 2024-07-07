// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");
const multer = require("multer");
// 이메일 중복 여부 확인
router.post("/checkEmail", userController.checkEmail);

// 사용자 정보 조회
router.get("/:userid", userController.getProfile);

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
router.put("/:userid", userController.updateProfile);

// DEL profileImage
router.delete("/:userid/deleteProfileImage", userController.deleteProfileImage);

// 사용자 탈퇴
router.delete("/:userid", userController.deleteUser);

// 점수 업데이트
// router.put("/:userid/score", userController.update);

module.exports = router;
