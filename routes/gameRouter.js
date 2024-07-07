// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const gameController = require("../controllers/gameController");

router.get("/globalWord", gameController.getGlobalWord); // 모든 사용자가 동일한 단어를 받음
router.get("/personalWord", gameController.getPersonalWord); // 각 사용자가 개별 단어를 받음

module.exports = router;
