// routes/users.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 이메일 중복 여부 확인
router.post("/checkEmail", userController.checkEmail);

// 사용자 정보 조회
router.get("/:userid", userController.getProfile);

// PUT profile
router.put("/:userid", userController.updateProfile);

// DEL profileImage
router.delete("/:userid/deleteProfileImage", userController.deleteProfileImage);

// 사용자 탈퇴
router.delete("/:userid", userController.deleteUser);

module.exports = router;
