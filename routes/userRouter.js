// routes/userInfoRouter.js

const express = require("express");
const router = express.Router();
const userInfoController = require("../controllers/userController");

// 이메일 중복 여부 확인 (객체 전부다 return 하게 수정)
router.post("/checkEmail", userInfoController.checkEmail);

// 사용자 탈퇴
router.delete("/:userid", userInfoController.deleteUser);

// 사용자 정보 조회(프로필) (ok)
router.get("/:userid", userInfoController.getProfile);

// 닉네임, 프사 수정 (ok)
router.put("/:userid", userInfoController.updateProfile);

module.exports = router;
