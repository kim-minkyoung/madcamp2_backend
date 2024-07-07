// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const gameController = require("../controllers/gameController");

router.get("/word", gameController.getRandomWord);

module.exports = router;
