// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/UserInfo");
const gameController = require("../controllers/gameController");

router.get("/globalWord", gameController.getGlobalWord);
router.get("/personalWord", gameController.getPersonalWord);

module.exports = router;
