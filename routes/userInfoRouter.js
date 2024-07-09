// routes/userInfoRouter.js

const express = require("express");
const router = express.Router();
const userInfoController = require("../controllers/userInfoController");

// 이메일 중복 여부 확인
router.post("/checkEmail", userInfoController.checkEmail);

// 사용자 탈퇴
router.delete("/:userid", userInfoController.deleteUser);

// 닉네임 수정
router.put("/:userid", userInfoController.updateNickname);

module.exports = router;
