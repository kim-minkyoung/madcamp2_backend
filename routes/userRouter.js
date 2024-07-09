// routes/userGameRouter.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 사용자 정보 조회(프로필)
router.get("/:userid", userController.getProfile);

// 모든 사용자 누적 점수를 내림차순으로 가져오기
router.get("/totalScore", userController.getUsersSortedByTotalScore);

// 모든 사용자 이번 한 시간 점수를 내림차순으로 가져오기
router.get("/totalScore", userController.getUsersSortedByScore);

// 이번 판 점수와 playCount 함께 업데이트(반드시 둘이 함께 넘겨줘야 함)
router.put("/:userid", userController.updateScore);

module.exports = router;
